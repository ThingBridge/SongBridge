import React from 'react';
import './App.css';
import AppleMusicLinkHandler from './appleMusic/AppleMusicLinkHandler';

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

  render() {
    return (
      <div>
        <h1>SongBridge</h1>
        <input type="url" onChange={(e) => this.setState({link: e.target.value})}></input>
        <button onClick={this.handleShare}>Teilen</button>
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