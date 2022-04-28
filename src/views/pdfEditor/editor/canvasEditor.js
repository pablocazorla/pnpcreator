import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "rdx/pdfEditor/actions";
import U from "utils";
import Konva from "konva";

const defaultRectangle = {
  width: 120,
  height: 120,
  fill: "#808080",
  opacity: 1,
  cornerRadius: 0,
  name: "element_rectangle",
  shadowEnabled: false,
  shadowColor: "#000000",
  strokeWidth: 0,
  stroke: "#000000",
  draggable: true,
};

const defaultText = {
  width: 200,
  height: 120,
  fill: "#000000",
  opacity: 1,
  text: "Sample text",
  fontSize: 18,
  fontFamily: "Calibri",
  align: "left",

  name: "element_text",
  shadowEnabled: false,
  shadowColor: "#000000",
  strokeWidth: 0,
  stroke: "#000000",
  draggable: true,
};

const defaultImage = {
  // fill: '#808080',
  opacity: 1,
  name: "element_image",
  shadowEnabled: false,
  shadowColor: "#000000",
  strokeWidth: 0,
  stroke: "#000000",
  draggable: true,
};

class canvasEditorVisual extends Component {
  constructor(props) {
    super(props);
    this.canvasEdition = React.createRef();

    this.stage = null;
    this.layer = null;
    this.updateElementCanvas = null;
    this.initialized = false;
  }
  componentDidUpdate(prevProps) {
    const {
      elementFromEditor,
      pageNum,
      elementToDelete,
      quitDeletedFromPool,
      deleteElement,
      selectElement,
      elementToDuplicate,
      saveElement,
      height,
      counterGetEditorData,
      getEditorData,
    } = this.props;

    const { updateElementCanvas } = this;

    if (height > 0 && !this.initialized) {
      this.initEdition();
    }

    if (elementFromEditor !== prevProps.elementFromEditor) {
      const element = this.stage.find("#" + elementFromEditor.id)[0];

      if (element) {
        for (var a in elementFromEditor) {
          if (a !== "id" && a !== "type") {
            element[a](elementFromEditor[a]);
          }
        }
        this.layer.draw();
      }
    }
    if (
      elementToDelete &&
      elementToDelete !== prevProps.elementToDelete &&
      elementToDelete.pageNum === pageNum
    ) {
      const elemDelete = this.stage.find("#" + elementToDelete.id)[0];
      if (elemDelete) {
        elemDelete.destroy();
        this.stage.find("Transformer").destroy();
        this.layer.draw();
        quitDeletedFromPool(elementToDelete.id);
        deleteElement(null);
        selectElement(null);
        updateElementCanvas(null);
      }
    }
    if (
      elementToDuplicate &&
      elementToDuplicate !== prevProps.elementToDuplicate &&
      elementToDuplicate.pageNum === pageNum
    ) {
      const elemDuplicated = Object.assign({}, elementToDuplicate);

      elemDuplicated.x += 30;
      elemDuplicated.y += 30;
      elemDuplicated.id = U.getUniqueId();
      elemDuplicated.draggable = true;

      let elementNew = null;

      if (elemDuplicated.type === "rectangle") {
        elemDuplicated.name = "element_rectangle";
        elementNew = new Konva.Rect(elemDuplicated);
        this.layer.add(elementNew);
      } else {
        elemDuplicated.name = "element_text";
        elementNew = new Konva.Text(elemDuplicated);
        this.layer.add(elementNew);
      }
      this.stage.find("Transformer").destroy();

      // create new transformer
      const tr = new Konva.Transformer({
        rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315, 360],
      });
      this.layer.add(tr);
      tr.attachTo(elementNew);
      this.layer.draw();

      updateElementCanvas(elementNew);
      saveElement(elemDuplicated);

      elementNew.on("dragend transformend", function () {
        updateElementCanvas(elementNew);
      });
    }

