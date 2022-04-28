import U from "./utils";

const Lapiz = function (canvas) {
  var ctx = canvas.getContext("2d");

  var L = {
    ctx: ctx,
  };

  var imagePool = {};

  L.translate = function (position) {
    if (position) {
      const { x, y } = position;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(x, y);
    } else {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    return L;
  };

  L.setImages = function (impool) {
    imagePool = impool;
    return L;
  };

  L.image = function (ops) {
    var cfg = U.extend(
      {
        x: 0,
        y: 0,
        image: "",
      },
      ops || {}
    );

    if (imagePool[cfg.image]) {
      var img = imagePool[cfg.image];

      if (cfg.width || cfg.height) {
        const w = cfg.width || (img.width * cfg.height) / img.height;
        const h = cfg.height || (img.height * cfg.width) / img.width;
        ctx.drawImage(img, cfg.x, cfg.y, w, h);
      } else {
        ctx.drawImage(img, cfg.x, cfg.y);
      }
    }
    return L;
  };

  L.rect = function (ops) {
    var cfg = U.extend(
      {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        color: "#000",
        borderColor: "#FFF",
        borderWidth: 0,
        radius: 0,
      },
      ops || {}
    );

    ctx.fillStyle = cfg.color;
    ctx.beginPath();
    if (cfg.radius === 0) {
      ctx.rect(cfg.x, cfg.y, cfg.width, cfg.height);
    } else {
      ctx.moveTo(cfg.x + cfg.radius, cfg.y);
      ctx.lineTo(cfg.x + cfg.width - cfg.radius, cfg.y);
      ctx.quadraticCurveTo(
        cfg.x + cfg.width,
        cfg.y,
        cfg.x + cfg.width,
        cfg.y + cfg.radius
      );
      ctx.lineTo(cfg.x + cfg.width, cfg.y + cfg.height - cfg.radius);
      ctx.quadraticCurveTo(
        cfg.x + cfg.width,
        cfg.y + cfg.height,
        cfg.x + cfg.width - cfg.radius,
        cfg.y + cfg.height
      );
      ctx.lineTo(cfg.x + cfg.radius, cfg.y + cfg.height);
      ctx.quadraticCurveTo(
        cfg.x,
        cfg.y + cfg.height,
        cfg.x,
        cfg.y + cfg.height - cfg.radius
      );
      ctx.lineTo(cfg.x, cfg.y + cfg.radius);
      ctx.quadraticCurveTo(cfg.x, cfg.y, cfg.x + cfg.radius, cfg.y);
    }
    ctx.closePath();
    ctx.fill();
    if (cfg.borderWidth > 0) {
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
        listSymbol: "",

        textAlign: "left",
        fontFamily: "sans-serif",

        color: "#000000",
        borderWidth: 0,
        borderColor: "#000000",
        shadow: null,
        opacity: 1,

        rotation: 0,
      },
      setFont = function (ops) {
        cfg = U.extend(cfg, ops || {});
        var font = cfg.italic ? "italic " : "";
        font += cfg.bold + " ";
        font += cfg.fontSize + "px " + cfg.fontFamily;
        ctx.font = font;
      },
      wordList = [];

    P.set = function (options) {
      ctx.save();
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
          endItalic: endItalic,
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
            dx = !cfg.justify
              ? cfg.textAlign === "right"
                ? diffX
                : cfg.textAlign === "center"
                ? diffX / 2
                : 0
              : 0;

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
      dx =
        cfg.textAlign === "right"
          ? diffX
          : cfg.textAlign === "center"
          ? diffX / 2
          : 0;
      for (let j = 0; j < line.length; j++) {
        let w = line[j];
        w.x = posX + dx;
        w.y = posY;
        wordList.push(w);
        dx += w.width + space;
      }
      P.width = cfg.width;
      P.height = posY - cfg.y + cfg.lineHeight / 2;
      ctx.restore();
      //----------------
      return P;
    };
    P.render = function () {
      ctx.save();
      setFont();
      ctx.textBaseline = "middle";
      ctx.fillStyle = cfg.color;
      if (cfg.opacity < 1) {
        ctx.globalAlpha = cfg.opacity;
      }

      if (cfg.rotation !== 0) {
        ctx.rotate((cfg.rotation * Math.PI) / 180);
      }

      if (cfg.shadow) {
        var arrShadow = cfg.shadow.split(" ");
        if (arrShadow[0]) ctx.shadowOffsetX = parseInt(arrShadow[0], 10);
        if (arrShadow[1]) ctx.shadowOffsetY = parseInt(arrShadow[1], 10);
        if (arrShadow[2]) ctx.shadowBlur = parseInt(arrShadow[2], 10);
        if (arrShadow[3]) ctx.shadowColor = arrShadow[3];
      }

      if (cfg.borderWidth > 0) {
        ctx.strokeStyle = cfg.borderColor;
        ctx.lineWidth = cfg.borderWidth;
      }

      var isUnderline = cfg.underline;
      wordList.forEach(function (w) {
        if (w.startBold) {
          setFont({
            bold: cfg.boldValue,
          });
        }
        if (w.startItalic) {
          setFont({
            italic: true,
          });
        }
        if (cfg.borderWidth > 0) {
          ctx.strokeText(w.word, w.x, w.y);
        }
        ctx.fillText(w.word, w.x, w.y);

        if (!cfg.underline) {
          if (w.startUnderline) {
            isUnderline = true;
          }
        }

        if (isUnderline) {
          ctx.beginPath();
          ctx.rect(w.x, w.y + cfg.fontSize / 2, w.width, cfg.fontSize / 12);
          ctx.closePath();
          ctx.fill();
          if (cfg.borderWidth > 0) {
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
            bold: 400,
          });
        }
        if (w.endItalic) {
          setFont({
            italic: false,
          });
        }
      });
      ctx.restore();
      return P;
    };

    P.set(options);

    return P;
  };

  L.roundedPoly = function (options) {
    var cfg = U.extend(
      {
        points: [
          { x: 200, y: 50 },
          { x: 300, y: 200 },
          { x: 100, y: 200 },
        ],
        color: "#DDD",
        borderColor: "#000",
        borderWidth: 0,
        radius: 10,
      },
      options || {}
    );

    var drawPoly = function (points, radius) {
      var i,
        x,
        y,
        len,
        p1,
        p2,
        p3,
        v1,
        v2,
        sinA,
        sinA90,
        radDirection,
        drawDirection,
        angle,
        halfAngle,
        cRadius,
        lenOut;
      var asVec = function (p, pp, v) {
        // convert points to a line with len and normalised
        v.x = pp.x - p.x; // x,y as vec
        v.y = pp.y - p.y;
        v.len = Math.sqrt(v.x * v.x + v.y * v.y); // length of vec
        v.nx = v.x / v.len; // normalised
        v.ny = v.y / v.len;
        v.ang = Math.atan2(v.ny, v.nx); // direction of vec
      };
      v1 = {};
      v2 = {};
      len = points.length; // number points
      p1 = points[len - 1]; // start at end of path
      for (i = 0; i < len; i++) {
        // do each corner
        p2 = points[i % len]; // the corner point that is being rounded
        p3 = points[(i + 1) % len];
        // get the corner as vectors out away from corner
        asVec(p2, p1, v1); // vec back from corner point
        asVec(p2, p3, v2); // vec forward from corner point
        // get corners cross product (asin of angle)
        sinA = v1.nx * v2.ny - v1.ny * v2.nx; // cross product
        // get cross product of first line and perpendicular second line
        sinA90 = v1.nx * v2.nx - v1.ny * -v2.ny; // cross product to normal of line 2
        angle = Math.asin(sinA); // get the angle
        radDirection = 1; // may need to reverse the radius
        drawDirection = false; // may need to draw the arc anticlockwise
        // find the correct quadrant for circle center
        if (sinA90 < 0) {
          if (angle < 0) {
            angle = Math.PI + angle; // add 180 to move us to the 3 quadrant
          } else {
            angle = Math.PI - angle; // move back into the 2nd quadrant
            radDirection = -1;
            drawDirection = true;
          }
        } else {
          if (angle > 0) {
            radDirection = -1;
            drawDirection = true;
          }
        }
        halfAngle = angle / 2;
        // get distance from corner to point where round corner touches line
        lenOut = Math.abs((Math.cos(halfAngle) * radius) / Math.sin(halfAngle));
        if (lenOut > Math.min(v1.len / 2, v2.len / 2)) {
          // fix if longer than half line length
          lenOut = Math.min(v1.len / 2, v2.len / 2);
          // ajust the radius of corner rounding to fit
          cRadius = Math.abs(
            (lenOut * Math.sin(halfAngle)) / Math.cos(halfAngle)
          );
        } else {
          cRadius = radius;
        }
        x = p2.x + v2.nx * lenOut; // move out from corner along second line to point where rounded circle touches
        y = p2.y + v2.ny * lenOut;
        x += -v2.ny * cRadius * radDirection; // move away from line to circle center
        y += v2.nx * cRadius * radDirection;
        // x,y is the rounded corner circle center
        ctx.arc(
          x,
          y,
          cRadius,
          v1.ang + (Math.PI / 2) * radDirection,
          v2.ang - (Math.PI / 2) * radDirection,
          drawDirection
        ); // draw the arc clockwise
        p1 = p2;
        p2 = p3;
      }
    };

    ctx.save();
    ctx.lineWidth = cfg.borderWidth;
    ctx.fillStyle = cfg.color;
    ctx.strokeStyle = cfg.borderColor;
    ctx.beginPath(); // start a new path
    drawPoly(cfg.points, cfg.radius);
    ctx.closePath();
    ctx.fill();
    if (cfg.borderWidth > 0) ctx.stroke();
    ctx.restore();
  };

  L.circle = function (options) {
    var cfg = U.extend(
      {
        x: 0,
        y: 0,
        radius: 50,
        color: "#000",
        borderColor: "#FFF",
        borderWidth: 0,
      },
      options || {}
    );

    ctx.save();
    ctx.lineWidth = cfg.borderWidth;
    ctx.fillStyle = cfg.color;
    ctx.strokeStyle = cfg.borderColor;
    ctx.beginPath();
    ctx.arc(cfg.x, cfg.y, cfg.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    if (cfg.borderWidth > 0) ctx.stroke();
    ctx.restore();
  };

  return L;
};

export default Lapiz;
