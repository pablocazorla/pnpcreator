import { combineReducers } from 'redux';
import UI from './ui/reducer';
import Cards from './cards/reducer';

export default combineReducers({
  UI,
  Cards
})