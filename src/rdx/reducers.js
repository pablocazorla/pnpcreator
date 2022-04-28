import { combineReducers } from 'redux';
import UI from './ui/reducer';
import Cards from './cards/reducer';
import PDFEditor from './pdfEditor/reducer';

export default combineReducers({
  UI,
  Cards,
  PDFEditor
})