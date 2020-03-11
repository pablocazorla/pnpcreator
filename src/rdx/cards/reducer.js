import { combineReducers } from 'redux';
import { actName } from './actions';
import { storage } from 'utils';

let reducers = {};

const savedTab = storage.get('savedTab_Cards') || 0;

const currentCardIndex = storage.get('currentCardIndex') || 0;

const currentCardSize = storage.get('currentCardSize') || 600;

const currentPageSize = storage.get('currentPageSize') || 'A4';

const currentPageRotated = storage.get('currentPageRotated') || '0';
const currentPageMargin = storage.get('currentPageMargin') || 10;


reducers.tab = (state = parseInt(savedTab), action) => {
  switch (action.type) {
    case actName.SET_TAB:
      storage.set('savedTab_Cards',action.tab); 
      return action.tab;
    default:
      return state;
  }
};

reducers.currentCardIndex = (state = parseInt(currentCardIndex), action) => {
  switch (action.type) {
    case actName.SET_CURRENT_CARD:
      storage.set('currentCardIndex',action.cardIndex); 
      return action.cardIndex;
    default:
      return state;
  }
};

reducers.currentCardSize = (state = parseInt(currentCardSize), action) => {
  switch (action.type) {
    case actName.SET_CURRENT_CARD_SIZE:
      storage.set('currentCardSize',action.cardSize); 
      return action.cardSize;
    default:
      return state;
  }
};

reducers.currentPageSize = (state = currentPageSize, action) => {
  switch (action.type) {
    case actName.SET_CURRENT_PAGE_SIZE:
      storage.set('currentPageSize',action.pageSize); 
      return action.pageSize;
    default:
      return state;
  }
};
reducers.currentPageRotated = (state = currentPageRotated, action) => {
  switch (action.type) {
    case actName.SET_CURRENT_PAGE_ROTATED:
      storage.set('currentPageRotated',action.pageRotated); 
      return action.pageRotated;
    default:
      return state;
  }
};
reducers.currentPageMargin = (state = parseInt(currentPageMargin), action) => {
  switch (action.type) {
    case actName.SET_CURRENT_PAGE_MARGIN:
      storage.set('currentPageMargin',action.pageMargin); 
      return action.pageMargin;
    default:
      return state;
  }
};

const reducersCombined = combineReducers(reducers);

export default reducersCombined;