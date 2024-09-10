function fusion(obj1 = {}, obj2 = {}) {
  let newobj = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
        newobj[key] = [...obj1[key], ...obj2[key]];
      } else if (typeof obj1[key] === "string" && typeof obj2[key] === "string") {
        newobj[key] = obj1[key] + " " + obj2[key];
      } else if (typeof obj1[key] === "number" && typeof obj2[key] === "number") {
        newobj[key] = obj1[key] + obj2[key];
      } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object" && obj1[key] !== null && obj2[key] !== null) {
        newobj[key] = fusion(obj1[key], obj2[key]);
      } else if (typeof obj2[key] !== "undefined") {
        newobj[key] = obj2[key];
      } else {
        newobj[key] = obj1[key];
      }
    }
  }
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key) && typeof obj1[key] === "undefined") {
      newobj[key] = obj2[key];
    }
  }
  return newobj;
}
