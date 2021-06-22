import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Post } from './components/views/Post/Post';
import { PostEdit } from './components/views/PostEdit/PostEdit';
import { PostAdd } from './components/views/PostAdd/PostAdd';
import { NotFound } from './components/views/NotFound/NotFound';

import { connect } from 'react-redux';
import { getAll } from './redux/usersRedux';
import PropTypes from 'prop-types';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = ({ getUser }) => {
  const { admin, loggedIn } = getUser;

  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/post/add' component={admin === true || loggedIn === true ? PostAdd : NotFound} />
              <Route exact path='/post/:id' component={Post} />
              <Route exact path='/post/:id/edit' component={admin === true || loggedIn === true? PostEdit : NotFound} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

App.propTypes = {
  getUser: PropTypes.object,
};

const mapStateToProps = state => ({
  getUser: getAll(state),
});

const Container = connect(mapStateToProps)(App);
export { Container as App };
