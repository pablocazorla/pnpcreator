import React, { Component } from 'react';
import { connect } from 'react-redux';
//import actions from '../../redux/item/actions';
import data from 'data/cards';
import U,{clases} from 'utils';
import pageSizes from '../utils/pageSizes';
import Header from './header';
import Page from './page';

const generatePageData = (pageSize,marginMM) => {
  const margin = U.mmToPx(marginMM);

  const {width,height,cards} = data;

  const page_width = pageSize.width - (2 * margin);
  const page_height = pageSize.height - (2 * margin);

  const cols = Math.floor(page_width/width);
  const rows = Math.floor(page_height/height);

  const num = cols * rows;

  

  let pageData = {
    info: {
      size: pageSize,
      cols,
      cardsPerPage: num,
      x: Math.round(0.5 * (pageSize.width - (width * cols))),
      y: Math.round(0.5 * (pageSize.height - (height * rows)))
    },    
    list: []
  };
  
  

  let currentPage = -1;
  let numCardInPage = -1;


  for(var i = 0; i <= cards.length;i++){

    numCardInPage++;

    if(numCardInPage === 0){
      currentPage++;
      pageData.list.push([i,-1]);
    }
    if(numCardInPage === (num - 1)){
      numCardInPage = -1;
      pageData.list[currentPage][1] = i;
    }
  }
  if(pageData.list[currentPage][1] === -1){
    pageData.list[currentPage][1] = cards.length -1;
  }

  return pageData;
};


class DeckToPDFVisual extends Component {
  constructor(props) {
    super(props);
    const {currentPageSize,currentPageRotated,currentPageMargin} = this.props;

    const pageSize = pageSizes[currentPageSize+'_'+currentPageRotated];

    this.state = {
      pageData: generatePageData(pageSize,currentPageMargin),
      imagesRendered: {}
    }
  }
  //static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.someValue!==prevState.someValue){
  //     return { someState: nextProps.someValue};
  //  }
  //  else return null;
  //}
  componentDidUpdate(prevProps) {
    const {currentPageSize,currentPageRotated,currentPageMargin} = this.props;
    if(currentPageSize !== prevProps.currentPageSize || currentPageRotated !== prevProps.currentPageRotated || currentPageMargin !== prevProps.currentPageMargin){
      const pageSize = pageSizes[currentPageSize+'_'+currentPageRotated];      
      
      this.setState({
        pageData: generatePageData(pageSize,currentPageMargin)
      });
    }
  }
  
  //componentDidMount(){
  //}
  afterRender = (numPage,src) => {
    const {imagesRendered} = this.state;
    imagesRendered[numPage] = src;
    this.setState({imagesRendered});
  }
  render() {

    const {currentPageRotated} = this.props;
    const {pageData,imagesRendered} = this.state;

    return <div className="deck-to-pdf">
      <Header
        cardsPerPage={pageData.info.cardsPerPage}
        numPages={pageData.list.length}
        numCards={data.cards.length}
        imagesRendered={imagesRendered}
      />
      <div className={clases('deck-to-pdf-page-list',{'land':currentPageRotated === '1'})}>
        {pageData.list.map((p,k) => {
          return <Page key={k}
            numPage={k + 1}
            pageData={pageData.info}
            collection={p}
            afterRender={this.afterRender}
          />
        })}
        
      </div>
    </div>;
  }
};

/* REDUX ***************************/
// const {  
//   setCurrentPageSize,
//   setCurrentPageRotated,
//   setCurrentPageMargin
// } = actions;

function mapStateToProps(state) {
  const {currentPageSize,currentPageRotated,currentPageMargin} = state.Cards;
  return {currentPageSize,currentPageRotated,currentPageMargin};
}
// const mapDispatchToProps = dispatch => {
// 	return {
//     setCurrentPageSize: (pageSize) => {
//       dispatch(setCurrentPageSize(pageSize))
//     },
//     setCurrentPageRotated: (pageRotated) => {
//       dispatch(setCurrentPageRotated(pageRotated))
//     },
//     setCurrentPageMargin: (pageSize) => {
//       dispatch(setCurrentPageMargin(pageSize))
//     }
// 	}
// }
const DeckToPDF = connect(
  mapStateToProps,null
  //mapDispatchToProps
)(DeckToPDFVisual);

export default DeckToPDF;