if (typeof Object.setPrototypeOf !== "function") {
  Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
  };
}