    if (counterGetEditorData !== prevProps.counterGetEditorData) {
      this.stage.find("Transformer").destroy();
      this.layer.draw();
      this.stage.toImage({
        callback(img) {
          //console.log(img);
          getEditorData(img);
        },
      });
      //
    }
  }
  initEdition = () => {
    this.initialized = true;

    const {
      width,
      height,
      setElementToEditor,
      updateElement,
      pageNum,
      saveElement,
      setMode,
      pool,
      selectElement,
      deleteElement,
      duplicateElement,
    } = this.props;

    var GUIDELINE_OFFSET = 5;

    const stage = new Konva.Stage({
      container: this.canvasEdition.current,
      width: width,
      height: height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    (function () {
      for (var elemId in pool) {
        const elem = pool[elemId];

        if (elem.pageNum === pageNum) {
          if (elem.name === "element_rectangle") {
            const elementRect = new Konva.Rect(elem);

            layer.add(elementRect);
          }
          if (elem.name === "element_text") {
            const elementText = new Konva.Text(elem);

            layer.add(elementText);
          }
          if (elem.name === "element_image") {
            const imageObj = new Image();
            imageObj.src = elem.imageSrc;

            const elImgComp = {
              image: imageObj,
            };
            imageObj.onload = () => {
              const elImg = Object.assign({}, elem, elImgComp);
              const elementImage = new Konva.Image(elImg);

              layer.add(elementImage);
              layer.draw();
            };
          }
        }
      }
    })();
    layer.draw();

    const updateElementCanvas = (elem) => {
      if (!elem) {
        setElementToEditor(null);
        selectElement(null);
        deleteElement(null);
        duplicateElement(null);
        return null;
      }

      const type =
        elem.name().indexOf("text") >= 0
          ? "text"
          : elem.name().indexOf("rectangle") >= 0
          ? "rectangle"
          : "image";
      const o = {
        type,
        id: elem.id(),
        pageNum,

        // Basics
        x: Math.round(elem.x()),
        y: Math.round(elem.y()),
        width: Math.round(elem.width()),
        height: Math.round(elem.height()),
        scaleX: elem.scaleX(),
        scaleY: elem.scaleY(),
        zIndex: elem.zIndex(),
        rotation: Math.round(elem.rotation()),
        fill: elem.fill(),
        opacity: elem.opacity(),
        strokeWidth: elem.strokeWidth(),
        stroke: elem.stroke(),

        // Shadow
        shadowEnabled: elem.shadowEnabled(),
        shadowColor: elem.shadowColor(),
        shadowBlur: elem.shadowBlur(),
        shadowOffsetX: elem.shadowOffsetX(),
        shadowOffsetY: elem.shadowOffsetY(),
        shadowOpacity: elem.shadowOpacity(),
      };

      switch (type) {
        case "rectangle":
          o.cornerRadius = elem.cornerRadius();

          break;
        case "text":
          o.fontFamily = elem.fontFamily();
          o.fontStyle = elem.fontStyle();
          o.fontSize = elem.fontSize();
          o.lineHeight = elem.lineHeight();
          o.align = elem.align();
          o.textDecoration = elem.textDecoration();
          o.text = elem.text();

          break;
        case "image":
          o.imageSrc = elem.image().src;
          break;
        default:
        //
      }

      setElementToEditor(o);
      updateElement(o);
      selectElement(o);

      return o;
    };

    const self = this;

    stage.on("mousedown", function (e) {
      if (!self.props.loading) {
        if (self.props.mode.indexOf("create") >= 0) {
          // CREATE
          let elementCreate = null,
            o = null;

          if (self.props.mode === "create_rectangle") {
            o = Object.assign(
              {},
              defaultRectangle,
              self.props.lastStyle.rectangle,
              {
                id: U.getUniqueId(),
                pageNum,
                x: e.evt.offsetX,
                y: e.evt.offsetY,
              }
            );

            elementCreate = new Konva.Rect(o);
          }
          if (self.props.mode === "create_text") {
            o = Object.assign({}, defaultText, self.props.lastStyle.text, {
              id: U.getUniqueId(),
              pageNum,
              x: e.evt.offsetX,
              y: e.evt.offsetY,
            });

            elementCreate = new Konva.Text(o);
          }

          if (self.props.mode === "create_image") {
            if (self.props.imageFromEditor) {
              const imageObj = new Image();
              imageObj.src = self.props.imageFromEditor.src;

              o = Object.assign({}, defaultImage, {
                id: U.getUniqueId(),
                pageNum,
                x: e.evt.offsetX,
                y: e.evt.offsetY,
                image: imageObj,
                width: self.props.imageFromEditor.width,
                height: self.props.imageFromEditor.height,
                imageSrc: self.props.imageFromEditor.src,
              });

              elementCreate = new Konva.Image(o);
            }
          }

          layer.add(elementCreate);
          // create new transformer
          var trCreat = new Konva.Transformer({
            //'rotateEnabled':false
            rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          });
          layer.add(trCreat);
          trCreat.attachTo(elementCreate);
          layer.draw();

          updateElementCanvas(elementCreate);
          saveElement(o);
          setMode("");
        } else {
          if (e.target === stage) {
            stage.find("Transformer").destroy();
            updateElementCanvas(null);
            layer.draw();
            return;
          }
          //do nothing if clicked in Transformer
          if (e.target.name().indexOf("element") < 0) {
            return;
          }
          // remove old transformers
          stage.find("Transformer").destroy();

          // create new transformer
          var tr = new Konva.Transformer({
            //'rotateEnabled':false
            rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          });
          layer.add(tr);
          tr.attachTo(e.target);
          layer.draw();

          /***************************** */

          // Select element
          updateElementCanvas(e.target);

          e.target.on("dragend transformend", function () {
            updateElementCanvas(e.target);
          });
        }
      }
    });

    this.stage = stage;
    this.layer = layer;
    this.updateElementCanvas = updateElementCanvas;

    //SNAPPING

    // were can we snap our objects?
    function getLineGuideStops(skipShape) {
      // we can snap to stage borders and the center of the stage
      var vertical = [0, stage.width() / 2, stage.width()];
      var horizontal = [0, stage.height() / 2, stage.height()];

      // and we snap over edges and center of each object on the canvas
      stage
        .find(".element_text, .element_rectangle, .element_image")
        .forEach((guideItem) => {
          if (guideItem === skipShape) {
            return;
          }
          var box = guideItem.getClientRect();
          // and we can snap to all edges of shapes
          vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
          horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
        });
      return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat(),
      };
    }

    // what points of the object will trigger to snapping?
    // it can be just center of the object
    // but we will enable all edges and center
    function getObjectSnappingEdges(node) {
      var box = node.getClientRect();
      return {
        vertical: [
          {
            guide: Math.round(box.x),
            offset: Math.round(node.x() - box.x),
            snap: "start",
          },
          {
            guide: Math.round(box.x + box.width / 2),
            offset: Math.round(node.x() - box.x - box.width / 2),
            snap: "center",
          },
          {
            guide: Math.round(box.x + box.width),
            offset: Math.round(node.x() - box.x - box.width),
            snap: "end",
          },
        ],
        horizontal: [
          {
            guide: Math.round(box.y),
            offset: Math.round(node.y() - box.y),
            snap: "start",
          },
          {
            guide: Math.round(box.y + box.height / 2),
            offset: Math.round(node.y() - box.y - box.height / 2),
            snap: "center",
          },
          {
            guide: Math.round(box.y + box.height),
            offset: Math.round(node.y() - box.y - box.height),
            snap: "end",
          },
        ],
      };
    }

    // find all snapping possibilities
    function getGuides(lineGuideStops, itemBounds) {
      var resultV = [];
      var resultH = [];

      lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
          var diff = Math.abs(lineGuide - itemBound.guide);
          // if the distance between guild line and object snap point is close we can consider this for snapping
          if (diff < GUIDELINE_OFFSET) {
            resultV.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset,
            });
          }
        });
      });

      lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
          var diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < GUIDELINE_OFFSET) {
            resultH.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset,
            });
          }
        });
      });

      var guides = [];

      // find closest snap
      var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
      var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
      if (minV) {
        guides.push({
          lineGuide: minV.lineGuide,
          offset: minV.offset,
          orientation: "V",
          snap: minV.snap,
        });
      }
      if (minH) {
        guides.push({
          lineGuide: minH.lineGuide,
          offset: minH.offset,
          orientation: "H",
          snap: minH.snap,
        });
      }
      return guides;
    }

    function drawGuides(guides) {
      guides.forEach((lg) => {
        if (lg.orientation === "H") {
          var line = new Konva.Line({
            points: [-6000, lg.lineGuide, 6000, lg.lineGuide],
            stroke: "rgb(0, 161, 255)",
            strokeWidth: 1,
            name: "guid-line",
            dash: [4, 6],
          });
          layer.add(line);
          layer.batchDraw();
        } else if (lg.orientation === "V") {
          var lineB = new Konva.Line({
            points: [lg.lineGuide, -6000, lg.lineGuide, 6000],
            stroke: "rgb(0, 161, 255)",
            strokeWidth: 1,
            name: "guid-line",
            dash: [4, 6],
          });
          layer.add(lineB);
          layer.batchDraw();
        }
      });
    }

    layer.on("dragmove", function (e) {
      // clear all previous lines on the screen
      layer.find(".guid-line").destroy();

      // find possible snapping lines
      var lineGuideStops = getLineGuideStops(e.target);
      // find snapping points of current object
      var itemBounds = getObjectSnappingEdges(e.target);

      // now find where can we snap current object
      var guides = getGuides(lineGuideStops, itemBounds);

      // do nothing of no snapping
      if (!guides.length) {
        return;
      }

      drawGuides(guides);

      // now force object position
      guides.forEach((lg) => {
        switch (lg.snap) {
          case "start": {
            switch (lg.orientation) {
              case "V": {
                e.target.x(lg.lineGuide + lg.offset);
                break;
              }
              case "H": {
                e.target.y(lg.lineGuide + lg.offset);
                break;
              }
              default: {
              }
            }
            break;
          }
          case "center": {
            switch (lg.orientation) {
              case "V": {
                e.target.x(lg.lineGuide + lg.offset);
                break;
              }
              case "H": {
                e.target.y(lg.lineGuide + lg.offset);
                break;
              }
              default: {
              }
            }
            break;
          }
          case "end": {
            switch (lg.orientation) {
              case "V": {
                e.target.x(lg.lineGuide + lg.offset);
                break;
              }
              case "H": {
                e.target.y(lg.lineGuide + lg.offset);
                break;
              }
              default: {
              }
            }
            break;
          }
          default: {
          }
          //
        }
      });
    });

    stage.on("dragend", function (e) {
      // clear all previous lines on the screen
      layer.find(".guid-line").destroy();
      layer.batchDraw();
    });
  };

  render() {
    const { mode, loading } = this.props;
    return (
      <div
        className={
          "pdf-editor-canvas-edition-container" +
          (mode.indexOf("create") >= 0 ? " mode-create" : "") +
          (loading ? " hidden" : "")
        }
        ref={this.canvasEdition}
      ></div>
    );
  }
}

