import React from 'react';
import './App.css';
import { LinkHandler } from "./core/LinkHandler";

class App extends React.Component {
  spotifyLinkHandler;

  constructor(props) {
    super(props);
    this.state = { link: "https://open.spotify.com/track/77NNZQSqzLNqh2A9JhLRkg", links: []};
    this.handleShare = this.handleShare.bind(this);
  }

  handleShare() {
    var linkHandler = new LinkHandler();
    linkHandler.getLinks(this.state.link).then((value) => {
      this.setState({links: value.links});
    }).catch((reason) => {
      console.error(reason)
      alert("Oh nein!")
    });
  }

  render() {
    return (
      <div>
        <h1>SongBridge</h1>
        <input type="url" onChange={(e) => this.setState({link: e.target.value})} placeholder="Link"></input>
        <button onClick={this.handleShare}>Teilen</button>
        <ul>
            {
                this.state.links.map(function(link) {
                    return <li><a href={link.link}>{link.name}</a></li>
                })
            }
            </ul>
      </div>
    );
  }
}

export default App;



// WEBPACK FOOTER //
// src/App.js