import React from 'react';
import './App.css';
import AppleMusicLinkHandler from './appleMusic/AppleMusicLinkHandler';
import { MusicInformation } from './core/MusicInformation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {link: "", informations: {}};
    this.handleShare = this.handleShare.bind(this);
  }

  handleShare() {
    let appleMusicLinkHandler = new AppleMusicLinkHandler();
    appleMusicLinkHandler.getInformations(this.state.link).then((musicInformations) => {
      this.setState({informations: musicInformations});
    }).catch((reason) => {
      alert(JSON.stringify(reason));
    });
  }

  test() {
    let appleMusicLinkHandler = new AppleMusicLinkHandler();
    let testInformation = new MusicInformation();
    testInformation.mediaType = "song";
    testInformation.artist = "Lionel Richie";
    testInformation.album = "The Definitive Collection";
    testInformation.song = "All Night Long (All Night)";

    appleMusicLinkHandler.getLink(testInformation).then((link) => {
      console.log(link);
    }).catch((reason) => {
      console.log(reason);
    });
  }

  render() {
    return (
      <div>
        <h1>SongBridge</h1>
        <input type="url" onChange={(e) => this.setState({link: e.target.value})}></input>
        <button onClick={this.handleShare}>Teilen</button>
        <button onClick={this.test}></button>
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