/* eslint-disable linebreak-style */
// selectors

export const getSearchString = (state) => state.searchString;

export const getPostsForSearchResults = (state, searchString) =>
  state.posts.data.products.filter(post => searchString !== '' &&
    new RegExp(searchString, 'i').test(post.title) && post.status === 'published'
  );


// action name creator

const reducerName = 'searchString';
const createActionName = name => `app/${reducerName}/${name}`;

// actions types

export const SEARCH_STRING = createActionName('CHANGE');

// action creators

export const changeSearchString = payload => ({ payload, type: SEARCH_STRING });

// reducer

export function reducer(statePart = '', action = {}) {
  switch (action.type) {
    case SEARCH_STRING:
      return action.payload;
    default:
      return statePart;
  }
}