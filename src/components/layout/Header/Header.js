import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import styles from './Header.module.scss';

import { connect } from 'react-redux';
import { changeUser, getAll } from '../../../redux/usersRedux';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.35),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.40),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Component = ({ changeUser, getUser }) => {
  const [user, setUser] = useState('loggedIn');
  const classes = useStyles();

  const handleChangeUser = (e) => {
    setUser(e.target.value);
    changeUser(e.target.value);
  };
  return (
    <div className={styles.root}>
      <Container maxWidth='xl'>
        <Toolbar className={styles.toolbar}>
          <Link to='/' className={styles.logo}>Garage Sales</Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
            {(getUser.loggedIn === true || getUser.admin === true) && <Link to='/post/add' component={Button}>New post</Link>}
            <Select
              native
              value={user}
              onChange={(e) => handleChangeUser(e)}
            >
              <option value={'loggedOut'}>Logged out</option>
              <option value={'loggedIn'}>Logged in</option>
              <option value={'admin'}>Admin</option>
            </Select>
          </div>
        </Toolbar>
      </Container>
    </div >
  );
};

Component.propTypes = {
  changeUser: PropTypes.func,
  getUser: PropTypes.object,
};

const mapStateToProps = state => ({
  getUser: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  changeUser: arg => dispatch(changeUser(arg)),
});

const ContainerFunc = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ContainerFunc as Header,
  Component as HeaderComponent,
};
