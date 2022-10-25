window.onresize = resizeWindow;
window.onload = resizeWindow;

// this function is used to get the input enterd by user
const inputChanged = debounce(() => {
  const input = document.getElementById("input").value;
  extractArray(input);
}, 1000);

let water_stored = [], inputArray = [], max_height = 0;

// this function is used to extract input array from the input box
function extractArray(input_array) {

  loader(false);

  inputArray = input_array.split(",");
  const size = inputArray.length;

  for (let index=0; index<size; index++) {
    inputArray[index] = inputArray[index].trim();
    inputArray[index] = +inputArray[index];

    max_height = Math.max(max_height, inputArray[index]);
    if (Number.isNaN(inputArray[index])) {
      window.alert("only integers are allowed in array");
      return;
    }
  }

  calculateWaterStored(size);
}

// this function is used to calculate water stored in the given structure
function calculateWaterStored(size) {
  let prevHigh = inputArray[0];
  const nextHigh = [...inputArray];

  for (let index=size-2; index>=0; index--) {
      nextHigh[index] = Math.max(nextHigh[index+1], inputArray[index]);
  }
  water_stored = [...inputArray];

  for(let index=0; index<size; index++) {
    water_stored[index] = Math.min(prevHigh, nextHigh[index]) - inputArray[index];
    if (water_stored[index] < 0) water_stored[index] = 0;
    prevHigh = Math.max(prevHigh, inputArray[index]);
  }

  drawChart(inputArray, document.getElementById('given_graph'));
  drawChart(water_stored, document.getElementById('graph'), true, inputArray);
}

/* util functions */

// this is used to take input after some delay after user stops entering data
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, delay);
  };
}

// this is used to show skeleton loader in place of data which is calculated
function loader(show) {
  const skeletonLoaders = document.querySelectorAll(".skeleton");
  for (skeleton of skeletonLoaders) {
    if (show) skeleton.style.display = "block";
    else skeleton.style.display = "none";
  }

  const svgCharts = document.querySelectorAll(".svgChart");
  for (chart of svgCharts) {
    if (show) chart.style.display = "none";
    else chart.style.display = "block";
  }
}

// this function is used to make the page responsive
function resizeWindow() {
  drawChart(inputArray, document.getElementById('given_graph'));
  drawChart(water_stored, document.getElementById('graph'), true, inputArray);
};

// this function is used to draw svg after the data is extracted
function drawChart(data, element, water = false, originalArr = []) {
  if (water) {
    drawWaterChart(data, element, originalArr);
    return;
  }

  const graph = element;
  
  const height = window.innerHeight*0.6;
  const width = window.innerWidth*0.45;
  graph.style.height = height;
  graph.style.width = width;

  const height_ratio = height / (max_height + 5);

  let chart = '';
  let x = 0;

  for (let index=0; index<data.length; index++) {
    chart += '<rect x ="' + x + '" y ="' 
      + (height - (data[index]*height_ratio)) 
      + '" width = "'+ (width / data.length) +'" height ="' + (data[index]*height_ratio)+ '">\n';
    
    chart += '<title>' + data[index] + '</title>\n';
    chart += '</rect>';
    x+= (width / data.length);
  }
  graph.innerHTML = chart;
}

// this function is used to draw svg of water after processing the input is done
function drawWaterChart(data, element, inputArray) {
  const graph = element;
  
  const height = window.innerHeight*0.6;
  const width = window.innerWidth*0.45;
  graph.style.height = height;
  graph.style.width = width;

  const height_ratio = height / (max_height + 5);

  let chart = '';
  let x = 0;

  for (let index=0; index<data.length; index++) {
    chart += '<rect x ="' + x + '" y ="' 
      + (height - ((data[index] + inputArray[index])*height_ratio)) 
      + '" width = "'+ (width / data.length) +'" height ="' + (data[index]*height_ratio) + '">\n';

      chart += '<title>' + data[index] + '</title>\n';
      chart += '</rect>';
    x+= (width / data.length);
  }
  graph.innerHTML = chart;
}