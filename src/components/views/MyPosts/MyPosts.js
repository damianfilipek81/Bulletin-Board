import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { PostCard } from '../../features/PostCard/PostCard';
import { connect } from 'react-redux';
import { fetchAll, getAll } from '../../../redux/postsRedux.js';

import styles from './MyPosts.module.scss';

const Component = ({ fetchAll, getPosts }) => {
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.products}>
        {getPosts.myPosts.map(data =>
          <PostCard key={data._id} {...data} />
        )}
      </div>
    </div>
  );
};
Component.propTypes = {
  getPosts: PropTypes.array,
  fetchAll: PropTypes.func,
};

const mapStateToProps = state => ({
  getPosts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAll: (arg) => dispatch(fetchAll(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as MyPosts,
  Component as MyPostsComponent,
};
