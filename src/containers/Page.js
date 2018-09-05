import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import blueGrey from '@material-ui/core/colors/blueGrey';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import SessionCard from '../components/SessionCard';

const imageImport = require.context('../images/', false, /\.(png|jpe?g|svg|gif)$/);
const imageList = imageImport.keys().reduce((list, key) => {
  const updateList = list;
  const keyName = key.replace('./', '').replace(/\.(png|jpe?g|svg|gif)/, '');
  updateList[keyName] = imageImport(key);
  return updateList;
}, {});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

const styles = {
  grid: {
    background: blueGrey[700],
    maxWidth: 'calc(1080px + 16px * 2)',
    margin: '0 auto',
    padding: '0 16px',
  },
  gridList: {
    minWidth: 240,
  },
  anchor: {
    marginTop: -68,
  }
};

class Page extends React.Component {
  state = {
    tabPos: '',
    sessionPos: {},
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const offsetPos = window.scrollY + 79; // offset for App Bar
    const { sessionPos } = this.state;
    if (offsetPos < sessionPos['workExp']) this.setState({tabPos: 'profile'}); else
    if (offsetPos < sessionPos['edu']) this.setState({tabPos: 'workExp'}); else
    if (offsetPos < sessionPos['projects']) this.setState({tabPos: 'edu'}); else
    if (offsetPos < sessionPos['publications']) this.setState({tabPos: 'projects'}); else
    this.setState({tabPos: 'publications'});
  }

  updateRef = (name, element) => {
    if (element) {
      const position = element.getBoundingClientRect().top + window.scrollY;
      const { sessionPos } = this.state;
      sessionPos[name] = position;
    }
  }

  render() {
    const { data, classes } = this.props;
    const { tabPos, sessionPos } = this.state;
    const { site, profile, workExp, education, projects, publications } = data;
    return (
      <MuiThemeProvider theme={theme}>
        <Header site={site} tabPos={tabPos} sessionPos={sessionPos} />
        <Grid container justify="center" className={classes.grid}>
          <GridList
            cols={1}
            cellHeight="auto"
            className={classes.gridList}
          >
            <a name="" className={classes.anchor}> </a>
            <GridListTile>
              <div ref={this.updateRef.bind(this, 'profile')}>
                <ProfileCard profile={profile} imageList={imageList} />
              </div>
            </GridListTile>
            <a name="workExp" className={classes.anchor}> </a>
            <GridListTile>
              <div ref={this.updateRef.bind(this, 'workExp')}>
                <SessionCard title="Work Experience" infoData={workExp} imageList={imageList} />
              </div>
            </GridListTile>
              <a name="edu" className={classes.anchor}> </a>
            <GridListTile>
              <div ref={this.updateRef.bind(this, 'edu')}>
                <SessionCard title="Education" infoData={education} imageList={imageList} />
              </div>
            </GridListTile>
            <a name="projects" className={classes.anchor}> </a>
            <GridListTile>
              <div ref={this.updateRef.bind(this, 'projects')}>
                <SessionCard title="Projects" infoData={projects} imageList={imageList} />
              </div>
            </GridListTile>
            <a name="publications" className={classes.anchor}> </a>
            <GridListTile>
              <div ref={this.updateRef.bind(this, 'publications')}>
                <SessionCard title="Publications" infoData={publications} imageList={imageList} />
              </div>
            </GridListTile>
          </GridList>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

Page.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(Page);
