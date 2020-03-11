import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/cards/actions';
import TabHeader from 'components/tab_header';

import CardEditor from './cardEditor';
import DeckToPDF from './deckToPDF';

class CardsVisual extends Component {
  //constructor(props) {
  //  super(props);
  //}
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
  //componentDidMount(){
  //}
  render() {
    const {tab,setTab} = this.props;


    let content = null;

    switch(tab){
      case 0:
        content = <CardEditor/>;
        break;
      case 1:
        content = <DeckToPDF/>;
        break;
      default:
        content = null;
    }

    return <>
      <div className="container">
        <TabHeader
          sections={[
            {
              text: 'Card Editor',
              value: 0
            },
            {
              text: 'Deck to PDF',
              value: 1
            }
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>
      {content}
    </>;
  }
};

/* REDUX ***************************/

const {  
  setTab
} = actions;

function mapStateToProps(state) {
  const {tab} = state.Cards;
  return {tab};
}
const mapDispatchToProps = dispatch => {
	return {
    setTab: (tab) => {
      dispatch(setTab(tab))
    }
	}
}

const Cards = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsVisual);

export default Cards;