/* REDUX ***************************/

const {
  setElementToEditor,
  setMode,
  saveElement,
  updateElement,
  selectElement,
  deleteElement,
  quitDeletedFromPool,
  duplicateElement,
} = actions;

function mapStateToProps(state) {
  const {
    elementFromEditor,
    mode,
    pool,
    elementToDelete,
    elementToDuplicate,
    lastStyle,
    imageFromEditor,
  } = state.PDFEditor;
  return {
    elementFromEditor,
    mode,
    pool,
    elementToDelete,
    elementToDuplicate,
    lastStyle,
    imageFromEditor,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setElementToEditor: (element) => {
      dispatch(setElementToEditor(element));
    },
    setMode: (mode) => {
      dispatch(setMode(mode));
    },
    saveElement: (element) => {
      dispatch(saveElement(element));
    },
    updateElement: (elementData) => {
      dispatch(updateElement(elementData));
    },
    selectElement: (element) => {
      dispatch(selectElement(element));
    },
    deleteElement: (element) => {
      dispatch(deleteElement(element));
    },
    quitDeletedFromPool: (id) => {
      dispatch(quitDeletedFromPool(id));
    },
    duplicateElement: (element) => {
      dispatch(duplicateElement(element));
    },
  };
};

const canvasEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(canvasEditorVisual);

export default canvasEditor;
