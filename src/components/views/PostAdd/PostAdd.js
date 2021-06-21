import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

const Component = () => {
  const testCategories = ['asdads', '11111', 'bbbbb'];

  return (
    <div className={styles.root}>
      <h1>Add new post</h1>
      <form>
        <TextField id="outlined-basic" label="Your name" variant="outlined" />
        <TextField id="outlined-basic" label="Your email" type="email" variant="outlined" />
        <TextField id="outlined-basic" label="Your telephone number" type="tel" variant="outlined" />
        <TextField id="outlined-basic" label="Post name" variant="outlined" />
        <Autocomplete
          multiple
          id="tags-filled"
          options={testCategories.map((option) => option)}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Categories" placeholder="Categories" />
          )}
        />
        <TextField id="outlined-basic" label="Price" type="number"
          InputProps={{
            endAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} variant="outlined" />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={10}
          variant="outlined"
        />
        <div className={styles.buttons}>
          <input accept="image/*" className={styles.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <Button
            variant="contained"
            color="primary"
          >
            Add post
          </Button>
        </div>
      </form>
    </div>
  );
};
Component.propTypes = {
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
