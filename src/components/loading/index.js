import React, { Component } from 'react';
import LoadingImg from 'assets/images/loading.png';
import LoadingImgWhite from 'assets/images/loading-white.png';
import {clases} from 'utils';

export default class Loading extends Component {
  render() {
    const {loading,white, inline} = this.props;

    return loading ? <div className={clases('loading',{'inline': inline})}>
      <div className="loading-rot">
        <img src={white ? LoadingImgWhite : LoadingImg} alt="Loading"/>
      </div>      
    </div> : null;
  }
};