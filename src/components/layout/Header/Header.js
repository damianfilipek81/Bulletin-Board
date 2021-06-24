import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SearchBar } from '../../features/SearchBar/SearchBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './Header.module.scss';

import { connect } from 'react-redux';
import { changeUser, getAll } from '../../../redux/usersRedux';

const Component = ({ changeUser, getUser }) => {
  const [user, setUser] = useState('loggedIn');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Select
              native
              value={user}
              onChange={(e) => handleChangeUser(e)}
            >
              <option value={'loggedOut'}>Logged out</option>
              <option value={'loggedIn'}>Logged in</option>
              <option value={'admin'}>Admin</option>
            </Select>
            {(getUser.loggedIn === true || getUser.admin === true) ?
              <div>
                <Button variant="contained" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  Menu
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  autoFocus={false}
                >
                  {(getUser.loggedIn === true || getUser.admin === true) && <MenuItem><Link to='/post/add' onClick={handleClose}>New post</Link></MenuItem>}
                  {(getUser.loggedIn === true || getUser.admin === true) && <MenuItem><Link to={`/posts/my-posts`} onClick={handleClose}>My posts</Link></MenuItem>}
                  {(getUser.loggedIn === true || getUser.admin === true) && <MenuItem><Link to={`/`} onClick={handleClose}>Logout</Link></MenuItem>}
                </Menu>
              </div>
              :
              <Link variant="contained" component={Button} to={{ pathname: 'https://google.com' }} target="_blank">Login</Link>
            }
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
