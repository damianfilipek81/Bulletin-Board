import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SearchBar } from '../../features/SearchBar/SearchBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import styles from './Header.module.scss';

import { connect } from 'react-redux';
import { changeUser, getAll } from '../../../redux/usersRedux';

const Component = ({ changeUser, getUser }) => {
  const [user, setUser] = useState('loggedIn');

  const handleChangeUser = (e) => {
    setUser(e.target.value);
    changeUser(e.target.value);
  };

  
  return (
    <div className={styles.root}>
      <Container maxWidth='xl'>
        <Toolbar className={styles.toolbar}>
          <div className={styles.wrapper}>
            <Link to='/' className={styles.logo}>Garage Sales</Link>
          </div>
          <SearchBar />
          <div className={styles.wrapper}>
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
