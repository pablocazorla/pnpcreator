export const clases = (cl,obj) => {
  let cla = cl;

  for(var a in obj){
    if(obj[a]){
      cla += ' ' + a;
    }
  }

  return cla;
};

export const storage = {

  set: (name, value) => {    
    localStorage.setItem(name, value);
  },
  get: (name) => {
    return localStorage.getItem(name);
  },
  clear: (name) => {
    localStorage.removeItem(name);
  }
};

// Utils
const Utils = (function(){

  var U = {};

  var extendObject = function () {
    var extended = {};

    // Merge the object into the extended object
    var merge = function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            // If we're doing a deep merge and the property is an object
            extended[prop] = extendObject(extended[prop], obj[prop]);
          } else {
            // Otherwise, do a regular merge
            extended[prop] = obj[prop];
          }
        }
      }
    };
    // Loop through each object and conduct a merge
    for (var i = 0; i < arguments.length; i++) {
      merge(arguments[i]);
    }

    return extended;
  };

  U.extend = extendObject;

  U.toLower = function (str) {
    return str ? str.toLowerCase().replace(/ /g, '-') : '';
  };

  U.mmToPx = function (mm) {
    return Math.round((mm * 300) / 25.4);
  };

  U.dataURIToBlob = function (dataURI, callback) {
    var binStr = atob(dataURI.split(',')[1]),
      len = binStr.length,
      arr = new Uint8Array(len);
  
    for (var i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
  
    callback(new Blob([arr]));
  };

  return U;
})();

export default Utils;