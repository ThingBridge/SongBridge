import React from 'react';
import './App.css';
import 'material-components-web/dist/material-components-web.min.css';
import { LinkHandler } from "./core/LinkHandler";
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle
} from 'rmwc/Toolbar';
import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';
import { Grid, GridCell } from 'rmwc/Grid';import {
  List,
  ListItem,
  ListItemText
} from 'rmwc/List';



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

  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarTitle>SongBridge</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
        <Grid>
          <GridCell phone="0" tablet="2" desktop="4"></GridCell>
          <GridCell phone="4" tablet="4" desktop="4">
            <TextField label="Link" type="url" onChange={(e) => this.setState({link: e.target.value})} fullwidth/>
          </GridCell>
          <GridCell phone="0" tablet="2" desktop="4"></GridCell>

          <GridCell phone="0" tablet="2" desktop="4"></GridCell>
          <GridCell phone="4" tablet="4" desktop="4">
            <Button onClick={this.handleShare}>Teilen</Button></GridCell>
          <GridCell phone="0" tablet="2" desktop="4"></GridCell>

          <GridCell phone="0" tablet="2" desktop="4"></GridCell>
          <GridCell phone="4" tablet="4" desktop="4">
            <List>
              {
                this.state.links.map(function(link) {
                    return <ListItem>
                      <ListItemText onClick={(e) => window.location = link.link}>{link.name}</ListItemText>
                    </ListItem>
                })
              }
            </List>
          </GridCell>
          <GridCell phone="0" tablet="2" desktop="4"></GridCell>
        </Grid>
      </div>
    );
  }
}

export default App;



// WEBPACK FOOTER //
// src/App.js