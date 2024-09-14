function throttle(func, wait) {
    let lastCall = 0;
    let timeout = null;

    return function executed(...args) {
        const now = Date.now();

        if (now - lastCall >= wait) {
            lastCall = now;
            func.apply(this, args);
        } else if (!timeout) {
            const remainingTime = wait - (now - lastCall);
            timeout = setTimeout(() => {
                lastCall = Date.now();
                func.apply(this, args);
                timeout = null;
            }, remainingTime);
        }
    };
}

function opThrottle(func, wait, options = {}) {
    let timeout = null;
    let lastArgs = null;
    let lastCallTime = 0;
    let result;

    const later = (context, args) => {
        lastCallTime = Date.now();
        timeout = null;
        result = func.apply(context, args);
        lastArgs = null;
    };

    return function throttled(...args) {
        const now = Date.now();
        const isLeading = options.leading !== false && lastCallTime === 0;

        if (isLeading) {
            lastCallTime = now;
            result = func.apply(this, args);
        } else {
            lastArgs = args;
        }

        if (!timeout && (isLeading || options.trailing !== false)) {
            timeout = setTimeout(() => {
                if (lastArgs && options.trailing !== false) {
                    later(this, lastArgs);
                } else {
                    lastCallTime = 0;
                    timeout = null;
                }
            }, wait - (now - lastCallTime));
        }

        return result;
    };
}