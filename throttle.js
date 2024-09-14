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
    let lastArgs = null;  // Store the last arguments to be used at the trailing edge
    let previous = 0;  // Track the last execution time
    let result;

    const later = (context, args) => {
        timeout = null;  // Clear the timeout
        if (lastArgs) {
            // If there were calls during the throttle period, execute at the trailing edge
            previous = options.leading === false ? 0 : Date.now();
            result = func.apply(context, lastArgs);
            lastArgs = null;  // Reset lastArgs after execution
        }
    };

    return function throttled(...args) {
        const now = Date.now();

        // If leading is false and previous is not set, set previous to now
        if (!previous && options.leading === false) previous = now;

        const remaining = wait - (now - previous);

        // If it's time to execute the function
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);  // Clear any pending trailing calls
                timeout = null;
            }
            previous = now;  // Update the last execution time
            result = func.apply(this, args);
        } else if (!timeout && options.trailing !== false) {
            // Schedule the trailing execution
            lastArgs = args;  // Save the arguments for trailing call
            timeout = setTimeout(() => later(this, args), remaining);
        }

        return result;
    };
}
