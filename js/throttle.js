let lastTime = 0;

function throttle(func, timeFrame) {
  return function () {
    var now = Date.now();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}