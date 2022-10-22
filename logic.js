function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, delay);
  };
}

let array;
const inputChanged = debounce(() => {
    array = document.getElementById("array").value;
    // stored(array)
    stored("12, 40, 5, 10, 3, 36")
}, 1000)

let water_stored = [], arr = [], max_height = 0;

function stored(input_array) {

    arr = input_array.split(",");
    const size = arr.length;

    for (let i=0; i<size; i++) {
        arr[i] = arr[i].trim();
        arr[i] = +arr[i];

        max_height = Math.max(max_height, arr[i]);
        if (Number.isNaN(arr[i])) console.error("only integers are allowed in array");
    }

    let prefix = [...arr];
    let suffix = [...arr];

    for (let i=1; i<size; i++) {
        prefix[i] = Math.max(prefix[i-1], arr[i]);
    }
    
    for (let i=size-2; i>=0; i--) {
        suffix[i] = Math.max(suffix[i+1], arr[i]);
    }
    water_stored = [...arr];

    for(let i=0; i<size; i++) {
        water_stored[i] = Math.min(prefix[i], suffix[i]) - arr[i];
    }

    console.log(water_stored);
    drawChart(arr, document.getElementById('given_graph'));
    drawChart(water_stored, document.getElementById('graph'));
}

window.onresize = displayWindowSize;
window.onload = displayWindowSize;

function displayWindowSize() {
  drawChart(arr, document.getElementById('given_graph'));
  drawChart(water_stored, document.getElementById('graph'), true);
};

function drawChart(data, element, water = false) {
  let graph = element;
  
  const height = window.innerHeight*0.5;
  const width = window.innerWidth*0.7;
  graph.style.height = height;
  graph.style.width = width;

  const height_ratio = height / (max_height + 20);

  console.log(height_ratio)

  let chart = '';
  let x = 0;

  for (let i=0; i<data.length; i++) {
    chart += '<rect x ="' + x + '" y ="' 
      + (height - (data[i]*height_ratio)) 
      + '" width = "'+ (width / data.length) +'" height ="' + (data[i]*height_ratio) + '" />';
    x+= (width / data.length);
  }
  graph.innerHTML = chart;
}