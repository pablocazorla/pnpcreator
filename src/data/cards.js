// import U from "utils";

const data = {
  width: 750,
  height: 750,

  images: {
    bg: require("data/images/cards/bg.png"),
  },
};

const r = "RIGHT",
  b = "BOTTOM";

data.cards = [];

let dc_col = 1,
  dc_row = 1;

for (var i = 0; i < 16; i++) {
  data.cards.push({
    id: "1-" + i,
    x: dc_col,
    y: dc_row,
    level: 1,
    levelColor: 1,
    triang: null,
  });

  dc_col++;
  if (dc_col > 4) {
    dc_col = 1;
    dc_row++;
  }
}

dc_col = 1;
dc_row = 1;

for (var j = 0; j < 16; j++) {
  data.cards.push({
    id: "2-" + j,
    x: dc_col,
    y: dc_row,
    level: 2,
    levelColor: 0,
    triang: null,
  });

  dc_col++;
  if (dc_col > 4) {
    dc_col = 1;
    dc_row++;
  }
}

data.cards = data.cards.concat([
  {
    id: "3-1",
    x: 1,
    y: 1,
    level: 3,
    levelColor: 1,
    triang: r,
  },
  {
    id: "3-2",
    x: 1,
    y: 2,
    level: 3,
    levelColor: 0,
    triang: b,
  },
  {
    id: "3-3",
    x: 1,
    y: 3,
    level: 3,
    levelColor: 0,
    triang: r,
  },
  {
    id: "3-4",
    x: 1,
    y: 4,
    level: 3,
    levelColor: 1,
    triang: b,
  },

  //
  {
    id: "3-5",
    x: 2,
    y: 1,
    level: 3,
    levelColor: 0,
    triang: b,
  },
  {
    id: "3-6",
    x: 2,
    y: 2,
    level: 3,
    levelColor: 1,
    triang: r,
  },
  {
    id: "3-7",
    x: 2,
    y: 3,
    level: 3,
    levelColor: 1,
    triang: b,
  },
  {
    id: "3-8",
    x: 2,
    y: 4,
    level: 3,
    levelColor: 0,
    triang: r,
  },
  //
  {
    id: "3-9",
    x: 3,
    y: 1,
    level: 3,
    levelColor: 0,
    triang: r,
  },
  {
    id: "3-10",
    x: 3,
    y: 2,
    level: 3,
    levelColor: 1,
    triang: b,
  },
  {
    id: "3-11",
    x: 3,
    y: 3,
    level: 3,
    levelColor: 1,
    triang: r,
  },
  {
    id: "3-12",
    x: 3,
    y: 4,
    level: 3,
    levelColor: 0,
    triang: b,
  },
  //
  {
    id: "3-13",
    x: 4,
    y: 1,
    level: 3,
    levelColor: 1,
    triang: b,
  },
  {
    id: "3-14",
    x: 4,
    y: 2,
    level: 3,
    levelColor: 0,
    triang: r,
  },
  {
    id: "3-15",
    x: 4,
    y: 3,
    level: 3,
    levelColor: 0,
    triang: b,
  },
  {
    id: "3-16",
    x: 4,
    y: 4,
    level: 3,
    levelColor: 1,
    triang: r,
  },
]);

data.cards = data.cards.concat([
  {
    id: "4-1",
    x: 60,
    y: 60,
    level: null,
    levelColor: 1,
    triang: "null",
    lost: true,
  },
  {
    id: "4-2",
    x: 60,
    y: 60,
    level: null,
    levelColor: 1,
    triang: "null",
    lost: true,
  },
  {
    id: "4-3",
    x: 60,
    y: 60,
    level: null,
    levelColor: 1,
    triang: "null",
    lost: true,
  },
]);

