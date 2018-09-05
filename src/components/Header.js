import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Scroll from 'react-scroll';

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

  setTabPos(tabPos) {
    const { value } = this.state;
    let updateValue = 0;
    switch(tabPos) {
      case 'profile':
        updateValue = 0;
        break;
      case 'workExp':
        updateValue = 1;
        break;
      case 'edu':
        updateValue = 2;
        break;
      case 'projects':
        updateValue = 3;
        break;
      case 'publications':
        updateValue = 4;
        break;
      default:
        updateValue = 0;
    }
    if (value !== updateValue) {
      this.setState({ value: updateValue });
    }
  }

  goToSession(session) {
    const { sessionPos } = this.props;
    const offsetPos = sessionPos[session] - 79; // offset for App Bar
    Scroll.animateScroll.scrollTo(offsetPos);
  }

  componentDidMount() {
    const { tabPos } = this.props;
    this.setTabPos(tabPos);
  }

  componentWillUpdate(nextProps) {
    const { tabPos } = nextProps;
    this.setTabPos(tabPos);
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
              scrollButtons="off"
            >
              <Tab label="Home" onClick={this.goToSession.bind(this, 'profile')} />
              <Tab label="Work Experience" onClick={this.goToSession.bind(this, 'workExp')} />
              <Tab label="Education" onClick={this.goToSession.bind(this, 'edu')} />
              <Tab label="Projects" onClick={this.goToSession.bind(this, 'projects')} />
              <Tab label="Publications" onClick={this.goToSession.bind(this, 'publications')} />
            </Tabs>
          </Toolbar>
        </AppBar>
    );
  }
}

Header.propTypes = {
  site: PropTypes.object,
  classes: PropTypes.object,
  tabPos: PropTypes.string,
  sessionPos: PropTypes.object,
};

export default withStyles(styles)(Header);
