import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/pdfEditor/actions';
import data from 'data/pdfEditor';
import Page from './page';
import Header from './header';
import Editor from './editor';
import U from 'utils';

const MyPDF = data.pdf;

class PDFEditorVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      pages: [{pageNum: 1},{pageNum: 2}],
      width: data.width || 210,
      pdf_doc: null,
      file: MyPDF,//null,
      pdfName: 'MyPDF'
    };
    this.fileInput = React.createRef();
    this.pageListDiv = React.createRef();
  }
  componentDidMount(){
    let self = this;
      setTimeout(()=>{
        self.renderPDF();
      },400);
    this.props.setPageWidth(U.mmToPx(data.width));
  }
  getWidthRatioPage = () => {
    if(this.pageListDiv && this.pageListDiv.current){
      var rect = this.pageListDiv.current.getBoundingClientRect();
      const {width} = this.state;
      return parseInt(rect.width/U.mmToPx(width) * 100);      
    }else{
      return 100;
    }    
  }
  renderPDF() {    
    if (window && window.pdfjsLib && this.state.file) {
      
      const self = this;
      const url = this.state.file;//URL.createObjectURL(this.state.file);

      window.pdfjsLib
        .getDocument(url)
        .then(function (pdf_doc) {

          let pages = [];

         for(var i = 1;i <= pdf_doc.numPages;i++ ){
          pages.push({
           // render: false,
            pageNum: i
          });
         }

          self.setState({
            pages,
            pdf_doc
          });
        });
    }
  }
  render() {
    const {pageRendered,pageRenderedAll,pageScale} = this.props;

    const {
      //step,
      pages,pdf_doc,width} = this.state;

    let content = <div className="pdf-editor-page-list" ref={this.pageListDiv}>
      {pages.map((p,k) => {

        const renderPage = pageRenderedAll === 1 ? true : (p.pageNum === pageRendered ? true : false);

        return renderPage ? <Page key={k} pdfDoc={pdf_doc} pageNum={p.pageNum} widthPage={width} pageScale={pageScale}/> : null;
      })}
    </div>;

    return <>
      <div className="container">
        <Header
          numPages={pages.length}
          getWidthRatioPage={this.getWidthRatioPage}
        />
      </div>
      {content}
      <Editor/>
    </>;
  }
};

/* REDUX ***************************/

const {  
  setPageWidth
} = actions;

function mapStateToProps(state) {
  const {pageRendered,pageRenderedAll,pageScale} = state.PDFEditor;
  return {pageRendered,pageRenderedAll,pageScale};
}
const mapDispatchToProps = dispatch => {
	return {
    setPageWidth: (size) => {
      dispatch(setPageWidth(size))
    }
	}
}

const PDFEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PDFEditorVisual);

export default PDFEditor;