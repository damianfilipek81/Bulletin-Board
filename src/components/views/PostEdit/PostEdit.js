/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Form as FormField, Field } from 'react-final-form';

import { connect } from 'react-redux';
import { getOnePostData, fetchEditPost, fetchPost } from '../../../redux/postsRedux';

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styles from './PostEdit.module.scss';

const Component = ({ post, editPost, fetchPost }) => {
  const [editFetch, setEditFetch] = useState(null);
  useEffect(() => {
    fetchPost();
  }, [editFetch]);

  const { image, title, author, price, creationDate, description, email, _id, tel, categories, status } = post;
  const [dropdownOn, setDropdownOn] = useState(false);

  const handleSetDropdownOn = () => {
    setDropdownOn(!dropdownOn);
  };

  const editDate = () => {
    const date = new Date();
    return `${date.getDate()}.${(date.getMonth() + 1)}.${date.getFullYear()}`;
  };

  const onSubmit = (values) => {
    const { title, description, email, price, phone, status } = values;
    const output = {
      _id,
      title,
      author,
      description,
      email,
      price,
      phone,
      categories,
      creationDate,
      status,
      editDate: editDate(),
      image,
    };

    setEditFetch(output);
    editPost(output);
  };
  return (
    <FormField onSubmit={onSubmit}>
      {(prop) => (
        <form className={styles.root} onSubmit={(e) => {
          prop.handleSubmit(e);
        }} >
          <div className={styles.imageWrapper}>
            {post.image !== undefined && <img src={`data:image/jpeg;base64,${post.image.data}`} alt=''></img>}
          </div>
          <div className={styles.wrapper}>
            <div>
              <div className={styles.infoWrapper}>
                <Field name='title' defaultValue={title}>
                  {props => {
                    const { name, value, onChange } = props.input;
                    return <TextField value={value} name={name} onChange={onChange} />;
                  }
                  }
                </Field>
                <h3>Seller {author}</h3>
                <Field name='price' defaultValue={parseFloat(price)}>
                  {props => {
                    const { name, value, onChange } = props.input;
                    return <TextField value={value} name={name} onChange={onChange} type="number"
                      InputProps={{
                        endAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />;
                  }
                  }
                </Field>
              </div>
              <div className={styles.favoritesWrapper}>
                <h4>Creation date {creationDate}</h4>
                <Field name='status' defaultValue={status}>
                  {props => {
                    const { name, value, onChange } = props.input;
                    return <Select
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
                    </Select>;
                  }
                  }
                </Field>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
              </div>
            </div>
            <div className={styles.descriptionWrapper}>
              <Field name='description' defaultValue={description}>
                {props => {
                  const { name, value, onChange } = props.input;
                  return <TextField multiline rows={10} value={value} name={name} onChange={onChange} />;
                }
                }
              </Field>
              <IconButton
                onClick={handleSetDropdownOn}
                className={styles.dropdown}
              >
                CONTACT
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={dropdownOn} timeout="auto" unmountOnExit className={styles.contact}>
                <Field name='tel' defaultValue={tel}>
                  {props => {
                    const { name, value, onChange } = props.input;
                    return <h4>Tel: <TextField value={value} name={name} onChange={onChange} /></h4>;
                  }
                  }
                </Field>
                <Field name='email' defaultValue={email}>
                  {props => {
                    const { name, value, onChange } = props.input;
                    return <h4>Email: <TextField value={value} name={name} onChange={onChange} /></h4>;
                  }
                  }
                </Field>
              </Collapse>
            </div>
          </div>
          <Button color="secondary" type="submit" className={styles.saveButton}>Save post</Button>
        </form>
      )}
    </FormField>
  );
};

Component.propTypes = {
  post: PropTypes.object,
  editPost: PropTypes.func,
  fetchPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  post: getOnePostData(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  editPost: arg => dispatch(fetchEditPost(arg)),
  fetchPost: () => dispatch(fetchPost(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
