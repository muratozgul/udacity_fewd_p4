Visit project page at <http://muratozgul.github.io/udacity_fewd_p4/>

## index.html

##### Install imagemagick (to run grunt image related tasks)
OS X
`brew install imagemagick --build-from-source`

##### Install npm modules
`npm install`

Do not need to run grunt tasks.  
Production files are under "dist/" directory.  
Checkout Gruntfile.js for details.  

##### Visit [project page](http://muratozgul.github.io/udacity_fewd_p4/) or open index.html 
Use index.html file at the project root (not dist/index.html)  
Both index.html and dist/index.html are the same but relative paths may not work under dist folder

#### Results:
Google Developers PageSpeed Insights [results](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fmuratozgul.github.io%2Fudacity_fewd_p4%2F)
* Desktop: 97/100
* Mobile: 96/100

## pizza.html

##### Modified changePizzaSizes function

```js
function changePizzaSizes(size) {
  var newWidth;
  
  if(size === "1") {
    newwidth = 25;
  } else if(size === "2") {
    newwidth = 33.3;
  } else if(size === "3") {
    newwidth = 50;
  } else {
    console.log("bug in changePizzaSizes:sizeSwitcher");
  }

  var randomPizzas = document.querySelectorAll(".randomPizzaContainer");
  for (var i = 0; i < randomPizzas.length; i++) {
    randomPizzas[i].style.width = newwidth + "%";
  }
}
```

##### Modified updatePositions function

```js
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var items = document.querySelectorAll('.mover');
  var scrollTop = document.body.scrollTop / 1250;
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin(scrollTop + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}
```

##### Reduced the number of moving pizzas
From 200 to 64

```js
document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  var numOfPizzas = 64;
  var querySelector = document.querySelector("#movingPizzas1");
  for (var i = 0; i < numOfPizzas; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover force-layer';
    elem.src = "src/images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    querySelector.appendChild(elem);
  }
  updatePositions();
});
```

##### Forced layer on moving pizzas

```css
.force-layer {
  will-change: transform;
  transform: translateZ(0);
}
```

##### Handled scroll events inside requestAnimationFrame

```js
window.addEventListener('scroll', function() {
   window.requestAnimationFrame(updatePositions);
});
```

#### Results:
(Mac Book Pro - OS X 10.10.5 | Chrome Version 47.0.2526.106 (64-bit))
* Time to resize pizzas: 0.6450000000004366ms
* Average time to generate last 10 frames: 0.3529999999984284ms