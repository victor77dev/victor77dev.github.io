import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import InfoCard from '../components/InfoCard';

const styles = (theme) => ({
  card: {
    margin: theme.spacing.unit,
    textAlign: 'left',
  },
});

class SessionCard extends React.Component {
  render() {
    const { title, infoData, classes } = this.props;
    return (
      <Card raised className={classes.card}>
        <CardHeader
          title={title}
        />
        <CardContent>
          <GridList
            cols={1}
            cellHeight="auto"
          >
            {
              infoData &&
              infoData.map((data, index) => (
                <GridListTile key={`${title}_${index}`}>
                  <InfoCard data={data} />
                </GridListTile>
              ))
            }
          </GridList>
        </CardContent>
      </Card>
    );
  }
}

SessionCard.propTypes = {
  title: PropTypes.string,
  infoData: PropTypes.array,
  classes: PropTypes.object,
};
export default withStyles(styles)(SessionCard);
