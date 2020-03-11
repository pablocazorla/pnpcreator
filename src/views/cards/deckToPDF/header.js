import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/cards/actions';
import {clases} from 'utils';
import __ from 'I18N';
import DownloadAsPDF from './downloadAsPDF';

class HeaderVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageMargin:0,
      filename: __('Cards')
    };
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
    this.setState({pageMargin:this.props.currentPageMargin});
  }
  //onChangeSize = (size,rotated,margin) => {
   // console.log(size + ' - ' + rotated);
  //}
  render() {
    const {currentPageSize,currentPageRotated,setCurrentPageSize,setCurrentPageRotated,setCurrentPageMargin,
      cardsPerPage,
      numPages,
      numCards,
      imagesRendered
    } = this.props;
    const {pageMargin,filename} = this.state;

    return <div className="container">
      <div className="section-header">
        <div className="section-header-col">
          <div className={clases('btn btn-icon', {'current':currentPageSize === 'A3'})}
            onClick={() => {
              setCurrentPageSize('A3');
              //this.onChangeSize('A3',currentPageRotated,pageMargin);
            }}
          >
            A3
          </div>
          <div className={clases('btn btn-icon', {'current':currentPageSize === 'A4'})}
            onClick={() => {
              setCurrentPageSize('A4');
              //this.onChangeSize('A4',currentPageRotated,pageMargin);
            }}
          >
            A4
          </div>
          <div className="btn btn-icon btn-page-orientation"
            onClick={() => {
              const rotated = currentPageRotated === '0' ? '1' : '0';
              setCurrentPageRotated(rotated);
              //this.onChangeSize(currentPageSize,rotated,pageMargin);
            }}
          >
            <i className={clases('fa fa-file-o', {'rotated':currentPageRotated === '1'})} aria-hidden="true"></i>
          </div>
          <div className="section-header-separator"/>
          <div className="input-group">
            <div className="input-label">
              {__('Margin') + ':'}
            </div>
            <div className="input" style={{'width':'60px'}} >
              <input type="number" value={pageMargin}
                onChange={e => {
                  this.setState({pageMargin: parseInt(e.target.value)});
                }}
                onBlur={e => {
                  const margin = parseInt(e.target.value);
                  setCurrentPageMargin(margin);
                  //this.onChangeSize(currentPageSize,currentPageRotated,margin);
                }}
              />
            </div>
            <div className="input-label">mm</div>
          </div>
        </div>
        <div className="section-header-col">
          <div className="deck-to-pdf-info">
            {numCards + ' ' + __('cards') + ', ' + numPages + ' ' + __('pages') + ' : ' + cardsPerPage + ' ' + __('cards per page')}
          </div>
          <div className="section-header-separator"/>
          <div className="input-group">
            <div className="input-label">
              {__('File name') + ':'}
            </div>
            <div className="input" style={{'width':'180px'}} >
              <input type="text" value={filename}
                onChange={e => {
                  this.setState({filename: e.target.value.trim()});
                }}
                onBlur={e => {
                  //const margin = parseInt(e.target.value);
                  //setCurrentPageMargin(margin);
                  //this.onChangeSize(currentPageSize,currentPageRotated,margin);
                }}
              />
            </div>
            <div className="input-label">.pdf</div>
          </div>
          <div className="section-header-separator"/>
          <DownloadAsPDF
            images={imagesRendered}
            pageSize={currentPageSize}
            rotated={currentPageRotated}
            filename={filename}
          />
        </div>
      </div>
    </div>
  }
};

/* REDUX ***************************/

const {  
  setCurrentPageSize,
  setCurrentPageRotated,
  setCurrentPageMargin
} = actions;

function mapStateToProps(state) {
  const {currentPageSize,currentPageRotated,currentPageMargin} = state.Cards;
  return {currentPageSize,currentPageRotated,currentPageMargin};
}
const mapDispatchToProps = dispatch => {
	return {
    setCurrentPageSize: (pageSize) => {
      dispatch(setCurrentPageSize(pageSize))
    },
    setCurrentPageRotated: (pageRotated) => {
      dispatch(setCurrentPageRotated(pageRotated))
    },
    setCurrentPageMargin: (pageSize) => {
      dispatch(setCurrentPageMargin(pageSize))
    }
	}
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderVisual);

export default Header;