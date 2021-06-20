import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostCard.module.scss';

const Component = ({ className }) => (
  <CardActionArea>
    <div className={clsx(className, styles.root)}>
      <div className={styles.imageWrapper}>
        <img src={'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'} alt=''></img>
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.title}>BMW M3 BLUE 50 000 MILES</h3>
        <h2 className={styles.price}>50 000 $</h2>
      </div>
      <div className={styles.rightInfoWrapper}>
        <div className={styles.authorWrapper}>
          <h4>Damian Filipek</h4>
          <Avatar>D</Avatar>
        </div>
        <div className={styles.dateWrapper}>
          <h5>15.05.2021</h5>
        </div>
      </div>
    </div>
  </CardActionArea>
);

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostCard,
  // Container as PostCard,
  Component as PostCardComponent,
};
