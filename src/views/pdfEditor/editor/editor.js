import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "rdx/pdfEditor/actions";
import __ from "I18N";
import InputEditor from "./input";
import Favorites from "./favorites";
import data from "data/pdfEditor";

const pxToMM = 25.4 / 300;

class EditorVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      scaleX: 1,
      scaleY: 1,
      zIndex: 0,
      rotation: 0,
      fill: "#00000",
      opacity: 1,
      strokeWidth: 0,
      stroke: "#00000",

      shadowEnabled: true,
      shadowColor: "#00000",
      shadowOpacity: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,

      cornerRadius: 0,

      fontFamily: "Arial",
      fontStyle: "normal",
      fontSize: 12,
      lineHeight: 1,
      align: "left",
      textDecoration: "",
      text: "Sample text",

      imagePool: [],
      showImages: false,
      imageSelected: -1,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.elementToEditor !== prevProps.elementToEditor) {
      const { elementToEditor } = this.props;

      this.setState({ showImages: false, imageSelected: -1 });
      if (!elementToEditor) {
        this.setState({ type: null });
      } else {
        const {
          type,
          x,
          y,
          width,
          height,
          scaleX,
          scaleY,
          zIndex,
          rotation,
          fill,
          opacity,
          strokeWidth,
          stroke,

          shadowEnabled,
          shadowColor,
          shadowOpacity,
          shadowBlur,
          shadowOffsetX,
          shadowOffsetY,

          cornerRadius,

          fontFamily,
          fontStyle,
          fontSize,
          lineHeight,
          align,
          textDecoration,
          text,
        } = elementToEditor;

        this.setState({
          type,
          x,
          y,
          width,
          height,
          scaleX,
          scaleY,
          zIndex,
          rotation,
          fill,
          opacity,
          strokeWidth,
          stroke,

          shadowEnabled,
          shadowColor,
          shadowOpacity,
          shadowBlur,
          shadowOffsetX,
          shadowOffsetY,

          cornerRadius,

          fontFamily,
          fontStyle,
          fontSize,
          lineHeight,
          align,
          textDecoration,
          text,
        });
      }
      //Perform some operation here
      // this.setState({ status: 'in'});
    }
  }
  componentDidMount() {
    fetch("https://translation.googleapis.com/language/translate/v2", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: {
        q:
          "The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza pyramid complex.",
        source: "en",
        target: "es",
        format: "text",
      },
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.log("err", err);
      });

    const imagePool = [];
    const { images } = data;

    const imagesTotal = Object.keys(images).length;
    let imagesCount = 0;

    const self = this;

    const loadImage = (name) => {
      const img = new Image();
      const src = images[name];

      img.onload = () => {
        imagePool.push({
          name,
          src,
          width: img.width,
          height: img.height,
        });
        imagesCount++;

        if (imagesCount === imagesTotal) {
          self.setState({ imagePool });
        }
      };

      img.src = src;
    };

    for (var a in images) {
      loadImage(a);
    }
  }
  onChange = (nameProp, val) => {
    const { elementToEditor, setElementFromEditor, updateElement } = this.props;
    const { type } = this.state;

    if (elementToEditor) {
      const elementUpdate = {
        id: elementToEditor.id,
        type,
        [nameProp]: val,
      };
      setElementFromEditor(elementUpdate);
      updateElement(elementUpdate);
    }
  };
  render() {
    const { mode, setMode, toMM, setImageFromEditor } = this.props;

    const {
      type,
      x,
      y,
      width,
      height,
      scaleX,
      scaleY,
      zIndex,
      rotation,
      fill,
      opacity,
      strokeWidth,
      stroke,

      shadowEnabled,
      shadowColor,
      shadowOpacity,
      shadowBlur,
      shadowOffsetX,
      shadowOffsetY,

      cornerRadius,

      fontFamily,
      fontStyle,
      fontSize,
      lineHeight,
      align,
      textDecoration,
      text,

      imagePool,
      showImages,
      imageSelected,
    } = this.state;

    const fpxmm = toMM ? pxToMM : 1;

    return type ? (
      <div className="pdfeditorpanel-editor__editor">
        {/* Basics */}
        <div>
          <Favorites />
          <div className="row">
            <div className="col col-50 first">
              <InputEditor
                label="x"
                sufix={toMM ? "mm" : "px"}
                value={x * fpxmm}
                onChange={(val) => {
                  this.onChange("x", val / fpxmm);
                }}
              />
            </div>
            <div className="col col-50 last">
              <InputEditor
                label="y"
                sufix={toMM ? "mm" : "px"}
                value={y * fpxmm}
                onChange={(val) => {
                  this.onChange("y", val / fpxmm);
                }}
              />
            </div>
          </div>
          {type === "image" ? null : (
            <div className="row">
              <div className="col col-50 first">
                <InputEditor
                  label="width"
                  sufix={toMM ? "mm" : "px"}
                  value={width * fpxmm}
                  onChange={(val) => {
                    this.onChange("width", val / fpxmm);
                  }}
                />
              </div>
              <div className="col col-50 last">
                <InputEditor
                  label="height"
                  sufix={toMM ? "mm" : "px"}
                  value={height * fpxmm}
                  onChange={(val) => {
                    this.onChange("height", val / fpxmm);
                  }}
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="col col-50 first">
              <InputEditor
                label="scaleX"
                step={0.1}
                value={scaleX}
                onChange={(val) => {
                  this.onChange("scaleX", val);
                }}
              />
            </div>
            <div className="col col-50 last">
              <InputEditor
                label="scaleY"
                step={0.1}
                value={scaleY}
                onChange={(val) => {
                  this.onChange("scaleY", val);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-50 first">
              <InputEditor
                label="Z index"
                min={0}
                step={1}
                value={zIndex}
                onChange={(val) => {
                  this.onChange("zIndex", val);
                }}
              />
            </div>
            <div className="col col-50 last">
              <InputEditor
                label="Rotation"
                sufix="º"
                value={rotation}
                onChange={(val) => {
                  this.onChange("rotation", val);
                }}
              />
            </div>
          </div>
          <div className="row">
            {type === "image" ? null : (
              <div className="col col-50 first">
                <InputEditor
                  label="Color"
                  type="color"
                  value={fill}
                  onChange={(val) => {
                    this.onChange("fill", val);
                  }}
                />
              </div>
            )}
            <div className="col col-50 last">
              <InputEditor
                label="Opacity"
                value={opacity * 100}
                //  min={0}
                // max={100}
                onChange={(val) => {
                  this.onChange("opacity", val / 100);
                }}
              />
            </div>
          </div>
          {type === "image" ? null : (
            <div>
              <h4>{__("Border")}</h4>
              <div className="row">
                <div className="col col-50 first">
                  <InputEditor
                    label="Width"
                    sufix={toMM ? "mm" : "px"}
                    value={strokeWidth * fpxmm}
                    onChange={(val) => {
                      this.onChange("strokeWidth", val / fpxmm);
                    }}
                  />
                </div>
                <div className="col col-50 last">
                  <InputEditor
                    label="Color"
                    type="color"
                    value={stroke}
                    onChange={(val) => {
                      this.onChange("stroke", val);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* By Type */}
        {type === "rectangle" ? (
          <div>
            <h3>{__("Rectangle")}</h3>

            <div className="row">
              <div className="col col-50">
                <InputEditor
                  label="Corder radius"
                  sufix={toMM ? "mm" : "px"}
                  value={cornerRadius * fpxmm}
                  onChange={(val) => {
                    this.onChange("cornerRadius", val / fpxmm);
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}

        {type === "text" ? (
          <div>
            <h3>{__("Text")}</h3>

            <div className="row">
              <div className="col col-50 first">
                <InputEditor
                  label="Font"
                  type="text"
                  options={["Arial", "Calibri", "Lato"]}
                  value={fontFamily}
                  onChange={(val) => {
                    this.onChange("fontFamily", val);
                  }}
                />
              </div>
              <div className="col col-50 last">
                <InputEditor
                  label="Style"
                  type="select"
                  options={[
                    {
                      text: "Normal",
                      value: "normal",
                    },
                    {
                      text: "Bold",
                      value: "bold",
                    },
                    {
                      text: "Italic",
                      value: "italic",
                    },
                  ]}
                  value={fontStyle}
                  onChange={(val) => {
                    this.onChange("fontStyle", val);
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-50 first">
                <InputEditor
                  label="Size"
                  sufix={toMM ? "mm" : "px"}
                  value={fontSize * fpxmm}
                  onChange={(val) => {
                    this.onChange("fontSize", val / fpxmm);
                  }}
                />
              </div>
              <div className="col col-50 last">
                <InputEditor
                  label="Line Height"
                  step={0.1}
                  value={lineHeight}
                  onChange={(val) => {
                    this.onChange("lineHeight", val);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col col-50 first">
                <InputEditor
                  label="Align"
                  type="select"
                  options={[
                    {
                      text: "Left",
                      value: "left",
                    },
                    {
                      text: "Center",
                      value: "center",
                    },
                    {
                      text: "Right",
                      value: "right",
                    },
                  ]}
                  value={align}
                  onChange={(val) => {
                    this.onChange("align", val);
                  }}
                />
              </div>
              <div className="col col-50">
                <InputEditor
                  label="Decoration"
                  type="select"
                  options={[
                    {
                      text: "None",
                      value: "",
                    },
                    {
                      text: "Underline",
                      value: "underline",
                    },
                    {
                      text: "Line through",
                      value: "line-through",
                    },
                  ]}
                  value={textDecoration}
                  onChange={(val) => {
                    this.onChange("textDecoration", val);
                  }}
                />
              </div>
            </div>
            <div>
              <InputEditor
                label="Text"
                type="textarea"
                value={text}
                onChange={(val) => {
                  this.onChange("text", val);
                }}
              />
            </div>
          </div>
        ) : null}

        {/* Shadow */}
        <div>
          <h3>{__("Shadow")}</h3>
          <div className="row">
            <div className="col col-50 first">
              <InputEditor
                label="Shadow"
                type="checkbox"
                value={shadowEnabled}
                onChange={(val) => {
                  this.setState({ shadowEnabled: val });
                  this.onChange("shadowEnabled", val);
                }}
              />
            </div>
            {shadowEnabled ? (
              <div className="col col-50 first">
                <InputEditor
                  label="Blur"
                  sufix={toMM ? "mm" : "px"}
                  value={shadowBlur * fpxmm}
                  onChange={(val) => {
                    this.onChange("shadowBlur", val / fpxmm);
                  }}
                />
              </div>
            ) : null}
          </div>
          {shadowEnabled ? (
            <div>
              <div className="row">
                <div className="col col-50 first">
                  <InputEditor
                    label="Color"
                    type="color"
                    value={shadowColor}
                    onChange={(val) => {
                      this.onChange("shadowColor", val);
                    }}
                  />
                </div>
                <div className="col col-50 last">
                  <InputEditor
                    label="Opacity"
                    min={0}
                    max={100}
                    value={shadowOpacity * 100}
                    onChange={(val) => {
                      this.onChange("shadowOpacity", val / 100);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col col-50 first">
                  <InputEditor
                    label="x"
                    sufix={toMM ? "mm" : "px"}
                    value={shadowOffsetX * fpxmm}
                    onChange={(val) => {
                      this.onChange("shadowOffsetX", val / fpxmm);
                    }}
                  />
                </div>
                <div className="col col-50 last">
                  <InputEditor
                    label="y"
                    sufix={toMM ? "mm" : "px"}
                    value={shadowOffsetY * fpxmm}
                    onChange={(val) => {
                      this.onChange("shadowOffsetY", val / fpxmm);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ) : // CREATE
    showImages ? (
      <div className="pdfeditorpanel-editor__imageList">
        <div
          className="pdfeditorpanel-editor__image-cancel"
          onClick={() => {
            this.setState({ showImages: false });
          }}
        >
          <i className="fa fa-times"></i> {__("Cancel")}
        </div>
        {imagePool.map((img, k) => {
          return (
            <div className="pdfeditorpanel-editor__imageList-item" key={k}>
              <div
                className={
                  "pdfeditorpanel-editor__imageList-item-img-cont" +
                  (imageSelected === k ? " selected" : "")
                }
                onClick={() => {
                  this.setState({ imageSelected: k });
                  setImageFromEditor(img);
                  setMode("create_image");
                }}
              >
                <img src={img.src} alt={img.name} />
              </div>
              {img.name}
            </div>
          );
        })}
      </div>
    ) : (
      <div className="pdfeditorpanel-editor__no-selected">
        <p className="italic">{__("Nothing selected")}.</p>
        <hr />
        <h2>{__("Create")}:</h2>
        <div
          className={"btn" + (mode === "create_text" ? " primary" : "")}
          onClick={() => {
            setMode("create_text");
          }}
        >
          <i className="fa fa-font"></i>
          {__("Text")}
        </div>
        <div
          className={"btn" + (mode === "create_rectangle" ? " primary" : "")}
          onClick={() => {
            setMode("create_rectangle");
          }}
        >
          <i className="fa fa-stop"></i>
          {__("Rectangle")}
        </div>
        <div
          className={"btn"}
          onClick={() => {
            this.setState({ showImages: true });
          }}
        >
          <i className="fa fa-picture-o"></i>
          {__("Image")}
        </div>
      </div>
    );
  }
}

/* REDUX ***************************/

const {
  setElementFromEditor,
  updateElement,
  setMode,
  setImageFromEditor,
} = actions;

function mapStateToProps(state) {
  const { elementToEditor, mode, toMM } = state.PDFEditor;
  return { elementToEditor, mode, toMM };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setElementFromEditor: (element) => {
      dispatch(setElementFromEditor(element));
    },
    setMode: (mode) => {
      dispatch(setMode(mode));
    },
    updateElement: (elementData) => {
      dispatch(updateElement(elementData));
    },
    setImageFromEditor: (image) => {
      dispatch(setImageFromEditor(image));
    },
  };
};

const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorVisual);

export default Editor;
