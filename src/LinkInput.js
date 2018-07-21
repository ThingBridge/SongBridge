import React from 'react';
import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';
import { LinkHandler } from './core/LinkHandler';
import { Redirect } from "react-router-dom";

export class LinkInput extends React.Component {
  constructor() {
    super()

    this.state = {
        informations: undefined
    }

    this.share = this.share.bind(this);
  }

  share() {
    var linkHandler = new LinkHandler();
    var informations = linkHandler.getInformations(this.state.link);
    
    this.setState({informations: informations});

  }

  render() {
    if (this.state.informations) {
        var link = `/share?source=${this.state.informations.source}&mediaType=${this.state.informations.mediaType}&id=${this.state.informations.id}`
        return <Redirect push to={link}></Redirect>
    }

    return (
      <div>
        <TextField outlined label="Link" type="url" onChange={(e) => this.setState({link: e.target.value})}/>  
        <Button onClick={this.share}>Teilen</Button>
      </div>
    );
  }
}