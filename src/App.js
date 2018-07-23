import React from 'react';
import './App.css';
import 'material-components-web/dist/material-components-web.min.css';
import {
  Drawer,
  DrawerContent
} from 'rmwc/Drawer';
import {
  ListItem,
  ListItemText,
  ListItemGraphic
} from 'rmwc/List';
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarTitle
} from 'rmwc/TopAppBar';
import { Grid, GridCell } from 'rmwc/Grid';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LinkInput } from './LinkInput';
import { ShareSheet } from './ShareSheet';
import { ThemeProvider } from '../node_modules/rmwc';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showDrawer: false
    }
  }

  render() {
    return (
      <Router basename="alpha/bridge/">
        <div>
          <ThemeProvider options={{
            primary: 'test'
          }}>
            <TopAppBar fixed id="appbar" onNav={() => this.setState({showDrawer: true})}>
              <TopAppBarRow>
                <TopAppBarSection alignStart>
                  <TopAppBarNavigationIcon use="menu" />
                  <TopAppBarTitle>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/">SongBridge</Link>
                  </TopAppBarTitle>
                </TopAppBarSection>
              </TopAppBarRow>
            </TopAppBar>
          </ThemeProvider>
          <ThemeProvider options={{
            primary: '#1B998B'
          }} className="content">
            <Drawer temporary open={this.state.showDrawer} onClose={() => {this.setState({showDrawer: false})}}>
              <DrawerContent>
                <ListItem>
                  <ListItemGraphic>star_border</ListItemGraphic>
                  <ListItemText>Impressum</ListItemText>
                </ListItem>
              </DrawerContent>
            </Drawer>
            <Grid>
              <GridCell phone="0" tablet="2" desktop="2"></GridCell>
              <GridCell phone="4" tablet="4" desktop="8">
                <Route path="/" component={LinkInput} exact></Route>
                <Route path="/share" component={ShareSheet}></Route>
              </GridCell>
              <GridCell phone="0" tablet="2" desktop="2"></GridCell>
            </Grid>
          </ThemeProvider>
        </div>
      </Router>
    );
  }
}


export default App;



// WEBPACK FOOTER //
// src/App.js