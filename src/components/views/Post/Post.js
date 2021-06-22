import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPostData } from '../../../redux/postsRedux';
import { getAll } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

import styles from './Post.module.scss';

const Component = ({ post, user }) => {
  const { image, title, author, price, date, description, email, id } = post[0];
  const { admin, loggedIn } = user;

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
      {((loggedIn && user.email === email) || admin) && <Link component={Button}  to={`/post/${id}/edit`} color="secondary" className={styles.editButton}>Edit post</Link>}
    </div>
  );
};

Component.propTypes = {
  post: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  post: getPostData(state, props.match.params.id),
  user: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
