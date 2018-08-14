import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  flex: {
    flexGrow: 1,
  },
};

class Header extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    if (value !== this.state.value)
      this.setState({ value });
  };
  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps)
    console.log(nextState)
  }
  componentDidUpdate() {
    console.log('did update')
    console.log(this.props)
    console.log(this.state)
  }

  render() {
    const { value } = this.state;
    const { site, classes } = this.props;
    const { name } = site;
    return (
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {name}
            </Typography>
            <Tabs
              className={classes.flex}
              value={value}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
            >
              <Tab label="Home" href="#" />
              <Tab label="Work Experience" href="#workExp" />
              <Tab label="Education" href="#edu" />
              <Tab label="Projects" href="#projects" />
              <Tab label="Publications" href="#publications" />
            </Tabs>
          </Toolbar>
        </AppBar>
    );
  }
}

Header.propTypes = {
  site: PropTypes.object,
  classes: PropTypes.object,
};

export default withStyles(styles)(Header);
