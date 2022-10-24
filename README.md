# Water Tank Visualizer

### Live here: - https://prabhashrai02.github.io/water_tank_visualizer/

### This is a visual representation of Water Tank problem
Problem Statement: - 
> User will give an array, which represent's the water tank. We have to calculate the water stored in the given tank and also represent it visually.

Approach: -
<ul>
<li> User can give input array as a comma separated numbers.</li>
<li> I have created a suffix array, which will iterate from end of the given array and create a new array to store the maximum height of the water tank.</li>
<li> Iterating from start of the array, check at every index, the amount of water stored at a given index.</li>
<li> Create a separate array of the amount of water stored at every index.</li>
<li> Created a SVG picture with the array of water stored.</li>
</ul>

> The page consist of two SVG images, left one represents the water tank whose data is entered by user, right one represents the water which is stored in the water tank.
Both the images side by side gives a clear understanding of the water stored in the tank.

## Features: -
<ul>
<li>SVG</li>
> Use of SVG has made the chart more flexible for larger input.
<li>Scalable</li>
> Works fine with large constraints.
<li>Responsive</li>
> It supports all devices, with all resolutions.
<li>ToolTip</li>
> It has a tooltip, which is visible when we hover over a bar.
<li>Skeleton Loader</li>
> It has a loader which is replaced by the SVG chart after performing calculations based on the given input array.
<li>Debounce</li>
> It execute the function after user has filled whole array, to improve the performance.
<li>Validation</li>
> User's input is checked whether it is valid or not.
</ul>

## Screenshot: -
![image](https://user-images.githubusercontent.com/73634195/197586973-0872e496-becb-4209-8078-e15b330153a5.png)
