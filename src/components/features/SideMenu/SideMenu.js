import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { connect } from 'react-redux';
import { getCategories, removeCategory, addCategory} from '../../../redux/postsRedux.js';

import styles from './SideMenu.module.scss';

const Component = ({ getCategories, addCategory, removeCategory }) => {

  const handleChange = (checked, category) => {
    if (checked) {
      addCategory(category);
    } else {
      removeCategory(category);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <h2>Categories</h2>
        {getCategories.map((category, index) =>
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                color="primary"
                onChange={(e) => handleChange(e.currentTarget.checked, category)}
              />
            }
            label={category}
          />
        )}
      </div>
    </div>
  );
};

Component.propTypes = {
  getCategories: PropTypes.array,
  removeCategory: PropTypes.func,
  addCategory: PropTypes.func,
};

const mapStateToProps = state => ({
  getCategories: [...new Set(getCategories(state))],
});

const mapDispatchToProps = dispatch => ({
  addCategory: arg => dispatch(addCategory(arg)),
  removeCategory: arg => dispatch(removeCategory(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as SideMenu,
  Component as SideMenuComponent,
};
