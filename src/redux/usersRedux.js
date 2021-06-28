/* eslint-disable linebreak-style */
import Axios from 'axios';

/* selectors */
export const getAll = ({ users }) => users;
/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;
/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const CHANGE_USER = createActionName('CHANGE_USER');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const changeUser = payload => ({ payload, type: CHANGE_USER });

/* thunk creators */
export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/user/logged')
      .then(res => {
        dispatch(changeUser(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};
/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case CHANGE_USER: {
      return {
        logged: action.payload.logged,
        email: action.payload.email,
        name: action.payload.name,
        id: action.payload.id,
      };
    }
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
