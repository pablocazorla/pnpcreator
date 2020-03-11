import React, { Component } from 'react';
import {clases} from 'utils'

export default class Dropdown extends Component {
  constructor(props) {
   super(props);
   this.state = {
     visible: false
   }
   this.clickOver = false;
  }
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
  componentDidMount(){
    if(window){
      window.addEventListener('click',this.clickOut);
    }
  }
  componentWillUnmount(){
    if(window){
      window.removeEventListener('click',this.clickOut);
    }
  }
  clickOut = () => {
    if(this.state.visible && !this.clickOver){
      this.setState({visible:false});      
    }
    this.clickOver = false;
  }
  render() {
    const {children, content, right} = this.props;
    const {visible} = this.state;

    return <div className={clases('dropdown',{'visible':visible})}>
      <div className="dropdown_trigger"
        onClick={() => {this.setState({visible:!visible});this.clickOver = true;}}
      >
        {children}
      </div>
      <div className={clases('dropdown_content',{'right':right})}>
        {content}
      </div>
    </div>
  }
};