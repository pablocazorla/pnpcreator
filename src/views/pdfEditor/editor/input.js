import React, { Component } from 'react';
import U from 'utils';

export default class InputEditor extends Component {
  constructor(props) {
   super(props);
   this.state = {
     value:''
   }
   this.datalistId = 'datalist_' + U.getUniqueId();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.value !== prevProps.value){
      //Perform some operation here
      this.setState({ value: this.props.value});
    }
  }
  componentDidMount(){
    this.setState({ value: this.props.value === undefined ? '' : this.props.value});
  }
  render() {

    const {label,type,sufix,onChange,min,max,step,options} = this.props;
    const {value} = this.state;

    const typ = type || 'number';

    let inputNode = null;

    switch(typ){
      case 'select':
        inputNode = <select value={value}
          onChange={e => {
            const {value} = e.target;
            this.setState({value});
            
            onChange(value);
          }}
        >
          {options.map((o,k) => {
            return <option key={k} value={o.value}>{o.text}</option>;
          })}
        </select>;
        break;
   
      case 'textarea':
        inputNode = <textarea
          value={value}
          onChange={e => {
            const {value} = e.target;
            this.setState({value});
          }}
          onBlur={e => {
            if(onChange){           
              onChange(e.target.value);
            }
          }}
        />;
        break;
      default:
        inputNode = <><input
        type={typ}
        value={value}
        checked={typ === 'checkbox' ? value : null}
        min={min}
        max={max}
        step={step}
        list={options ? this.datalistId : null}
        onChange={e => {
          
          this.setState({value: typ === 'checkbox' ? e.target.checked : e.target.value});
          

          if(typ === 'color' || typ === 'checkbox'){
            e.target.blur();
          }
          // if(onChange){
          //   const val = typ === 'number' ? parseInt(e.target.value) : e.target.value;
          //   onChange(val);
          // }
        }}
        onBlur={e => {
          if(onChange){
            let val = e.target.value;
            switch(typ){
              case 'number':
                val = parseFloat(e.target.value);
                break;
              case 'checkbox':
                val = e.target.checked;
                break;
              default:
                //                  
            }
            onChange(val);
          }
        }}
        onKeyUp={e => {
         // console.log(e.keyCode);
          if(onChange && e.keyCode === 13){
           // const val = typ === 'number' ? parseInt(e.target.value) : e.target.value;
            e.target.blur();
          //  onChange(val);
          }
        }}
      />
      {options ? <datalist id={this.datalistId}>
          {options.map((o,k) => {
            return <option key={k} value={o}/>;
          })}
        </datalist> : null}
      </>
    }

    return <div className={"pdfeditorpanel-editor__form" + (typ === 'textarea' ? " for-textarea" : "")}>
      <div className="pdfeditorpanel-editor__form-label">
       {label} :
      </div>
      <div className={"pdfeditorpanel-editor__form-input" + (typ === 'select' ? " for-select" : "")}>
        {inputNode}
      </div>
      {sufix ? <div className="pdfeditorpanel-editor__form-sufix">
        {sufix}
      </div> : null}
      {typ === 'color' ? <div className="pdfeditorpanel-editor__form-sufix">
        {(value || '').toUpperCase()}
      </div> : null}
    </div>;
  }
};