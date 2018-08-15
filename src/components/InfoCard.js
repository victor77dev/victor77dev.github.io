import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import DateIcon from '@material-ui/icons/DateRange';
import SchoolIcon from '@material-ui/icons/School';
import GithubIcon from '../images/GithubIcon.svg';

const mobileWidth = 700;

const styles = (theme) => ({
  card: {
    margin: theme.spacing.unit,
    textAlign: 'left',
  },
  icon: {
    margin: 'auto',
    marginRight: theme.spacing.unit,
    height: 18,
    width: 18,
    color: 'inherit',
  },
  chip: {
    margin: 0.5 * theme.spacing.unit,
  },
  content: {
    margin: 'auto',
    width: '60%',
  },
  media: {
    paddingTop: '46.94%', // Screen ratio in my notebook
  },
  mediaMobile: {
    paddingTop: '46.87%', // Screen ratio for mobile version image
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

const ImageContent = (props) => {
  const { classes, image, title, link, imageList } = props;
  if (link && image) {
    return (
      <a href={link} target="_blank" className={classes.link} >
        {
          image &&
          <CardMedia
            className={window.innerWidth > mobileWidth ? classes.media : classes.mediaMobile}
            image={imageList[window.innerWidth > mobileWidth ? image : `${image}_mobile`]}
            title={title}
          />
        }
      </a>
    )
  }
  if (link && !image) {
    return (
      <a href={link} target="_blank" className={classes.link} >
        <CardContent>
          {link}
        </CardContent>
      </a>
    )
  }
  if (!link && image) {
    return (
      image &&
      <CardMedia
        className={classes.media}
        image={imageList[image]}
        title={title}
      />
    )
  }
  return null;
};

ImageContent.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
  classes: PropTypes.object,
};

class InfoCard extends React.Component {
  render() {
    const { classes, data, imageList } = this.props;
    const { title, info, time, image, description, tags, link, publications, github } = data;
    return (
      <Card raised className={classes.card}>
        <CardHeader
          title={title}
          subheader={
            <div>
              {info}
              {
                time &&
                <div>
                  <DateIcon className={classes.icon} />
                  {time}
                </div>
              }
            </div>
          }
        >
        </CardHeader>
        <ImageContent classes={classes} image={image} title={title} link={link} imageList={imageList} />
        {
          publications &&
          publications.map((data, index) => (
            <a href={data} target="_blank" key={`${title}_publication_link_${index}`} className={classes.link} >
              <CardContent>
                <SchoolIcon className={classes.icon} />
                {data}
              </CardContent>
            </a>
          ))
        }
        {
          description &&
          <CardContent>
            {
              description.map((data, index) => {
                if (Array.isArray(data)) {
                  return (
                    <ul key={`${title}_des_${index}`}>
                      {
                        data.map((listData, listIndex) => (
                          <Typography component="p" key={`${title}_des_${index}_list_${listIndex}`}>
                            <li>
                              {listData}
                            </li>
                          </Typography>
                        ))
                      }
                    </ul>
                  );
                }
                return (
                  <Typography component="p" key={`${title}_des_${index}`}>
                    {data}
                  </Typography>
                );
              })
            }
          </CardContent>
        }
        {
          tags &&
          <CardContent>
            {
              tags.map((data) => (
                <Chip label={data} className={classes.chip} key={`${title}_tag_${data}`} />
              ))
            }
          </CardContent>
        }
        {
          github &&
          github.map((data, index) => (
            <a href={data} target="_blank" key={`${title}_github_link_${index}`} className={classes.link} >
              <CardContent>
                <img src={GithubIcon} className={classes.icon} alt="GitHub" />
                {data}
              </CardContent>
            </a>
          ))
        }
      </Card>
    );
  }
}

InfoCard.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
  imageList: PropTypes.object,
};

export default withStyles(styles)(InfoCard);
