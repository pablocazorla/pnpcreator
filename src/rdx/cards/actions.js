export const actName = {

  SET_TAB: 'SET_TAB_CARDS',
  SET_CURRENT_CARD: 'SET_CURRENT_CARD',
  SET_CURRENT_CARD_SIZE: 'SET_CURRENT_CARD_SIZE',
  SET_CURRENT_PAGE_SIZE: 'SET_CURRENT_PAGE_SIZE',
  SET_CURRENT_PAGE_ROTATED: 'SET_CURRENT_PAGE_ROTATED',
  SET_CURRENT_PAGE_MARGIN: 'SET_CURRENT_PAGE_MARGIN'
  
}

export default {

  setTab: (tab) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_TAB,
        tab
      });
		}
  },
  setCurrentCard: (cardIndex) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_CURRENT_CARD,
        cardIndex
      });
		}
  },
  setCurrentCardSize: (cardSize) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_CURRENT_CARD_SIZE,
        cardSize
      });
		}
  },
  setCurrentPageSize: (pageSize) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_CURRENT_PAGE_SIZE,
        pageSize
      });
		}
  },
  setCurrentPageRotated: (pageRotated) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_CURRENT_PAGE_ROTATED,
        pageRotated
      });
		}
  },
  setCurrentPageMargin: (pageMargin) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_CURRENT_PAGE_MARGIN,
        pageMargin
      });
		}
  }
};
