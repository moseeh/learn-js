function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj
    }

    if (obj instanceof Date) {
        return new Date(obj)
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags)
    }

    if (Array.isArray(obj)) {
        return obj.map(deepCopy)
    }

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])
    )
}