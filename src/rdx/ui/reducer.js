import { combineReducers } from 'redux';
import { actName } from './actions';
import { storage } from 'utils';

let reducers = {};

const savedTab = storage.get('savedTab') || 0;

reducers.tab = (state = parseInt(savedTab), action) => {
  switch (action.type) {
    case actName.SET_TAB:
      storage.set('savedTab',action.tab); 
      return action.tab;
    default:
      return state;
  }
};

const reducersCombined = combineReducers(reducers);

export default reducersCombined;