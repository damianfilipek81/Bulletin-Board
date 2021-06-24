import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostCard.module.scss';

const Component = ({ title, price, author, date, image, _id }) => (
  <Link to={`/post/${_id}`} component={CardActionArea}>
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img src={image} alt=''></img>
      </div>
      <div className={styles.infoWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <h2 className={styles.price}>{price}$</h2>
      </div>
      <div className={styles.rightInfoWrapper}>
        <div className={styles.authorWrapper}>
          <h4>{author}</h4>
          <Avatar>{author[0]}</Avatar>
        </div>
        <div className={styles.dateWrapper}>
          <h5>{date}</h5>
        </div>
      </div>
    </div>
  </Link>
);

Component.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  _id: PropTypes.string,
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
