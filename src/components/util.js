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

util.localFileReader = function(input, callback) {
  //支持chrome IE10
  if (window.FileReader) {
    let file = input.files[0];
    // let filename = file.name.split(".")[0];
    let reader = new FileReader();
    reader.onload = function () {
      callback(this.result)
    }
    reader.readAsText(file);
  }
  //支持IE 7 8 9 10
  else if (typeof window.ActiveXObject != 'undefined') {
    let xmlDoc;
    xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = false;
    xmlDoc.load(input.value);
    callback(xmlDoc.xml)
  }
  //支持FF
  else if (document.implementation && document.implementation.createDocument) {
    let xmlDoc;
    xmlDoc = document.implementation.createDocument('', '', null);
    xmlDoc.async = false;
    xmlDoc.load(input.value);
    callback(xmlDoc.xml)
  } else {
    alert('error');
  }
}

util.downloadFile = function(fileName, content, aLink) {
  var blob = new Blob([content]);
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
}

export default util;