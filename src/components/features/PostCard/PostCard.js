import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';

import styles from './PostCard.module.scss';

const Component = ({ title, price, author, date, image, _id }) => {
  return (
    <Link to={`/post/${_id}`} component={CardActionArea}>
      <div className={styles.root}>
        <div className={styles.imageWrapper}>
          {image !== undefined && <img src={`data:image/jpeg;base64,${image.data}`} alt=''></img>}
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
    </Link >
  );
};

Component.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.object,
  _id: PropTypes.string,
};

export {
  Component as PostCard,
  Component as PostCardComponent,
};
