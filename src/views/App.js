import React, { Component } from 'react';
import Tabber from 'components/tabber';
import Footer from 'components/footer';
import routes from 'router';

export default class App extends Component {  
  render() {
    return <div className="main">
      <Tabber
        sections={routes}
      />
      <Footer/>
    </div>;
  }
};