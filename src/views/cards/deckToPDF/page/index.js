import React, { Component } from 'react';
import data from 'data/cards';
import DeckCreator from '../../utils/deck';
import __ from 'I18N';
import U from 'utils';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.Deck = null;
    this.state = {
      href:''
    }
  }
  //static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.someValue!==prevState.someValue){
  //     return { someState: nextProps.someValue};
  //  }
  //  else return null;
  //}
  componentDidUpdate(prevProps) {
    const {pageData,collection} = this.props;
    if(pageData !== prevProps.pageData || collection !== prevProps.collection){
      this.renderCards(pageData,collection);
    }
  }
  componentDidMount(){
    const {pageData,collection} = this.props;
    const {renderCards} = this;

    if(this.canvas && this.canvas.current){
      this.Deck = DeckCreator(data);

      this.Deck.ready(() => {
        renderCards(pageData,collection);
      });
    }
  }
  renderCards = (pageData,collection) => {

    const {cols,x,y} = pageData;
    const {numPage,afterRender} = this.props;

    const {width,height} = data;

    let col = 0, row = 0;

    this.Deck.white(this.canvas.current);
    
    let d = collection[0];
    while(d <= collection[1]){

      this.Deck.renderCard({
        index: d,
        canvas:this.canvas.current,
        x: x + (col * width),
        y: y + (row * height)
      },true);

      col++;

      if(col >= cols){
        col = 0;
        row++;
      }

      d++;
    }

    const self = this;
    const dataURL = this.canvas.current.toDataURL();
    U.dataURIToBlob(dataURL, function(blob){
      const href = URL.createObjectURL(blob);
      self.setState({href});
      if(afterRender){
        afterRender(numPage,dataURL);
      }
    });
  }
  render() {

    const {width,height} = this.props.pageData.size;
    const {numPage} = this.props;
    const {href} = this.state;

    return <div className="deck-to-pdf-page">
      <div className="deck-to-pdf-page_header">
        <div className="row separated">
          <div className="col">{__('Page') + ' ' + numPage}</div>
          <div className="col">
            {href !== '' ? <a className="btn" href={href} download={'page-'+numPage+'.png'}>{__('Download as .png')}</a>:null}
          </div>
        </div>
      </div>
      <canvas className="canvas-white" width={width} height={height} ref={this.canvas}></canvas>
    </div>
  }
};