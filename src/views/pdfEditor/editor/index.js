import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/pdfEditor/actions';
import __ from 'I18N';
import EditorContent from './editor';

class EditorVisual extends Component {  
  constructor(props) {
   super(props);

   const {editorX,editorY,editorW} = this.props;

    this.state = {
      x: editorX,
      y: editorY,
      width: editorW
    };
    this.xInit = 0;
    this.yInit = 0;
    this.widthInit = 0;
    this.xmouseInit = 0;
    this.ymouseInit = 0;
    this.dragging = false;
    this.sizingLeft = false;
    this.sizingRight = false;
  }
  componentDidMount(){
    if(window){
      window.addEventListener('mousemove',this.onMouseMove);
      window.addEventListener('mouseup',this.onMouseUp);
    }
  }
  componentWillUnmount(){
    if(window){
      window.removeEventListener('mousemove',this.onMouseMove);
      window.removeEventListener('mouseup',this.onMouseUp);
    }
  }
  onMouseDown_header = e => {
    this.xInit = this.state.x;
    this.yInit = this.state.y;
    this.xmouseInit = e.pageX;
    this.ymouseInit = e.pageY;
    this.dragging = true;
  }
  onMouseDown_left = e => {    
    this.widthInit = this.state.width;
    this.xmouseInit = e.pageX;
    this.sizingLeft = true;
  }
  onMouseDown_right = e => {    
    this.widthInit = this.state.width;
    this.xInit = this.state.x;
    this.xmouseInit = e.pageX;
    this.sizingRight = true;
  }
  onMouseMove = e => {
    if(this.dragging){
      const x = this.xInit + (this.xmouseInit - e.pageX);
      const y = this.yInit + (e.pageY - this.ymouseInit);
      this.setState({x,y});
    }
    if(this.sizingLeft){
      let width = this.widthInit + (this.xmouseInit - e.pageX);
      width = width < 320 ? 320 : width;
      width = width > 1200 ? 1200 : width;
      this.setState({width});
    }
    if(this.sizingRight){
      
      let width = this.widthInit + (e.pageX - this.xmouseInit);
      if(width > 320 && width < 1200){
        const x = this.xInit + (this.xmouseInit - e.pageX);
        this.setState({x});
      }
      width = width < 320 ? 320 : width;
      width = width > 1200 ? 1200 : width;
      this.setState({width});
    }
  }
  onMouseUp = () => {
    if(this.dragging){
      this.dragging = false;
      const {x,y} = this.state;
      this.props.setEditorX(x);
      this.props.setEditorY(y);
    }
    if(this.sizingLeft){
      this.sizingLeft = false;
      const {width} = this.state;
      this.props.setEditorW(width);
    }
    if(this.sizingRight){
      this.sizingRight = false;
      const {x,width} = this.state;
      this.props.setEditorX(x);
      this.props.setEditorW(width);
    }
  }
  render() {
    const {x,y,width} = this.state;
    const {elementToEditor,selectedElement,deleteElement,duplicateElement,setToMM,toMM} = this.props;

    let typeEdited = null;
    if(elementToEditor){
      
      switch(elementToEditor.type){
        case 'text':
          typeEdited = __('Text');
          break;
        case 'image':
          typeEdited = __('Image');
          break;
        default:
          typeEdited = __('Rectangle');
      }
    }


    return <div
        className="pdfeditorpanel"
        style={{
          'right': x + 'px',
          'top': y + 'px',
          'width': width + 'px'
        }}
      >
      <div className="pdfeditorpanel_header"
        onMouseDown={this.onMouseDown_header}
      >
        <span className="pdfeditorpanel_title">{__('Editor')}</span>
        {typeEdited ? <span className="pdfeditorpanel_subtitle">{typeEdited}</span> : null}
      </div>
      {selectedElement ? <div className="pdfeditorpanel_bottom_head">        
        <div className="pdfe_bh_btn">
          <input type="checkbox" id="pdfeditorpanel_bottom_head_mm_checkbox"
            checked={toMM}
            onChange={e => {
              setToMM(e.target.checked);
            }}
          />
          <label htmlFor="pdfeditorpanel_bottom_head_mm_checkbox">{__('mm')}</label>
        </div>
        {elementToEditor && elementToEditor.type === 'image' ? null : <div className="pdfe_bh_btn"
          onClick={() => {duplicateElement(selectedElement);}}
        >
          <i className="fa fa-copy"></i>
          {__('Duplicate')}
        </div>}
        <div className="pdfe_bh_btn delete"
          onClick={() => {deleteElement(selectedElement);}}
        >
          <i className="fa fa-trash"></i>
          {__('Delete')}
        </div>        
      </div> : null}
      <div className="pdfeditorpanel_body">
        <div className="pdfeditorpanel_body-container">
          <EditorContent/>
        </div>
      </div>
      <div className="pdfeditorpanel_sizer left"
        onMouseDown={this.onMouseDown_left}
      />
      <div className="pdfeditorpanel_sizer right"
        onMouseDown={this.onMouseDown_right}
      />
    </div>;
  }
};

/* REDUX ***************************/

const {  
  setEditorX,
  setEditorY,
  setEditorW,
  deleteElement,
  duplicateElement,
  setToMM
} = actions;

function mapStateToProps(state) {
  const {editorX,editorY,editorW,elementToEditor,selectedElement,toMM} = state.PDFEditor;
  return {editorX,editorY,editorW,elementToEditor,selectedElement,toMM};
}
const mapDispatchToProps = dispatch => {
	return {
    setEditorX: (val) => {
      dispatch(setEditorX(val))
    },
    setEditorY: (val) => {
      dispatch(setEditorY(val))
    },
    setEditorW: (val) => {
      dispatch(setEditorW(val))
    },
    deleteElement: (element) => {
      dispatch(deleteElement(element))
    },
    duplicateElement: (element) => {
      dispatch(duplicateElement(element))
    },
    setToMM: (status) => {
      dispatch(setToMM(status))
    },
	}
}

const Editor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorVisual);

export default Editor;