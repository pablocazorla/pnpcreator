import U from 'utils';
import Lapiz from 'lapiz';

const Deck = data => {

  var isReady = true;

  // Images
  if(data.images){

    isReady = false;

    const imageList = [];

    for (var a in data.images) {
      imageList.push({
        label: a,
        src: data.images[a],
        img: new Image()
      });
    }
    
    var imagePool = {},
      imagesCount =  imageList.length,
      imageCountLoaded = 0;
      
    imageList.forEach(function (el) {
      el.img.onload = function () {
        imagePool[el.label] = el.img;
        imageCountLoaded++;
        if (imageCountLoaded >= imagesCount) {
          isReady = true;
        }
      };
      el.img.src = el.src;
    });    
  }


  var D = {
    ready: function (callback) {
      var tReady = setInterval(function () {
        if (isReady) {
          callback();
          clearInterval(tReady);
          tReady = null;
        }
      }, 50);
    }
  };

  D.clear = (canvas) => {
    const {width,height} = canvas;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0,0,width,height);
    return D;
  };
  D.white = (canvas) => {
    const {width,height} = canvas;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0,0,width,height);
    return D;
  };

  D.renderCard = (options,bordered) => {
    var config = U.extend({
      index: 0,
      x: 0,
      y: 0
    },
      options
    );
    if(config.canvas){
      var L = Lapiz(config.canvas);

      L.setImages(imagePool);
      L.translate({
        x: config.x,
        y: config.y,
      });
    }

    var dataCard = data.cards[config.index] ? data.cards[config.index] : null;

    if(bordered){
      L.rect({
        width: data.width,
        height: data.height,
        color: 'transparent',
        borderColor: '#808080',
        borderWidth: 2,
      });
    }
    

    if(dataCard){
      data.render.apply(null, [L, dataCard]);
    }
    
  };

  return D;
};

export default Deck;