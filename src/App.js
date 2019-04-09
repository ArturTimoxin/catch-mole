import React, { Component } from 'react';
import './style/style.scss';

import GamePage from './pages/GamePage/GamePage'
class App extends Component {
  render() {
    return (
      <div className="App">
        <GamePage />
      </div>
    );
  }
}

export default App;
