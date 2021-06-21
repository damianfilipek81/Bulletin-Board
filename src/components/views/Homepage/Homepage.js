import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from '../../features/PostCard/PostCard';
import { SideMenu } from '../../features/SideMenu/SideMenu';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

import { connect } from 'react-redux';
import { getFilteredCategories } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';

const Component = ({ className, getFilteredCategories }) => (
  <div className={clsx(className, styles.root)} {...console.log(getFilteredCategories)}>
    <div className={styles.wrapper}>
      <Grid container spacing={0} item xs={3}>
        <SideMenu />
      </Grid>
      <Grid container spacing={3} item xs={9}>
        <div className={styles.products}>
          {getFilteredCategories.map(data => 
            <PostCard key={data.id} {...data}/>
          )}
        </div>
      </Grid>
    </div>
    <Pagination count={10} color="primary" />
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  getFilteredCategories: PropTypes.array,
};

const mapStateToProps = state => ({
  getFilteredCategories: getFilteredCategories(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
