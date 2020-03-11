import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/cards/actions';
import data from 'data/cards.js';
import DeckCreator from '../utils/deck';
import CardSize from './cardSize';
import __ from 'I18N';

class CardEditorVisual extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.cardDeck = null;
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
    const {renderCard} = this;
    const {currentCardIndex} = this.props;
    if(this.canvas && this.canvas.current){
      this.cardDeck = DeckCreator(data);

      this.cardDeck.ready(() => {
        renderCard(currentCardIndex);
      });
    }
  }
  renderCard = (indexCard) => {
    this.cardDeck.clear(this.canvas.current).renderCard({
      index: indexCard,
      canvas:this.canvas.current
    });
  }
  changeCardIndex = dir => {
    const {setCurrentCard,currentCardIndex} = this.props;

    let newCurrentCardIndex = currentCardIndex + dir;
    newCurrentCardIndex = newCurrentCardIndex >= data.cards.length ? 0 : newCurrentCardIndex;
    newCurrentCardIndex = newCurrentCardIndex < 0 ? data.cards.length - 1 : newCurrentCardIndex;
    setCurrentCard(newCurrentCardIndex);
    this.renderCard(newCurrentCardIndex);
  }
  render() {
    const {currentCardSize,currentCardIndex} = this.props;

    return <div className="card">
      <div className="container">
        <CardSize/>
        <div className="card-container" style={{'width':currentCardSize+'px'}}>
          <canvas className="canvas-white" width={data.width} height={data.height} ref={this.canvas}></canvas>
          <div className="card-container-arrow left" onClick={() => {this.changeCardIndex(-1);}}>
            <i className="fa fa-chevron-left"></i>
          </div>
          <div className="card-container-arrow right" onClick={() => {this.changeCardIndex(1);}}>
            <i className="fa fa-chevron-right"></i>
          </div>
          <div className="card-container-label">
            {__('Card') + ' ' + currentCardIndex + ' ' + __('/') + ' ' + data.cards.length}
          </div>
        </div>
      </div>
    </div>;
  }
};

/* REDUX ***************************/

const {  
  setCurrentCard
} = actions;

function mapStateToProps(state) {
  const {currentCardSize,currentCardIndex} = state.Cards;
  return {currentCardSize,currentCardIndex};
}
const mapDispatchToProps = dispatch => {
	return {
    setCurrentCard: (cardIndex) => {
      dispatch(setCurrentCard(cardIndex))
    }
	}
}

const CardEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardEditorVisual);

export default CardEditor;