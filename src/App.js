import React from 'react';
import './App.css';
import AppleMusicLinkHandler from './appleMusic/AppleMusicLinkHandler';
import SpotifyLinkHandler from './spotify/SpotifyLinkHandler';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { link: "https://open.spotify.com/track/77NNZQSqzLNqh2A9JhLRkg", informations: {}};
    this.handleShare = this.handleShare.bind(this);
    this.handleShares = this.handleShares.bind(this);
  }

  handleShare() {
    let appleMusicLinkHandler = new AppleMusicLinkHandler();
    appleMusicLinkHandler.getInformations(this.state.link).then((musicInformations) => {
      this.setState({informations: musicInformations});
    }).catch((reason) => {
      alert(JSON.stringify(reason));
    });
  }

  handleShares() {
    let spotifyLinkHandler = new SpotifyLinkHandler();
    console.log(spotifyLinkHandler.getInformations(this.state.link));
  }

  render() {
    return (
      <div>
        <h1>SongBridge</h1>
        <input type="url" onChange={(e) => this.setState({link: e.target.value})} placeholder="Apple Music"></input>
        <button onClick={this.handleShare}>Teilen</button>
        <br/>
        <input type="url" onChange={(e) => this.setState({ link: e.target.value })} placeholder="Spotify"></input>
        <button onClick={this.handleShares}>Teilen</button>
        <br/>
        {this.state.informations != null &&
          <div>
            <h1>{this.state.informations.artist}</h1>
            <h1>{this.state.informations.album}</h1>
            <h1>{this.state.informations.song}</h1>
          </div>
        }
      </div>
    );
  }
}

export default App;



// WEBPACK FOOTER //
// src/App.js