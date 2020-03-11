import xml2json from './xml2json';
import endpoints from './endpoints';

const API = {
  GET: (endpoint, parameters, callback, onError) => {
    let ep = endpoints[endpoint];
    if(parameters){
      ep += '?';
      for(var a in parameters){
        ep += a + '=' + ('' + parameters[a]).toLowerCase() + '&';
      }
      ep = ep.substring(0, ep.length - 1);

      fetch(ep, {
        method: 'GET',
        mode: 'cors',
        "Content-Type": "application/xml",
      })
      .then(function (response) {
        return response.blob();
      })
      .then(function (miBlob) {
        let reader = new FileReader();

        reader.addEventListener("loadend", function () {

          const objStr = xml2json(reader.result, '');

          const obj = JSON.parse(objStr);
                  
          callback.apply(null, [obj]);
        });
        reader.readAsText(miBlob);
      })
      .catch(() => {
        onError.apply(null, ['ERROR']);
      });
    }
  }
};

export default API;