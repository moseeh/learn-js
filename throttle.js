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
    let lastArgs = null;
    let result;

    const invoke = (context, args) => {
        result = fn.apply(context, args);
        last = Date.now();
    };

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
            invoke(this, args);
            lastArgs = null;
        } else {
            lastArgs = args;
            if (!timer && trailing !== false) {
                timer = setTimeout(() => {
                    if (lastArgs) {
                        invoke(this, lastArgs);
                        lastArgs = null;
                    }
                    timer = null;
                }, remaining);
            }
        }

        return result;
    };
}