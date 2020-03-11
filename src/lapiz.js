import U from './utils';

const Lapiz = function (canvas) {

  var ctx = canvas.getContext('2d');

  var L = {
    ctx: ctx
  };

  var imagePool = {};

  L.translate = function (position) {
    if(position){
      const {x,y} = position;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(x,y);
    }else{
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }    
    return L;
  };


  

  L.setImages = function (impool) {
    imagePool = impool;
    return L;
  };

  L.image = function (ops) {
    var cfg = U.extend({
      x: 0,
      y: 0,
      image: ''
    }, ops || {});

    if (imagePool[cfg.image]) {
      var img = imagePool[cfg.image];


      if(cfg.width || cfg.height){
        const w = cfg.width || (img.width * cfg.height / img.height);
        const h = cfg.height || (img.height * cfg.width / img.width);
        ctx.drawImage(img, cfg.x, cfg.y, w, h);
      }else{
        ctx.drawImage(img, cfg.x, cfg.y);
      }      
    }
    return L;
  };

  L.rect = function (ops) {
    var cfg = U.extend({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      color: '#000',
      borderColor: '#FFF',
      borderWidth: 0,
      radius: 0
    }, ops || {});

    ctx.fillStyle = cfg.color;
    ctx.beginPath();
    if (cfg.radius === 0) {
      ctx.rect(cfg.x, cfg.y, cfg.width, cfg.height);
    } else {
      ctx.moveTo(cfg.x + cfg.radius, cfg.y);
      ctx.lineTo(cfg.x + cfg.width - cfg.radius, cfg.y);
      ctx.quadraticCurveTo(cfg.x + cfg.width, cfg.y, cfg.x + cfg.width, cfg.y + cfg.radius);
      ctx.lineTo(cfg.x + cfg.width, cfg.y + cfg.height - cfg.radius);
      ctx.quadraticCurveTo(cfg.x + cfg.width, cfg.y + cfg.height, cfg.x + cfg.width - cfg.radius, cfg.y + cfg.height);
      ctx.lineTo(cfg.x + cfg.radius, cfg.y + cfg.height);
      ctx.quadraticCurveTo(cfg.x, cfg.y + cfg.height, cfg.x, cfg.y + cfg.height - cfg.radius);
      ctx.lineTo(cfg.x, cfg.y + cfg.radius);
      ctx.quadraticCurveTo(cfg.x, cfg.y, cfg.x + cfg.radius, cfg.y);
    }
    ctx.closePath();
    ctx.fill();
    if(cfg.borderWidth > 0){
      ctx.strokeStyle = cfg.borderColor;
      ctx.lineWidth = cfg.borderWidth;
      ctx.stroke();
    }
    return L;
  };

  L.text = function (options) {
    var P = {},
      cfg = {
        text: "",
        x: 0,
        y: 0,
        width: 200,
  
        fontSize: 30,
        lineHeight: null,
        bold: 400,
        boldValue: 600,
  
        italic: false,
        justify: false,
        uppercase: false,
  
        underline: false,
        list: false,
        listSymbol: '',
  
        textAlign: "left",
        fontFamily: "sans-serif",
  
        color: "#000000",
        borderWidth: 0,
        borderColor: "#000000",
        shadow: null,
        opacity: 1,
  
        rotation: 0
      },
      setFont = function (ops) {
        cfg = U.extend(cfg, ops || {});
        var font = cfg.italic ? "italic " : "";
        font += cfg.bold + ' ';
        font += cfg.fontSize + "px " + cfg.fontFamily;
        ctx.font = font;
      },
      wordList = [];

    P.set = function (options) {
      cfg = U.extend(cfg, options || {});
      setFont();
      if (!cfg.lineHeight) {
        cfg.lineHeight = 1.4 * cfg.fontSize;
      }

      //----------------
      var posX = cfg.x,
        posY = cfg.y + cfg.lineHeight / 2,
        words = cfg.text.split(" "),
        line = [],
        space = ctx.measureText(" ").width,
       
        isBold = false;
      wordList = [];

      for (var i = 0; i < words.length; i++) {
        var wo = words[i];
        var startBold = wo.indexOf("<b>") >= 0;
        var endBold = wo.indexOf("</b>") >= 0;
        var startItalic = wo.indexOf("<i>") >= 0;
        var endItalic = wo.indexOf("</i>") >= 0;
        var startUnderline = wo.indexOf("<u>") >= 0;
        var endUnderline = wo.indexOf("</u>") >= 0;

        if (startBold) {
          isBold = true;
        }
        

        wo = wo
          .replace("<u>", "")
          .replace("</u>", "")
          .replace("<b>", "")
          .replace("</b>", "")
          .replace("<i>", "")
          .replace("</i>", "");

        if (cfg.uppercase) {
          wo = wo.toUpperCase();
        }

        line.push({
          word: wo,
          width: ctx.measureText(wo).width * (isBold ? 1.07 : 1),
          startUnderline: startUnderline,
          endUnderline: endUnderline,
          startBold: startBold,
          endBold: endBold,
          startItalic: startItalic,
          endItalic: endItalic
        });
        if (endBold) {
          isBold = false;
        }
       

        var wordWidth = 0;
        // eslint-disable-next-line
        line.forEach(function (w) {
          wordWidth += w.width;
        });
        var numSpaces = line.length - 1;

        if (wordWidth + space * numSpaces > cfg.width) {
          var lastWord = line[line.length - 1];
          line.splice(-1, 1);
          numSpaces--;
          // eslint-disable-next-line
          var wWidth = (function () {
              var w = 0;
              for (var j = 0; j < line.length; j++) {
                w += line[j].width;
              }
              return w;
            })(),
            sc = cfg.justify ? (cfg.width - wWidth) / numSpaces : space,
            diffX = cfg.justify ? 0 : cfg.width - (wWidth + space * numSpaces),
            dx = !cfg.justify ?
            cfg.textAlign === "right" ?
            diffX :
            cfg.textAlign === "center" ? diffX / 2 : 0 :
            0;

          for (var j = 0; j < line.length; j++) {
            var w = line[j];
            w.x = posX + dx;
            w.y = posY;
            wordList.push(w);
            dx += w.width + sc;
          }
          line = [lastWord];

          posY += cfg.lineHeight;
        }
      }
      // End FOR
      wWidth = (function () {
          var w = 0;
          for (var j = 0; j < line.length; j++) {
            w += line[j].width;
          }
          return w;
        })();
        diffX = cfg.width - (wWidth + space * (line.length - 1));
        dx = cfg.textAlign === "right" ? diffX :  cfg.textAlign === "center" ? diffX / 2 : 0;
      for (let j = 0; j < line.length; j++) {
        let w = line[j];
        w.x = posX + dx;
        w.y = posY;
        wordList.push(w);
        dx += w.width + space;
      }
      P.width = cfg.width;
      P.height = posY - cfg.y + cfg.lineHeight / 2;

      //----------------
      return P;

    };
    P.render = function () {
      ctx.save();
      ctx.textBaseline = 'middle';
      ctx.fillStyle = cfg.color;
      if (cfg.opacity < 1) {
        ctx.globalAlpha = cfg.opacity;
      }

      if (cfg.rotation !== 0) {
        ctx.rotate(cfg.rotation * Math.PI / 180);
      }

      if (cfg.shadow) {
        var arrShadow = cfg.shadow.split(' ');
        if (arrShadow[0]) ctx.shadowOffsetX = parseInt(arrShadow[0], 10);
        if (arrShadow[1]) ctx.shadowOffsetY = parseInt(arrShadow[1], 10);
        if (arrShadow[2]) ctx.shadowBlur = parseInt(arrShadow[2], 10);
        if (arrShadow[3]) ctx.shadowColor = arrShadow[3];
      }

      if(cfg.borderWidth > 0){
        ctx.strokeStyle = cfg.borderColor;
        ctx.lineWidth = cfg.borderWidth;
      }

      var isUnderline = cfg.underline;
      wordList.forEach(function (w) {
        if (w.startBold) {
          setFont({
            bold: cfg.boldValue
          });
        }
        if (w.startItalic) {
          setFont({
            italic: true
          });
        }
        if(cfg.borderWidth > 0){
          ctx.strokeText(w.word, w.x, w.y);
        }
        ctx.fillText(w.word, w.x, w.y);

        if (!cfg.underline) {
          if (w.startUnderline) {
            isUnderline = true;
          }
        }
  
        if(isUnderline){
          ctx.beginPath();
          ctx.rect(w.x,w.y + (cfg.fontSize/2),w.width,cfg.fontSize/12);
          ctx.closePath();
          ctx.fill();
          if(cfg.borderWidth > 0){
            ctx.stroke();
          }
        }
        
        if (!cfg.underline) {
          if (w.endUnderline) {
            isUnderline = false;
          }
        }

        if (w.endBold) {
          setFont({
            bold: 400
          });
        }
        if (w.endItalic) {
          setFont({
            italic: false
          });
        }
      });
      ctx.restore();
      return P;
    };

    P.set(options);

    return P;


  };

  return L;
};


export default Lapiz;