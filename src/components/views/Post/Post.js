import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

const Component = ({ classname }) => {
  const { id } = useParams();
  return (
    <div className={styles.root}>
      {console.log(id)}

    </div>
  );
};

Component.propTypes = {
  classname: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Post,
  // Container as Post,
  Component as PostComponent,
};
