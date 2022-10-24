function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, delay);
  };
}

let input;
const inputChanged = debounce(() => {
    input = document.getElementById("input").value;
    stored(input);
}, 1000)

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

let water_stored = [], inputArray = [], max_height = 0;

function stored(input_array) {
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

  let prefix = [...inputArray];
  let suffix = [...inputArray];

  for (let index=1; index<size; index++) {
      prefix[index] = Math.max(prefix[index-1], inputArray[index]);
  }
  
  for (let index=size-2; index>=0; index--) {
      suffix[index] = Math.max(suffix[index+1], inputArray[index]);
  }
  water_stored = [...inputArray];

  for(let index=0; index<size; index++) {
      water_stored[index] = Math.min(prefix[index], suffix[index]) - inputArray[index];
  }

  drawChart(inputArray, document.getElementById('given_graph'));
  drawChart(water_stored, document.getElementById('graph'), true, inputArray);
}

window.onresize = displayWindowSize;
window.onload = displayWindowSize;

function displayWindowSize() {
  drawChart(inputArray, document.getElementById('given_graph'));
  drawChart(water_stored, document.getElementById('graph'), true, inputArray);
};

function drawChart(data, element, water = false, originalArr = []) {
  if (water) {
    drawWaterChart(data, element, originalArr);
    return;
  }

  let graph = element;
  
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
      + '" width = "'+ (width / data.length) +'" height ="' + (data[index]*height_ratio) + '" />';
    x+= (width / data.length);
  }
  graph.innerHTML = chart;
}

function drawWaterChart(data, element, inputArray) {
  let graph = element;
  
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
      + '" width = "'+ (width / data.length) +'" height ="' + (data[index]*height_ratio) + '" />';
    x+= (width / data.length);
  }
  graph.innerHTML = chart;
}