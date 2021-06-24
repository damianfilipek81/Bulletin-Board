import React from 'react';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { SearchResults } from '../SearchResults/SearchResults';

import { connect } from 'react-redux';
import { changeSearchString, getSearchString, getPostsForSearchResults } from '../../../redux/searchStringRedux';

import styles from './SearchBar.module.scss';

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

const Component = ({ changeSearchString, results }) => {
  const classes = useStyles();
  return (
    <div className={styles.root}>
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
          onChange={(e) => changeSearchString(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <SearchResults results={results} />
    </div>
  );
};

Component.propTypes = {
  searchString: PropTypes.string,
  changeSearchString: PropTypes.func,
  results: PropTypes.array,
};

const mapStateToProps = state => ({
  searchString: getSearchString(state),
  results: getPostsForSearchResults(state, state.searchString),
});

const mapDispatchToProps = dispatch => ({
  changeSearchString: arg => dispatch(changeSearchString(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as SearchBar,
  Component as SearchBarComponent,
};
