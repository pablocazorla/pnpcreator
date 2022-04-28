import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/pdfEditor/actions';
import __ from 'I18N';
import InputRange from 'components/range';
import U from 'utils';

class HeaderVisual extends Component {
  constructor(props) {
    super(props);
    const {pageScale} = this.props;
    this.state = {
      pageScale,
      fixed: false
    }
    
    
    
  }
  //static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.someValue!==prevState.someValue){
  //     return { someState: nextProps.someValue};
  //  }
  //  else return null;
  //}
  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.status === 'in' && prevProps.status !== 'in'){
  //     //Perform some operation here
  //     this.setState({ status: 'in'});
  //     this.setIn('in');
  //   }
  //   if(this.props.status === 'out' && prevProps.status !== 'out'){
  //     //Perform some operation here
  //     this.setState({ status: 'out'});
  //     this.setIn('out');
  //   }
  // }
  componentDidMount(){
    const {pageScale,getWidthRatioPage} = this.props;

    const isFixed = () => {
      this.setState({
        fixed: pageScale === getWidthRatioPage()
      });
    };
    setTimeout(isFixed.bind(this),200);
    
  }
  setNumPage = dir => {
    if(dir === 0){
      const {pageRenderedAll,setPageRenderedAll} = this.props;
      const newPageRenderedAll = pageRenderedAll === 0 ? 1 : 0;
      setPageRenderedAll(newPageRenderedAll);
    }else{
      const {pageRendered,setPageRendered,numPages} = this.props;

      let newPageRendered = pageRendered + dir;
      newPageRendered = newPageRendered <= 0 ? numPages : newPageRendered;
      newPageRendered = newPageRendered > numPages ? 1 : newPageRendered;
      setPageRendered(newPageRendered);
    }
  }
  onChange = value => {
    this.props.setPageScale(value);
    this.setState({pageScale:value,fixed:false});
  }
  render() {
    const {pageRendered,pageRenderedAll,numPages,getWidthRatioPage,pageWidth,pageHeight} = this.props;
    const {pageScale,fixed} = this.state;

    const pageWidthMM = U.pxToMM(pageWidth),
      pageHeightMM = U.pxToMM(pageHeight);

      let fixScale = getWidthRatioPage();  
      

    return <div className="section-header">
      <div className="section-header-col">
        <div className="section-header-label">
        {__('Render page')}:
        </div>
        <div className={'pdf-editor-current_page_box' + (pageRenderedAll === 1 ? ' disabled' : '')}>
          <div className="btn btn-icon" onClick={() => {this.setNumPage(-1);}}>
            <i className="fa fa-chevron-left"></i>
          </div>
          <div className="section-header-label">
            {pageRendered}/<span className="muted">{numPages}</span>
          </div>
          <div className="btn btn-icon" onClick={() => {this.setNumPage(1);}}>
            <i className="fa fa-chevron-right"></i>
          </div>
        </div>
        <div className={'btn' + (pageRenderedAll === 1 ? ' primary' : '')} onClick={() => {this.setNumPage(0);}}>
          {__('All pages')}
        </div>
        <div className="section-header-separator"/>
        <div className="section-header-label">
          <u>{__('Page size')}</u>: {pageWidthMM + 'x' + pageHeightMM + ' mm'}
        </div>
        <div className="section-header-separator"/>

        <div className="section-header-label">
          {__('Scale')}:
        </div>
        <InputRange
          width={160}
          min={5}
          value={pageScale}
          onChange={this.onChange}
        />
        <div className="section-header-label tar" style={{
          'width':'40px','marginRight':'6px'
        }}>
          {pageScale + '%'}
        </div>
        {fixScale < 100 ? <div className={'btn' + (fixed ? ' primary' : '')} onClick={() => {
            this.props.setPageScale(fixScale);         
            this.setState({pageScale:fixScale,fixed:true});
          }}>
          {__('Fix')}
        </div> : null}
        <div className={'btn' + (pageScale === 100 ? ' primary' : '')}
          onClick={() => {
            this.props.setPageScale(100);
            this.setState({pageScale:100,fixed:false});
          }}
        >
          100%
        </div>








      </div>
      <div className="section-header-col">
        <div className="btn primary">
          <i className="fa fa-file-pdf-o"></i>
          {__('Download as PDF')}
        </div>
      </div>
    </div>;
  }
};

/* REDUX ***************************/

const {  
  setPageRendered,
  setPageRenderedAll,
  setPageScale
} = actions;

function mapStateToProps(state) {
  const {pageRendered,pageRenderedAll,pageScale,pageWidth,pageHeight} = state.PDFEditor;
  return {pageRendered,pageRenderedAll,pageScale,pageWidth,pageHeight};
}
const mapDispatchToProps = dispatch => {
	return {
    setPageRendered: (pageRendered) => {
      dispatch(setPageRendered(pageRendered))
    },
    setPageRenderedAll: (pageRenderedAll) => {
      dispatch(setPageRenderedAll(pageRenderedAll))
    },
    setPageScale: (pageScale) => {
      dispatch(setPageScale(pageScale))
    }
	}
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderVisual);

export default Header;