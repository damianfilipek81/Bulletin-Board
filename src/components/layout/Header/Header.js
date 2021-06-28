import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SearchBar } from '../../features/SearchBar/SearchBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './Header.module.scss';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/usersRedux';

const Component = ({ getUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            {getUser.logged ?
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
                  {<MenuItem><Link to='/post/add' onClick={handleClose}>New post</Link></MenuItem>}
                  {<MenuItem><Link to={'/posts/my-posts'} onClick={handleClose}>My posts</Link></MenuItem>}
                  {<MenuItem><a href={'/auth/logout'}>Logout</a></MenuItem>}
                </Menu>
              </div>
              :
              <Link variant="contained" component={Button} to={'/auth/google'}>Login</Link>
            }
          </div>

        </Toolbar>
      </Container>
    </div >
  );
};

Component.propTypes = {
  fetchUser: PropTypes.func,
  getUser: PropTypes.object,
};

const mapStateToProps = state => ({
  getUser: getAll(state),
});


const ContainerFunc = connect(mapStateToProps)(Component);

export {
  ContainerFunc as Header,
  Component as HeaderComponent,
};
