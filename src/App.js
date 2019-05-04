import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

let fakeServerData = {
  user: {
    name: 'Noom',
    playlists: [
      {
        name: 'My favorite',
        songs: [
          { name: 'Beat It', duration: 1345 },
          { name: 'Cannelloni Makaroni', duration: 1236 },
          { name: 'Rosa helikopter', duration: 70000 }
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          { name: 'Beat It', duration: 1345 },
          { name: 'Cannelloni Makaroni', duration: 1236 },
          { name: 'Rosa helikopter', duration: 70000 }
        ]
      },
      {
        name: 'Another playlist - the best!',
        songs: [
          { name: 'Beat It', duration: 1345 },
          { name: 'Hallenlujah', duration: 1236 },
          { name: 'Rosa helikopter', duration: 70000 }
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          { name: 'Beat It', duration: 1345 },
          { name: 'Cannelloni Makaroni', duration: 1236 },
          { name: 'Heh Heh Minika', duration: 70000 }
        ]
      }
    ]
  }
};

//Component #1 collect amount playlist
class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: 'inline-block' }}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}


//Component #2 collect hours playlist
class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])//reduced something to a single value /this case we want to reduce the playlist to a list of songs
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{ ...defaultStyle, width: "40%", display: 'inline-block' }}>
        <h2>{Math.round(totalDuration / 120)} hours</h2>{/* divided by 60 = minutes or 120 = hours */}
      </div>
    );
  }
}

//Component #3 filter playlist
class Filter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle }}>
        <img alt="filter" />
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)} /> {/*keyboard event */}
      </div>
    );
  }
}

//Component #4 show playlist
class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{ ...defaultStyle, display: 'inline-block', width: "25%" }}>
        <img alt="playlist" />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

//Show all component
class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData });
    }, 1000); //1 second

  }
  render() {
    //if search playlist data will change.
    let playlistToRender = this.state.serverData.user ?
      this.state.serverData.user.playlists
        .filter(playlist =>
          playlist.name.toLocaleLowerCase().includes(
            this.state.filterString.toLocaleLowerCase())
        ) : []
    return (
      <div className="App" >

        {/**if there is user it will show h1 tag */}
        {/* ternary operator */}
        {this.state.serverData.user ?
          <div>
            <h1 style={{ ...defaultStyle, 'font-size': '54px' }} >
              {this.state.serverData.user.name}'s Playlists
        </h1>

            {/* <h1 style={{...defaultStyle, 'font-size' : '54px'}} >
        {this.state.serverData.user &&
          this.state.serverData.user.name}'s Playlists
        </h1> */}
            <PlaylistCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />

            <Filter onTextChange={text => {
              this.setState({ filterString: text })
            }} /> {/* parsing onTextChange function on filter */}
            {playlistToRender.map(playlist =>
              <Playlist playlist={playlist} />
            ) // map is transforming array to another array.
            }

          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }

}


export default App;


// {/**if there is user it will show h1 tag */}
// {this.state.serverData.user &&
//   <div>
//   <h1 style={{...defaultStyle, 'font-size' : '54px'}} >
//   {this.state.serverData.user.name}'s Playlists
//   </h1>

//   {/* <h1 style={{...defaultStyle, 'font-size' : '54px'}} >
//   {this.state.serverData.user &&
//     this.state.serverData.user.name}'s Playlists
//   </h1> */}
//   <Aggregate playlists={this.state.serverData.user.name}/>
//   <Aggregate />

//   <Filter />
//   <Playlist />
//   <Playlist />
//   <Playlist />
//   <Playlist />
//   </div>
// }
// </div>
