import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPostData, fetchPublished } from '../../../redux/postsRedux';
import { getAll } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

import styles from './Post.module.scss';

const Component = ({ post, user, fetchPublished }) => {
  useEffect(() => {
    fetchPublished();
  });
  const { image, title, author, price, creationDate, editDate, description, email, id, tel } = post;
  const { admin, loggedIn } = user;
  const [dropdownOn, setDropdownOn] = useState(false);

  const handleSetDropdownOn = () => {
    setDropdownOn(!dropdownOn);
  };

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
            <h4>Creation date {creationDate}</h4>
            <h4>Edit date {editDate}</h4>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </div>
        </div>
        <div className={styles.descriptionWrapper}>
          <p>{description}</p>
          <IconButton
            onClick={handleSetDropdownOn}
            className={styles.dropdown}
          >
            CONTACT
            <ExpandMoreIcon />
          </IconButton>
          <Collapse in={dropdownOn} timeout="auto" unmountOnExit className={styles.contact}>
            <h4>Tel: {tel}</h4>
            <h4>Email: {email}</h4>
          </Collapse>
        </div>
      </div>
      {((loggedIn && user.email === email) || admin) && <Link component={Button} to={`/post/${id}/edit`} color="secondary" className={styles.editButton}>Edit post</Link>}
    </div>
  );
};

Component.propTypes = {
  post: PropTypes.array,
  user: PropTypes.object,
  fetchPublished: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  post: getPostData(state, props.match.params.id),
  user: getAll(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchPublished: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
