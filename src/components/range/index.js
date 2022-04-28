import React, { Component } from 'react';

export default class InputRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 100
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.value !== prevProps.value){
      this.setState({ value: this.props.value});
    }
  }
  onChange = e => {
    const value = parseInt(e.target.value);
    this.setState({value});

    if(this.props.onChange){
      this.props.onChange(value);
    }
  }
  render() {
    const {min,max,step,width} = this.props;
    const {value} = this.state;

    return <div className="input-range" style={{'width': (width || 100) + 'px'}}>
      <input
        type="range"
        min={min || 0}
        max={max || 100}
        step={step || 1}
        value={value}
        onChange={this.onChange}
      />
    </div>
  }
};