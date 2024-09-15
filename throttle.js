function throttle(fn, delay) {
    let last = 0;
    return function (...args) {
        const now = Date.now();
        if (now - last > delay) {
            fn.apply(this, args);
            last = now;
        }
    };
}

function opThrottle(fn, delay, { leading = true, trailing = true } = {}) {
    let last = 0;
    let timer = null;
    return function (...args) {
        const now = Date.now();
        
        if (!last && leading === false) {
            last = now;
        }
        
        const remaining = delay - (now - last);
        
        if (remaining <= 0 || remaining > delay) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(this, args);
            last = now;
        } else if (!timer && trailing !== false) {
            timer = setTimeout(() => {
                fn.apply(this, args);
                last = Date.now();
                timer = null;
            }, remaining);
        }
    };
}