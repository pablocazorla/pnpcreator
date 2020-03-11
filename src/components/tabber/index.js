import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/ui/actions';
import {clases} from 'utils';
import Logo from 'components/logo';
// import User from './user';

class TabberVisual extends Component {

  render() {

    const {sections,tab,setTab} = this.props;

    return <>
      <div className="header">
        <div className="container">
          <div className="header-container">
            <div className="header-container-col">
              <div className="header-logo">
                <Logo/>              
              </div>
            </div>
            <div className="header-container-col big">
              <div className="tab-header">
                {sections.map((t,k) => {
                  return <div className={clases("tab-h",{'current':tab === k})} key={k}
                    onClick={() => {
                      setTab(k);
                    }}
                  >
                    {t.title}
                  </div>;
                })}
              </div>
            </div>
            {/* <div className="header-container-col user">
              <div className="header-user">
                <User/>
              </div>              
            </div> */}
          </div>
        </div>
      </div>
      <div className="tab-body">
        {sections[tab].content}
      </div>
    </>;
  }
};

/* REDUX ***************************/

const {  
  setTab
} = actions;

function mapStateToProps(state) {
  const {tab} = state.UI;
  return {tab};
}
const mapDispatchToProps = dispatch => {
	return {
    setTab: (tab) => {
      dispatch(setTab(tab))
    }
	}
}

const Tabber = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabberVisual);

export default Tabber;