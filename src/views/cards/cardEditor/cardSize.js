import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/cards/actions';

class CardSizeVisual extends Component {
  constructor(props) {
    super(props);

    this.xInit = 0;
    this.sizeInit = 0;
    this.isMoving = false;
    this.btn = 1;

    this.container = React.createRef();
    this.maxWidth = 1000;
  }
  componentDidMount(){
    if(window){
      window.addEventListener('mousemove',this.onMouseMove);
      window.addEventListener('mouseup',this.onMouseUp);
      window.addEventListener('resize',this.onResize);
      this.onResize();
    }
  }
  onResize = () => {
    const {currentCardSize,setCurrentCardSize} = this.props;
    if(this.container){
      const positionInfo = this.container.current.getBoundingClientRect();      
      this.maxWidth = positionInfo.width;

      if(currentCardSize > this.maxWidth){
        setCurrentCardSize(this.maxWidth);
      }
    }

  }
  componentWillUnmount(){
    if(window){
      window.removeEventListener('mousemove',this.onMouseMove);
      window.removeEventListener('mouseup',this.onMouseUp);
      window.removeEventListener('resize',this.onResize);
    }
  }
  onMouseDown = (e,btn) => {
    this.sizeInit = this.props.currentCardSize;
    this.xInit = e.pageX;
    this.btn = btn;
    this.isMoving = true;
  }
  onMouseMove = e => {
    if(this.isMoving){
      let newSize = this.sizeInit - (2 * this.btn * (e.pageX - this.xInit));
      newSize = newSize > this.maxWidth ? this.maxWidth : newSize;
      newSize = newSize < 60 ? 60 : newSize;
      this.props.setCurrentCardSize(newSize);
    }
  }
  onMouseUp = () => {
    if(this.isMoving){
      this.isMoving = false;
    }
  }
  render() {
    const {currentCardSize} = this.props;

    return <div className="card-size-container" ref={this.container}>
      <div className="card-size-bar"
        style={{
          'width': currentCardSize + 'px'
        }}
      >
        <div className="card-size-bar-left"/>
        <div className="card-size-bar_num">{currentCardSize + 'px'}</div>
        <div className="card-size-bar-right"/>
        
        <div className="card-size-btn left"
          onMouseDown={e => {this.onMouseDown(e,1);}}
        >
          <div className="card-size-btn-indicator"/>
        </div>
        <div className="card-size-btn right"
          onMouseDown={e => {this.onMouseDown(e,-1);}}
        >
          <div className="card-size-btn-indicator"/>
        </div>
      </div>
    </div>
  }
};

/* REDUX ***************************/

const {  
  setCurrentCardSize
} = actions;

function mapStateToProps(state) {
  const {currentCardSize} = state.Cards;
  return {currentCardSize};
}
const mapDispatchToProps = dispatch => {
	return {
    setCurrentCardSize: (cardSize) => {
      dispatch(setCurrentCardSize(cardSize))
    }
	}
}

const CardSize = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardSizeVisual);

export default CardSize;