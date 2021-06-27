/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Form as FormField, Field } from 'react-final-form';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connect } from 'react-redux';
import { fetchAddPost, getCategories } from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';

const Component = ({ addPost, getCategories }) => {

  const date = () => {
    const date = new Date();
    return `${date.getDate()}.${(date.getMonth() + 1)}.${date.getFullYear()}`;
  };

  const onSubmit = (values) => {
    const { title, author, description, email, price, phone, status, categories, image } = values;

    const data = new FormData();
    data.append('image', image);
    data.append('title', title);
    data.append('author', author);
    data.append('description', description);
    data.append('email', email);
    data.append('price', price);
    data.append('tel', phone);
    data.append('categories', categories);
    data.append('creationDate', date());
    data.append('editDate', date());
    data.append('status', status);
    return addPost(data);
  };
  const required = value => (value ? undefined : 'Required');
  return (
    <div className={styles.root}>
      <h1>Add new post</h1>
      <FormField onSubmit={onSubmit} encType="multipart/form-data">
        {(prop) => (
          <form onSubmit={(e) => {
            prop.handleSubmit(e);
            prop.form.reset();
          }} encType="multipart/form-data">
            <Field name='author' validate={required}>
              {props => {
                const { name, value, onChange } = props.input;
                return <TextField name={name} value={value} onChange={onChange} label="Your name" variant="outlined" />;
              }
              }
            </Field>
            <Field name='email' validate={required}>
              {props => {
                const { name, value, onChange } = props.input;
                return <TextField name={name} value={value} onChange={onChange} label="Your email" type="email" variant="outlined" />;
              }
              }
            </Field>
            <Field name='phone' validate={required}>
              {props => {
                const { name, value, onChange } = props.input;
                return <TextField name={name} value={value} onChange={onChange} label="Your telephone number" type="tel" variant="outlined" />;
              }
              }
            </Field>
            <Field name='title' validate={required}>
              {props => {
                const { name, value, onChange } = props.input;
                return <TextField name={name} value={value} onChange={onChange} label="Post name" variant="outlined" />;
              }
              }
            </Field>
            <Field name='categories'>
              {props => {
                const { name, value, onChange } = props.input;
                return (
                  <Autocomplete
                    multiple
                    options={getCategories.map((option) => option)}
                    freeSolo
                    renderTags={(_, getTagProps) => {
                      return value && value.map((option, index) => (
                        <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
                      ));
                    }}
                    name={name}
                    onChange={(_, value) => onChange(value)}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Categories" placeholder="Categories" />
                    )}
                  />
                );
              }}
            </Field>
            <Field name='price' validate={required}>
              {props => {
                const { name, value, onChange } = props.input;
                return <TextField name={name} value={value} onChange={onChange} label="Price" type="number"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }} variant="outlined" />;
              }
              }
            </Field>
            <Field name='status' validate={required}>
              {props => {
                const { name, value, onChange } = props.input;
                return <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value}
                    onChange={onChange}
                    name={name}
                    label='Status'
                  >
                    <MenuItem value={'draft'}>Draft</MenuItem>
                    <MenuItem value={'published'}>Published</MenuItem>
                    <MenuItem value={'closed'}>Closed</MenuItem>
                  </Select>
                </FormControl>;
              }
              }
            </Field>
            <Field name='description' validate={required}>
              {props => {
                const { name, value, onChange } = props.input;
                return <TextField
                  name={name}
                  value={value}
                  onChange={onChange}
                  label="Description"
                  multiline
                  rows={10}
                  variant="outlined"
                />;
              }
              }
            </Field>
            <div className={styles.buttons}>
              <Field name='image'>
                {props => {
                  const { name, onChange } = props.input;
                  return <input accept="image/*" className={styles.input} id="icon-button-file" type="file" onChange={(e) => onChange(e.target.files[0])} name={name} />;
                }
                }
              </Field>
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Add post
              </Button>
            </div>
          </form>
        )}
      </FormField >
    </div>
  );
};
Component.propTypes = {
  addPost: PropTypes.func,
  getCategories: PropTypes.array,
};

const mapStateToProps = state => ({
  getCategories: [...new Set(getCategories(state))],
});

const mapDispatchToProps = dispatch => ({
  addPost: arg => dispatch(fetchAddPost(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostAdd,
  Component as PostAddComponent,
};
