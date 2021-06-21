import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPostData } from '../../../redux/postsRedux';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

import styles from './Post.module.scss';

const Component = ({ post }) => {
  const { image, title, author, price, date, description } = post[0];

  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img src={image} alt=''></img>
      </div>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.infoWrapper}>
            <h1>{title}</h1>
            <h3>Seller {author}</h3>
            <h2>{price} $</h2>
          </div>
          <div className={styles.favoritesWrapper}>
            <h4>Creation date {date}</h4>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </div>
        </div>
        <div className={styles.descriptionWrapper}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

Component.propTypes = {
  post: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  post: getPostData(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
