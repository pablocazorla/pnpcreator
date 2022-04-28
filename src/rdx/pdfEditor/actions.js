export const actName = {

  SET_PAGE_RENDERED: 'PDF_EDITOR_SET_PAGE_RENDERED',
  SET_PAGE_RENDERED_ALL: 'PDF_EDITOR_SET_PAGE_RENDERED_ALL',
  SET_PAGE_SCALE: 'PDF_EDITOR_SET_PAGE_SCALE',


  SET_EDITOR_X: 'PDF_EDITOR_SET_EDITOR_X',
  SET_EDITOR_Y: 'PDF_EDITOR_SET_EDITOR_Y',
  SET_EDITOR_W: 'PDF_EDITOR_SET_EDITOR_W',

  SET_ELEMENT_TO_EDITOR: 'PDF_EDITOR_SET_ELEMENT_TO_EDITOR',
  SET_ELEMENT_FROM_EDITOR: 'PDF_EDITOR_SET_ELEMENT_FROM_EDITOR',

  SET_MODE: 'PDF_EDITOR_SET_MODE',

  SAVE_ELEMENT: 'PDF_EDITOR_SAVE_ELEMENT',
  UPDATE_ELEMENT: 'PDF_EDITOR_UPDATE_ELEMENT',
  SELECT_ELEMENT: 'PDF_EDITOR_SELECT_ELEMENT',

  DELETE_ELEMENT: 'PDF_EDITOR_DELETE_ELEMENT',
  QUIT_DELETED_FROM_POOL: 'PDF_EDITOR_QUIT_DELETED_FROM_POOL',

  DUPLICATE_ELEMENT: 'PDF_EDITOR_DUPLICATE_ELEMENT',

  SET_TO_MM: 'PDF_EDITOR_SET_TO_MM',

  ADD_FAVORITE: 'PDF_EDITOR_ADD_FAVORITE',
  DELETE_FAVORITE: 'PDF_EDITOR_DELETE_FAVORITE',

  SET_IMAGE_FROM_EDITOR: 'PDF_EDITOR_SET_IMAGE_FROM_EDITOR',

  SET_PAGE_WIDTH: 'PDF_EDITOR_SET_PAGE_WIDTH',

  SET_PAGE_HEIGHT: 'PDF_EDITOR_SET_PAGE_HEIGHT'
 
  
};

export default {

  setPageRendered: (pageRendered) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_PAGE_RENDERED,
        pageRendered
      });
		}
  },
  setPageRenderedAll: (pageRenderedAll) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_PAGE_RENDERED_ALL,
        pageRenderedAll
      });
		}
  },
  setPageScale: (pageScale) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_PAGE_SCALE,
        pageScale
      });
		}
  },

  setEditorX: (val) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_EDITOR_X,
        val
      });
		}
  },
  setEditorY: (val) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_EDITOR_Y,
        val
      });
		}
  },
  setEditorW: (val) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_EDITOR_W,
        val
      });
		}
  },
  setElementToEditor: (element) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_ELEMENT_TO_EDITOR,
        element
      });
		}
  },
  setElementFromEditor: (element) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_ELEMENT_FROM_EDITOR,
        element
      });
		}
  },
  setMode: (mode) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_MODE,
        mode
      });
		}
  },
  saveElement: (element) => {
		return (dispatch) => {
			dispatch({
        type: actName.SAVE_ELEMENT,
        element
      });
		}
  },
  updateElement: (elementData) => {
		return (dispatch) => {
			dispatch({
        type: actName.UPDATE_ELEMENT,
        elementData
      });
		}
  },
  selectElement: (element) => {
		return (dispatch) => {
			dispatch({
        type: actName.SELECT_ELEMENT,
        element
      });
		}
  },
  deleteElement: (element) => {
		return (dispatch) => {
			dispatch({
        type: actName.DELETE_ELEMENT,
        element
      });
		}
  },
  quitDeletedFromPool: (id) => {
		return (dispatch) => {
			dispatch({
        type: actName.QUIT_DELETED_FROM_POOL,
        id
      });
		}
  },
  duplicateElement: (element) => {
		return (dispatch) => {
			dispatch({
        type: actName.DUPLICATE_ELEMENT,
        element
      });
		}
  },
  setToMM: (status) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_TO_MM,
        status
      });
		}
  },
  addFavorite: (id,typeElement,name,element) => {
		return (dispatch) => {
			dispatch({
        type: actName.ADD_FAVORITE,
        id,typeElement,name,element
      });
		}
  },
  deleteFavorite: (id) => {
		return (dispatch) => {
			dispatch({
        type: actName.DELETE_FAVORITE,
        id
      });
		}
  },
  setImageFromEditor: (image) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_IMAGE_FROM_EDITOR,
        image
      });
		}
  },
  setPageWidth: (size) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_PAGE_WIDTH,
        size
      });
		}
  },
  setPageHeight: (size) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_PAGE_HEIGHT,
        size
      });
		}
  },
};
