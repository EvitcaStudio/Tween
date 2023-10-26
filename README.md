# Tween
Tween is a small library for creating tweening animations in JavaScript. It allows you to smoothly animate an object's properties from one value to another over a specified duration using easing functions.

# Usage
Here is an example of how to use Tween:

> **Chainable API**  
> Every method of a tween instance is chainable. This allows for super customization!

```js
import { Tween } from './tween.min.mjs';
// Start value of tween
const start = { x: 0, y: 0 };
// End value of tween
const end = { x: 100, y: 100 };
// Duration of tween
const duration = 1000;
// Which easing formula to use for the tween
const easing = Tween.easeInOutQuad;

// Create an object to pass the current values of the tween to
const myObject = { x: 0, y: 0 };
// Create the tween with a tweening object
const myTween = new Tween({
    start,
    end,
    duration,
    easing
});

// Start the animation
myTween.animate(({ x, y }) => {
    myObject.x = x;
    myObject.y = y;
});
```

In this example, we create a new Tween instance with the starting properties start, ending properties end, duration duration, and easing function easing. We also create an object myObject that we want to animate. Finally, we call animate() to start the animation and set the callback to update myObject's properties with the values returned from the tween.

# Options
Here are the available options for the Tween constructor:

- start: The starting properties of the animation. Default is an empty object {}.  
- end: The end properties of the animation. Default is an empty object {}.  
- duration: The duration of the animation in milliseconds. Default is 1000.  
- easing: The easing function to use for the animation. Default is Tween.linear.  

In an earlier example we passed in the properties of a tween via it's constructor. But we can also change the properties of a tween via the build method. This allows us to reuse tween instances.
```js
const start = { x: 0, y: 0 };
const end = { x: 100, y: 100 };
const duration = 1000;
const easing = Tween.easeInOutQuad;

const myTween = new Tween();
myTween.build({
    start,
    end,
    duration,
    easing
});
```

# Events
Every tween instance has events you can listen for to help further customize/control the animation.

```js
const tweenStartHandler = () => { console.log('Started!'); }
const tweenEndHandler = () => { console.log('Ended!'); }
const tweenPauseHandler = () => { console.log('Paused!'); }
const tweenResumeHandler = () => { console.log('Resumed!'); }

const myTween = new Tween();
// Called when the tween first starts animating
myTween.on('start', tweenStartHandler});
// Called when the tween has completed
myTween.on('end', tweenEndHandler);
// Called when the tween is paused
myTween.on('pause', tweenPauseHandler);
// Called when the tween has resumed
myTween.on('resume', tweenResumeHandler);

// Or take advantage of the chainable API
myTween.on('start', tweenStartHandler)
.on('end', tweenEndHandler)
.on('pause', tweenPauseHandler)
.on('resume', tweenResumeHandler);
```

You also have the ability to further control the tween via it's methods.
```js
const myTween = new Tween();
myTween.pause(); // Pauses a tween's animation
myTween.resume(); // Resumes a paused tween's animation
myTween.stop(); // Stops the tween's animation
```

You can oscillate a tween by setting the `oscillate` parameter inside of the animate API to `true`.
```js
const myTween = new Tween();
// Start the animation
myTween.animate = (({ x, y }, true) => {
    // Will loop between the start and end values until stopped
    myObject.x = x;
    myObject.y = y;
});
```

# Easing Functions
The following easing functions are available in Tween:

- linear  
- easeInQuad  
- easeOutQuad  
- easeInOutQuad  
- easeInSine  
- easeOutSine  
- easeInOutSine  
- easeInExpo  
- easeOutExpo  
- easeInOutExpo  
- easeInCirc  
- easeOutCirc  
- easeInOutCirc  
- easeInCubic  
- easeOutCubic  
- easeInOutCubic  
- easeInQuart  
- easeOutQuart  
- easeInOutQuart  

You can reference them via `Tween.easeFunctionName`
# License
Tween does not have a license at this time. For licensing, contact the author.