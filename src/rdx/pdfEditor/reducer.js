import { combineReducers } from 'redux';
import { actName } from './actions';
import { storage } from 'utils';

let reducers = {};


const pageScale = storage.get('pdfEditor_pageScale') || 100;

reducers.pageRendered = (state = parseInt(pageRendered), action) => {
  switch (action.type) {
    case actName.SET_PAGE_RENDERED:
      storage.set('pdfEditor_pageRendered',action.pageRendered); 
      return action.pageRendered;
    default:
      return state;
  }
};

const pageRenderedAll = storage.get('pdfEditor_pageRenderedAll') || 0;

reducers.pageRenderedAll = (state = parseInt(pageRenderedAll), action) => {
  switch (action.type) {
    case actName.SET_PAGE_RENDERED_ALL:
      storage.set('pdfEditor_pageRenderedAll',action.pageRenderedAll); 
      return action.pageRenderedAll;
    default:
      return state;
  }
};

const pageRendered = storage.get('pdfEditor_pageRendered') || 1;

reducers.pageScale = (state = parseFloat(pageScale), action) => {
  switch (action.type) {
    case actName.SET_PAGE_SCALE:
      storage.set('pdfEditor_pageScale',action.pageScale); 
      return action.pageScale;
    default:
      return state;
  }
};


// EDITOR

const editorX = storage.get('pdfEditor_editorX') || 80;

reducers.editorX = (state = parseInt(editorX), action) => {
  switch (action.type) {
    case actName.SET_EDITOR_X:
      storage.set('pdfEditor_editorX',action.val); 
      return action.val;
    default:
      return state;
  }
};

const editorY = storage.get('pdfEditor_editorY') || 200;

reducers.editorY = (state = parseInt(editorY), action) => {
  switch (action.type) {
    case actName.SET_EDITOR_Y:
      storage.set('pdfEditor_editorY',action.val); 
      return action.val;
    default:
      return state;
  }
};

const editorW = storage.get('pdfEditor_editorW') || 360;

reducers.editorW = (state = parseInt(editorW), action) => {
  switch (action.type) {
    case actName.SET_EDITOR_W:
      storage.set('pdfEditor_editorW',action.val); 
      return action.val;
    default:
      return state;
  }
};

reducers.elementToEditor = (state = null, action) => {
  switch (action.type) {
    case actName.SET_ELEMENT_TO_EDITOR:
      return action.element;
    default:
      return state;
  }
};
reducers.elementFromEditor = (state = null, action) => {
  switch (action.type) {
    case actName.SET_ELEMENT_FROM_EDITOR:
      return action.element;
    default:
      return state;
  }
};

reducers.mode = (state = '', action) => {
  switch (action.type) {
    case actName.SET_MODE:
      return action.mode;
    default:
      return state;
  }
};

const pdfEditor_pool = storage.getJSON('pdfEditor_pool') || {};

reducers.pool = (state = pdfEditor_pool, action) => {
  switch (action.type) {
    case actName.SAVE_ELEMENT:
      const newState = Object.assign({},state);
      newState[action.element.id] = action.element;
      storage.setJSON('pdfEditor_pool',newState);
      return newState;
    case actName.UPDATE_ELEMENT:
      const {id} = action.elementData;
      
      const newStateUpdate = Object.assign({},state);
      newStateUpdate[id] = Object.assign({},newStateUpdate[id],action.elementData);
      storage.setJSON('pdfEditor_pool',newStateUpdate);
      
      return newStateUpdate;
    case actName.QUIT_DELETED_FROM_POOL:
      const newStateDelete = Object.assign({},state);      
      delete newStateDelete[action.id];
      storage.setJSON('pdfEditor_pool',newStateDelete);
      return newStateDelete;
    default:
      return state;
  }
};

reducers.selectedElement = (state = null, action) => {
  switch (action.type) {
    case actName.SELECT_ELEMENT:
      return action.element;
    default:
      return state;
  }
};
reducers.elementToDelete = (state = null, action) => {
  switch (action.type) {
    case actName.DELETE_ELEMENT:
      return action.element;
    default:
      return state;
  }
};
reducers.elementToDuplicate = (state = null, action) => {
  switch (action.type) {
    case actName.DUPLICATE_ELEMENT:
      return action.element;
    default:
      return state;
  }
};


const toMM = storage.get('pdfEditor_toMM') || 'false';

reducers.toMM = (state = (toMM === 'true'), action) => {
  switch (action.type) {
    case actName.SET_TO_MM:
      storage.set('pdfEditor_toMM',action.status);
      return action.status;
    default:
      return state;
  }
};

const lastStyleDefault = {text:{},rectangle:{},type:null};

reducers.lastStyle = (state = lastStyleDefault, action) => {
  switch (action.type) {
    case actName.UPDATE_ELEMENT:
      const {elementData} = action;

      if(elementData.type === 'image') {return state;}




      const newLastStyleDefault = Object.assign({},state);
      newLastStyleDefault[elementData.type] = Object.assign(newLastStyleDefault[elementData.type],elementData);
      newLastStyleDefault.type = elementData.type;

      return newLastStyleDefault;
    default:
      return state;
  }
};


const pdfEditor_favorites = storage.getJSON('pdfEditor_favorites') || {};

reducers.favorites = (state = pdfEditor_favorites, action) => {
  switch (action.type) {
    case actName.ADD_FAVORITE:
      const {id,typeElement,name,element} = action;
      const newFavorites = Object.assign({},state);
      newFavorites[id] = {id,typeElement,name,element};

      storage.setJSON('pdfEditor_favorites',newFavorites);

      return newFavorites;
    case actName.DELETE_FAVORITE:
      const newFavoritesDelete = Object.assign({},state);
      delete newFavoritesDelete[action.id];

      storage.setJSON('pdfEditor_favorites',newFavoritesDelete);

      return newFavoritesDelete;
    default:
      return state;
  }
};

reducers.imageFromEditor = (state = null, action) => {
  switch (action.type) {
    case actName.SET_IMAGE_FROM_EDITOR:
      return action.image;
    default:
      return state;
  }
};

reducers.pageWidth = (state = 0, action) => {
  switch (action.type) {
    case actName.SET_PAGE_WIDTH:
      return action.size;
    default:
      return state;
  }
};
reducers.pageHeight = (state = 0, action) => {
  switch (action.type) {
    case actName.SET_PAGE_HEIGHT:
      return action.size;
    default:
      return state;
  }
};

const reducersCombined = combineReducers(reducers);

export default reducersCombined;