import React from 'react';
import { LinkHandler } from "./core/LinkHandler";
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';


class App extends React.Component {
  spotifyLinkHandler;

  constructor(props) {
    super(props);
    this.state = { link: "https://open.spotify.com/track/77NNZQSqzLNqh2A9JhLRkg", links: []};
    this.handleShare = this.handleShare.bind(this);
  }

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  handleShare() {
    var linkHandler = new LinkHandler();
    linkHandler.getLinks(this.state.link).then((value) => {
      for (let i = 0; i < value.links.length; i++) {
        value.links[i].key = `${i}`;

        switch (value.links[i].name) {
          case "spotify":
            value.links[i].icon = "fab fa-spotify";
            break;
          case "appleMusic":
            value.links[i].icon = "fab fa-itunes";
            break;
          default:
            value.links[i].icon = "fab fa-itunes-note";
        }
      }
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
        <div>
          <AppBar id="appbar">
            <Toolbar>
              <Typography variant="title" color="inherit">
              SongBridge
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div id="content">
          <Grid container>
            <Grid item xs={1} sm={3} md={4}></Grid>
            <Grid item xs={10} sm={6} md={4} className="centeredParent">
              <TextField className="centeredContent" label="Link" type="url" onChange={(e) => this.setState({link: e.target.value})}/>
            </Grid>
            <Grid item xs={1} sm={3} md={4}></Grid>

            <Grid item xs={1} sm={3} md={4}></Grid>
            <Grid item xs={10} sm={6} md={4} className="centeredParent">
              <Button className="shareButton centeredContent" onClick={this.handleShare}>Teilen</Button>
            </Grid>
            <Grid item xs={1} sm={3} md={4}></Grid>

            <Grid item xs={1} sm={3} md={4}></Grid>
            <Grid item xs={10} sm={6} md={4} className="centeredParent">
              <List className="centeredContent">
                {
                  this.state.links.map(function(link) {
                    return <ListItem button key={link.key} className="centeredContent">
                      <ListItemIcon>
                        <Icon className={classNames(`${link.icon}`)} />
                      </ListItemIcon>
                      <ListItemText key={link.key} onClick={(e) => window.location = link.link}>{link.name}</ListItemText>
                      </ListItem>
                  })
                }
              </List>
            </Grid>
            <Grid item xs={1} sm={3} md={4}></Grid>
          </Grid>
        </div>
      </div>
    )
  }
}


export default App;



// WEBPACK FOOTER //
// src/App.js