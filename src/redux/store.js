import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { initialState } from './initialState';
import { reducer as postsReducer } from './postsRedux';
import { reducer as usersReducer } from './usersRedux';
import { reducer as searchStringReducer } from './searchStringRedux';

// define reducers
const reducers = {
  posts: postsReducer,
  users: usersReducer,
  searchString: searchStringReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  initialState,
  applyMiddleware(thunk)
);
