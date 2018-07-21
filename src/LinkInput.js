import React from 'react';
import { TextField } from 'rmwc/TextField';
import { Button, ButtonIcon } from 'rmwc/Button';
import { LinkHandler } from './core/LinkHandler';
import { GridInner, GridCell } from "rmwc/Grid";
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
      <GridInner>
        <GridCell phone="4" tablet="8" desktop="12">
          <TextField box  withLeadingIcon="link" className="link-input" label="Link" type="url" onChange={(e) => this.setState({link: e.target.value})}/> 
        </GridCell> 
        <GridCell phone="4" tablet="8" desktop="12">
          <Button raised onClick={this.share}>
            <ButtonIcon use="search" />
            Suchen
          </Button>
        </GridCell> 
      </GridInner>
    );
  }
}