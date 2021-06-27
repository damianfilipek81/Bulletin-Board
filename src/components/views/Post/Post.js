import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchPost, getOnePostData, fetchDeletePost } from '../../../redux/postsRedux';
import { getAll } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

import styles from './Post.module.scss';

const Component = ({ post, user, fetchPost, deletePost }) => {

  useEffect(() => {
    fetchPost();
  }, []);

  const [dropdownOn, setDropdownOn] = useState(false);
  const handleSetDropdownOn = () => {
    setDropdownOn(!dropdownOn);
  };

  const handleDeletePost = () => {
    deletePost();
    window.location.replace(`http://localhost:3000/`);
  };
  
  const { image, title, author, price, creationDate, editDate, description, email, _id, tel } = post;
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
      {((loggedIn && user.email === email) || admin) && <Link component={Button} to={`/post/${_id}/edit`} color="secondary" className={styles.editButton}>Edit post</Link>}
      {((loggedIn && user.email === email) || admin) && <Button color="secondary" onClick={() => handleDeletePost()} className={styles.deleteButton}>Delete post</Button>}
    </div>
  );
};

Component.propTypes = {
  fetchPost: PropTypes.func,
  deletePost: PropTypes.func,
  post: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  post: getOnePostData(state),
  user: getAll(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchPost: () => dispatch(fetchPost(props.match.params.id)),
  deletePost: () => dispatch(fetchDeletePost(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
