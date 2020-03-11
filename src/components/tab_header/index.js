import React, { Component } from 'react';
import __ from 'I18N';

export default class TabHeader extends Component {
  render() {
    const {
      sections,
      value,
      onChange,
      className,
      style
    } = this.props;

    return sections ? <div className={'tab_header_comp' + (className ? ' ' + className : '')} style={style}>
      {sections.map((s,k) => {
        return <div
            key={k}
            className={'tab_header_comp_tab' + (value === k ? ' current' : '')}
            onClick={() => { if(onChange) onChange(k); }}
          >
            {__(s.text)}
          </div>;
      })}
    </div> : null;
  }
};