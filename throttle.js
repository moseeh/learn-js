function throttle(func, wait) {
    let lastCall = 0;
    let timeout = null;

    return function executed(...args) {
        const now = Date.now();

        if (now - lastCall >= wait) {
            // If the wait time has passed, invoke the function immediately
            lastCall = now;
            func.apply(this, args);
        } else if (!timeout) {
            // If still within the wait period, set a timeout to invoke the function after the remaining time
            const remainingTime = wait - (now - lastCall);
            timeout = setTimeout(() => {
                lastCall = Date.now();
                func.apply(this, args);
                timeout = null; // Reset the timeout after it executes
            }, remainingTime);
        }
    };
}



function opThrottle(func, wait, options = {}) {
    let timeout = null;
    let previous = 0;
    let result;

    const later = (context, args) => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
    };

    return function throttled(...args) {
        const now = Date.now();
        if (!previous && options.leading === false) previous = now;
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(this, args);
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(() => later(this, args), remaining);
        }

        return result;
    };
}
