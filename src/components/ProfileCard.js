import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import EmailIcon from '@material-ui/icons/Email';

import GithubIcon from '../images/GithubIcon.svg';

const mobileWidth = 700;

const styles = (theme) => ({
  card: {
    margin: theme.spacing.unit,
    textAlign: 'center',
    marginTop: 68,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  icon: {
    marginLeft: -12,
    marginRight: 20,
    width: 24,
    height: 24,
  },
  content: {
    margin: 'auto',
    width: '60%',
  },
  media: {
    margin: 'auto',
    height: 200,
    width: 200,
  },
});

class ProfileCard extends React.Component {
  render() {
    const { classes, profile, imageList } = this.props;
    const { name, fullName, image, description, email, github, githubLink } = profile;
    return (
      <Card raised className={classes.card}>
        <CardHeader
          title={name}
          subheader={fullName}
        />
        <CardMedia
          className={classes.media}
          image={imageList[window.innerWidth > mobileWidth ? image: `${image}_mobile`]}
          title={name}
        />
        <CardContent className={classes.content}>
          <List>
              {
                description &&
                description.map((data, index)=> (
                  <ListItem key={`profileDes${index}`}>
                    <Typography component="p">
                      {data}
                    </Typography>
                  </ListItem>
                ))
              }
            <ListItem button>
              <EmailIcon color="inherit" className={classes.icon} />
              <Typography component="p">
                {email}
              </Typography>
            </ListItem>
            <a href={githubLink} target="_blank" className={classes.link}>
              <ListItem button>
                <img src={GithubIcon} className={classes.icon} alt="GitHub" />
                <Typography component="p">
                  {github}
                </Typography>
              </ListItem>
            </a>
          </List>
        </CardContent>
      </Card>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object,
  classes: PropTypes.object,
  imageList: PropTypes.object,
};

export default withStyles(styles)(ProfileCard);
