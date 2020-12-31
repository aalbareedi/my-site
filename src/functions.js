function preventDefault(e) {
  e.preventDefault();
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

let wheelOpt = supportsPassive ? { passive: false } : false;
let scrollEnabled = true;

export function disableScroll() {
  if (scrollEnabled == true) {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    scrollEnabled = false;
  }
}

export function enableScroll() {
  if (scrollEnabled == false) {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    scrollEnabled = true;
  }
}

let requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

let scrollId = 0;

export function scrollToY(
  app,
  scrollTargetY,
  speed = 2000,
  easing = "easeInOutQuint"
) {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  scrollId++;
  let currentScrollId = scrollId;

  app.isNavigating = true;
  var scrollY = window.scrollY,
    currentTime = 0;

  // min time .1, max time .8 seconds
  var time = Math.max(
    0.1,
    Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8)
  );

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  var PI_D2 = Math.PI / 2,
    easingEquations = {
      customEaseOut: (pos) => (pos /= 1.1),
      easeOutSine: function (pos) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeOutQuad: (pos) => pos * (2 - pos),
      easeOutQuart: (pos) => 1 - --pos * pos * pos * pos,
      easeOutQuint: (pos) => 1 + --pos * pos * pos * pos * pos,
      easeInOutSine: function (pos) {
        return -0.5 * (Math.cos(Math.PI * pos) - 1);
      },
      easeInOutQuint: function (pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow(pos - 2, 5) + 2);
      },
    };

  // add animation loop
  function tick() {
    if (currentScrollId != scrollId) {
      return;
    }

    currentTime += 1 / 60;

    var p = currentTime / time;
    var t = easingEquations[easing](p);

    if (p < 1 && app.isNavigating == true) {
      if (window.isMouseDown == false) {
        requestAnimFrame(tick);

        window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
      }
    } else {
      window.scrollTo(0, scrollTargetY);
      app.isNavigating = false;
    }
  }

  // call it once to get started
  tick();
}

// scroll it!
// scrollToY(0, 1500, "easeInOutQuint");

export function fetchWithTimeout(url, options, duration) {
  return Promise.race([
    fetch(url, options),
    new Promise(function (resolve, reject) {
      return setTimeout(function () {
        return reject(new Error("REQUEST_TIMED_OUT"));
      }, duration);
    }),
  ]);
}
