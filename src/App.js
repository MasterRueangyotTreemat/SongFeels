import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};
//Component #1 collection playlist
class Aggregate extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: 'inline-block' }}>
        <h2>Number Text</h2>
      </div>
    );
  }
}

//Component #2 filter playlist
class Filter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle }}>
        <img alt="filter" />
        <input type="text" />
      </div>
    );
  }
}

//Component #3 show playlist
class Playlist extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: "25%" }}>
        <img alt="playlist" />
        <h3>Playlist Name</h3>
        <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
      </div>
    );
  }
}

//Show all component
class App extends Component {
  render() {
    return (
      <div className="App" >
        <h1 style={{...defaultStyle, 'font-size' : '54px'}} >Title</h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
    </div>
    );
  }

}


export default App;
