export const actName = {

  SET_TAB: 'SET_TAB',
  
}

export default {

  setTab: (tab) => {
		return (dispatch) => {
			dispatch({
        type: actName.SET_TAB,
        tab
      });
		}
  }
};
