function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj
    }

    if (Array.isArray(obj)) {
        return obj.map(deepCopy)
    }

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])
    )
}