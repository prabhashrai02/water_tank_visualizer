function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, delay);
  };
}

// stored("n,4,0,0,0,6,0,6,4,0");

const inputChanged = debounce(() => {
    let array = document.getElementById("array").value;
    stored(array)
}, 1000)

function stored(input_array) {

    let arr = input_array.split(",");
    const size = arr.length;

    for (let i=0; i<size; i++) {
        arr[i] = arr[i].trim();
        arr[i] = +arr[i];

        if (Number.isNaN(arr[i])) console.error("only integers are allowed in array");
    }

    // console.log(arr)
    
    let prefix = [...arr];
    let suffix = [...arr];

    for (let i=1; i<size; i++) {
        prefix[i] = Math.max(prefix[i-1], arr[i]);
    }
    
    for (let i=size-2; i>=0; i--) {
        suffix[i] = Math.max(suffix[i+1], arr[i]);
    }
    
    console.log(prefix, suffix, size-1)
    let water_stored = [...arr];

    for(let i=0; i<size; i++) {
        water_stored[i] = Math.min(prefix[i], suffix[i]) - arr[i];
    }

    console.log(water_stored);
}
