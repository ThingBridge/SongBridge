import React from 'react';
import { LinkHandler } from "./core/LinkHandler";
import './App.css';
import 'material-components-web/dist/material-components-web.min.css';
import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle
} from 'rmwc/Toolbar';
import { Grid, GridCell } from 'rmwc/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LinkInput } from './LinkInput';
import { ShareSheet } from './ShareSheet';


class App extends React.Component {
  render() {
    return (
      <Router basename="alpha/bridge/">
        <div>
            <Toolbar>
              <ToolbarRow>
                  <ToolbarTitle>
                    <Link style={{ textDecoration: 'none', color:'white' }} to="/">SongBridge</Link>
                  </ToolbarTitle>
              </ToolbarRow>
            </Toolbar>
            <Grid>
              <GridCell phone="0" tablet="2" desktop="4"></GridCell>
              <GridCell phone="4" tablet="4" desktop="4">
                    <Route path="/" component={LinkInput} exact></Route>
                    <Route path="/share" component={ShareSheet}></Route>
              </GridCell>
              <GridCell phone="0" tablet="2" desktop="4"></GridCell>
            </Grid>
        </div>
      </Router>
    );
  }
}


export default App;



// WEBPACK FOOTER //
// src/App.js