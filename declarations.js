const escapeStr = "`\\/\"'"
const arr = [4, "2"]
const obj = {
    str: "i am who i am",
    num: 77,
    bool: false,
    undef: undefined
}
const nested = {
    arr: [4, undefined, "2"],
    obj: {
        str: "moses is a fool",
        num: 99,
        bool: true

    },

}
Object.freeze(nested)
Object.freeze(nested.arr)
Object.freeze(nested.obj)
Object.freeze(arr)
Object.freeze(obj)