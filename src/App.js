import React, { Component } from 'react';
import './App.scss';

import { Record } from './pages/record';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Record/>
      </div>
    );
  }
}

export default App;
