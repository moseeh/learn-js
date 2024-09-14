function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
function opDebounce(fn, delay, options) {
  var timer = null,
    first = true,
    leading;
  if (typeof options === "object") {
    leading = !!options.leading;
  }
  return function () {
    let context = this,
      args = arguments;
    if (first && leading) {
      fn.apply(context, args);
      first = false;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}