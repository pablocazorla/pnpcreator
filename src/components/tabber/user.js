import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'rdx/user/actions';
import Dropdown from 'components/dropdown';
import __ from 'I18N';

class HeaderUserVisual extends Component {
  //constructor(props) {
  //  super(props);
  //}
  //static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.someValue!==prevState.someValue){
  //     return { someState: nextProps.someValue};
  //  }
  //  else return null;
  //}
  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.status === 'in' && prevProps.status !== 'in'){
  //     //Perform some operation here
  //     this.setState({ status: 'in'});
  //     this.setIn('in');
  //   }
  //   if(this.props.status === 'out' && prevProps.status !== 'out'){
  //     //Perform some operation here
  //     this.setState({ status: 'out'});
  //     this.setIn('out');
  //   }
  // }
  //componentDidMount(){
  //}
  render() {
    const {username,avatar,clearUser} = this.props;
    return <div className="header-user">
      <Dropdown
        right
        content={<div
          onClick={clearUser}
          className="dropdown_item">
            {__('Salir')}
          </div>}
      >        
        <div className="header-user_content">
          <div className="header-user_content_col">
            <div className="header-user_avatar">
              <img src={avatar} alt={username}/>
            </div>
          </div>
          <div className="header-user_content_col">
            {username}
          </div>
        </div>
      </Dropdown>
      
    </div>;
  }
};

/* REDUX ***************************/

const {  
  clearUser
} = actions;

function mapStateToProps(state) {
  const {username,avatar} = state.User;
  return {username,avatar};
}
const mapDispatchToProps = dispatch => {
	return {
    clearUser: () => {
      dispatch(clearUser())
    }
	}
}

const HeaderUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderUserVisual);

export default HeaderUser;