import React from 'react';
import './App.css';
import { LinkHandler } from "./core/LinkHandler";
import { AppleMusicLinkHandler } from './appleMusic/AppleMusicLinkHandler';
import { SpotifyLinkHandler } from './spotify/SpotifyLinkHandler';

class App extends React.Component {
  spotifyLinkHandler;

  constructor(props) {
    super(props);
    this.state = { link: "https://open.spotify.com/track/77NNZQSqzLNqh2A9JhLRkg", informations: {}};
    this.handleShare = this.handleShare.bind(this);
    this.handleShares = this.handleShares.bind(this);
  }

  handleShare() {
    var linkHandler = new LinkHandler();
    linkHandler.getLinks(this.state.link).then((value) => {
      alert(value)
    }).catch(() => {
      alert("Oh nein!")
    });
  }

  render() {
    return (
      <div>
        <h1>SongBridge</h1>
        <input type="url" onChange={(e) => this.setState({link: e.target.value})} placeholder="Link"></input>
        <button onClick={this.handleShare}>Teilen</button>

      </div>
    );
  }
}

export default App;



// WEBPACK FOOTER //
// src/App.js