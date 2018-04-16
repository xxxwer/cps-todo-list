'use strict';

let util = {}

util.sortObj = function (obj, reverse) {
  let tmp = {}
  let keysArray = Object.keys(obj).sort()
  if (!reverse) {
    keysArray.forEach((k) => { tmp[k] = obj[k] })
  } else {
    keysArray.reverse().forEach((k) => { tmp[k] = obj[k] })
  }
  return tmp
}

util.scrollToId = function (id) {
  let element = document.querySelector(id)
  if (!element) {
    return
  }
  window.scroll({
    top: element.offsetTop,
    behavior: 'smooth'
  });
}

export default util;