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

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

const styles = {
  grid: {
    background: blueGrey[700],
  },
  flex: {
    flexGrow: 1,
  },
  anchor: {
    marginTop: -68,
  }
};

class Page extends React.Component {
  render() {
    const { data, classes } = this.props;
    const { site, profile, workExp, education, projects, publications } = data;
    return (
      <MuiThemeProvider theme={theme}>
        <Header site={site} />
        <Grid container justify="center" className={classes.grid}>
          <GridList
            cols={1}
            cellHeight="auto"
          >
            <a name="" className={classes.anchor}> </a>
            <GridListTile>
              <ProfileCard profile={profile}/>
            </GridListTile>
            <a name="workExp" className={classes.anchor}> </a>
            <GridListTile>
              <SessionCard title="Work Experience" infoData={workExp} />
            </GridListTile>
              <a name="edu" className={classes.anchor}> </a>
            <GridListTile>
              <SessionCard title="Education" infoData={education} />
            </GridListTile>
            <a name="projects" className={classes.anchor}> </a>
            <GridListTile>
              <SessionCard title="Projects" infoData={projects} />
            </GridListTile>
            <a name="publications" className={classes.anchor}> </a>
            <GridListTile>
              <SessionCard title="Publications" infoData={publications} />
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
