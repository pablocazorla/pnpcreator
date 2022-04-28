import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "rdx/pdfEditor/actions";
import CanvasEditor from "./editor/canvasEditor";
import U from "utils";
import Loading from "components/loading";
import __ from "I18N";

class PageVisual extends Component {
  constructor(props) {
    super(props);

    const { widthPage } = this.props;

    this.state = {
      width: U.mmToPx(widthPage),
      height: 0, //U.mmToPx(297),
      loading: false,
      href: "",
      editorData: null,
      counterGetEditorData: 1,
    };
    this.canvas = React.createRef();
    this.canvasComposite = React.createRef();
    this.linkDownload = React.createRef();
    this.rendered = false;
  }
  componentDidUpdate() {
    if (this.props.pdfDoc && !this.rendered) {
      this.renderPage();
    }
  }
  componentDidMount() {
    this.renderPage();
  }

  renderPage = () => {
    const { pdfDoc, pageNum, widthPage, setPageHeight } = this.props;

    if (pdfDoc) {
      this.rendered = true;
      this.setState({ loading: true });

      const canvas = this.canvas.current,
        ctx = canvas.getContext("2d"),
        self = this;

      pdfDoc.getPage(pageNum).then((page) => {
        var viewport = page.getViewport(1);

        const width = U.mmToPx(widthPage);

        var scale = width / viewport.width;

        const height = viewport.height * scale;

        //console.log('height',height);

        setPageHeight(height);

        self.setState({
          width,
          height,
        });
        setTimeout(() => {
          const viewport = page.getViewport(scale);
          const renderContext = {
            canvasContext: ctx,
            viewport,
            transform: [1, 0, 0, 1, 0, 0],
            background: "rgba(255,255,255,1)",
          };
          page.render(renderContext).then(() => {
            self.setState({ loading: false });
            // const dataURL = canvas.toDataURL();
            // U.dataURIToBlob(dataURL, function(blob){
            //   const href = URL.createObjectURL(blob);
            //   self.setState({href});
            // });
          });
        }, 300);
      });
    }
  };
  getEditorData = (editorData) => {
    this.setState({ editorData });
  };
  downloadAsPNG = (canvasComp) => {
    const { linkDownload } = this;
    const self = this;

    const dataURL = canvasComp.toDataURL();
    U.dataURIToBlob(dataURL, function (blob) {
      const href = URL.createObjectURL(blob);
      self.setState({ href });
      setTimeout(function () {
        linkDownload.current.click();
      }, 300);
    });
  };
  getCompositeCanvas = (callbk) => {
    const self = this;
    this.setState({
      counterGetEditorData: this.state.counterGetEditorData + 1,
    });
    setTimeout(function () {
      if (self.state.editorData) {
        const { width, height } = self.state;

        const ctxComp = self.canvasComposite.current.getContext("2d");

        const ctxCanvas = self.canvas.current.getContext("2d");

        const canvasImgData = ctxCanvas.getImageData(0, 0, width, height);

        ctxComp.clearRect(0, 0, width, height);

        ctxComp.putImageData(canvasImgData, 0, 0);

        ctxComp.drawImage(self.state.editorData, 0, 0);

        callbk(self.canvasComposite.current);
      }
    }, 200);
  };
  render() {
    const { pageScale, pageNum } = this.props;
    const { width, height, loading, href, counterGetEditorData } = this.state;

    return (
      <div className="pdf-editor-page_wrap">
        <div className="pdf-editor-page_header">
          <div className="row-inline">
            <div className="col">{__("Page") + " " + pageNum}</div>
            <div className="separator"></div>
            <div className="col">
              <div
                className="btn"
                onClick={() => {
                  this.getCompositeCanvas(this.downloadAsPNG);
                }}
              >
                {__("Download as .png")}
              </div>
              <a
                className="link-hidden"
                href={href}
                download={__("page-") + pageNum + ".png"}
                ref={this.linkDownload}
              >
                tag A
              </a>
            </div>
          </div>
        </div>
        <div
          className="pdf-editor-page"
          style={{
            height: parseInt((height * pageScale) / 100 + 50) + "px",
          }}
        >
          <Loading loading={loading} />
          <div
            className="pdf-editor-page_canvas"
            style={{
              transform: "scale(" + pageScale / 100 + ")",
            }}
          >
            <div className="pdf-editor-page_canvas-container">
              <canvas
                className="canvas-composite"
                width={width}
                height={height}
                ref={this.canvasComposite}
              />
              <canvas
                className="canvas-white-no-restricted canvas-pdf"
                width={width}
                height={height}
                ref={this.canvas}
              />
              <CanvasEditor
                width={width}
                height={height}
                pageNum={pageNum}
                loading={loading}
                getEditorData={this.getEditorData}
                counterGetEditorData={counterGetEditorData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* REDUX ***************************/

const { setPageHeight } = actions;

// function mapStateToProps(state) {
//   const {pageRendered,pageRenderedAll,pageScale} = state.PDFEditor;
//   return {pageRendered,pageRenderedAll,pageScale};
// }
const mapDispatchToProps = (dispatch) => {
  return {
    setPageHeight: (size) => {
      dispatch(setPageHeight(size));
    },
  };
};

const Page = connect(
  null, //mapStateToProps,
  mapDispatchToProps
)(PageVisual);

export default Page;