data.render = (L, cardData) => {
  const { x, y, triang, level, levelColor, lost } = cardData;

  const r_w = 124,
    r_margin = 12,
    margin = 30;

  let col = 0,
    row = 0,
    num = 0,
    total = 16;

  const letters = ["A", "B", "C", "D"];

  while (num < total) {
    const choosen = x - 1 === col && y - 1 === row;

    const xVal = margin + col * (r_w + r_margin),
      yVal = margin + row * (r_w + r_margin);

    L.rect({
      width: r_w,
      height: r_w,
      x: xVal,
      y: yVal,
      radius: 10,
      color: choosen ? "#C44232" : "#CCCABE",
    });

    if (choosen) {
      const $title = L.text({
        x: xVal,
        y: yVal,
        width: r_w,
        fontSize: 80,
        lineHeight: r_w + 10,
        text: letters[col] + y,
        fontFamily: "Montserrat",
        uppercase: true,
        textAlign: "center",
        color: "#FFFFFF",
        bold: 700,
      });
      $title.render();
    }

    col++;
    if (col === 4) {
      col = 0;
      row++;
    }

    num++;
  }

  if (triang) {
    const triangBase = r_w,
      triangHeight = 0.8 * r_w,
      triang_x = (triang === b ? x - 1 : 4) * (r_w + r_margin) + margin,
      triang_y =
        (triang === r ? y - 1 : 4) * (r_w + r_margin) + margin + 0.1 * r_w;

    L.roundedPoly({
      points: [
        { x: triang_x + 0.5 * triangBase, y: triang_y },
        { x: triang_x, y: triang_y + triangHeight },
        { x: triang_x + r_w, y: triang_y + triangHeight },
      ],
      color: "#D89F72",
      radius: 10,
    });
  }

  const radius = r_w / 2;
  const circlePos = 4 * (r_w + r_margin) + radius + 40;

  if (!lost) {
    L.circle({
      x: circlePos,
      y: circlePos,
      radius: radius,
      color: levelColor === 0 ? "#40403E" : "#FFF",
      borderColor: "#40403E",
      borderWidth: 3,
    });

    const $level = L.text({
      x: circlePos - radius / 2,
      y: circlePos - 32,
      width: radius,
      fontSize: 90,
      lineHeight: radius + 10,
      text: "" + level,
      fontFamily: "Montserrat",
      uppercase: true,
      textAlign: "center",
      color: levelColor === 0 ? "#FFF" : "#40403E",
      bold: 700,
    });
    $level.render();
    const $piso = L.text({
      x: circlePos - radius / 2,
      y: circlePos - 1.4 * radius,
      width: radius,
      fontSize: 24,
      lineHeight: 24,
      text: "Piso",
      fontFamily: "Montserrat",
      uppercase: true,
      textAlign: "center",
      color: "#40403E",
      bold: 700,
    });

    $piso.render();
  }

  if (lost) {
    const $lostPreg = L.text({
      x: margin,
      y: 1 * (r_w + r_margin),
      width: 4 * (r_w + r_margin),
      fontSize: 300,
      lineHeight: 300,
      text: "?",
      fontFamily: "Montserrat",
      uppercase: true,
      textAlign: "center",
      color: "#40403E",
      bold: 700,
    });
    $lostPreg.render();

    const $lostPerdi = L.text({
      x: margin,
      y: 3.3 * (r_w + r_margin),
      width: 4 * (r_w + r_margin),
      fontSize: 50,
      lineHeight: 50,
      text: "Perdido de vista",
      fontFamily: "Montserrat",
      uppercase: true,
      textAlign: "center",
      color: "#40403E",
      bold: 700,
    });
    $lostPerdi.render();

    const $lostPerdiAdv = L.text({
      x: margin,
      y: 4.3 * (r_w + r_margin),
      width: 4 * (r_w + r_margin),
      fontSize: 24,
      text:
        "El guardia desaparece de la vista. Remuévelo del tablero. El próximo turno, roba una nueva locación y un destino.",
      fontFamily: "Montserrat",
      uppercase: true,
      textAlign: "left",
      color: "#40403E",
      bold: 700,
    });
    $lostPerdiAdv.render();
  }

  // L.image({
  //   x: 0,
  //   y: 0,
  //   image: "bg",
  //   // width: width - 60,
  //   // height:300
  // });

  // const $title = L.text({
  //   x: 50,
  //   y: 50,
  //   width: width - 50,
  //   text: title,
  //   fontFamily: "Montserrat",
  //   uppercase: true,
  //   fontSize: 80,
  //   lineHeight: 80,
  //   color: "#FFFFFF",
  //   bold: 700,
  //   borderWidth: 12,
  //   borderColor: "#b78895",
  // });

  // const $text = L.text({
  //   text,
  //   x: 50,
  //   y: 470,
  //   width: width - 100,
  //   fontFamily: "Montserrat",
  //   uppercase: true,
  //   fontSize: 30,
  //   bold: 700,
  //   color: "#333333",
  // });

  // $title.render();
  // $text.render();
};

export default data;
