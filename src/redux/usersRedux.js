/* eslint-disable linebreak-style */
/* selectors */
export const getAll = ({ users }) => users;
/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;
/* action types */
const CHANGE_USER = createActionName('CHANGE_USER');
/* action creators */
export const changeUser = payload => ({ payload, type: CHANGE_USER });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case CHANGE_USER: {
      switch (action.payload) {
        case 'admin': {
          return {
            loggedOut: false,
            loggedIn: false,
            admin: true,
            email: statePart.email,
          };
        }
        case 'loggedIn': {
          return {
            loggedOut: false,
            loggedIn: true,
            admin: false,
            email: statePart.email,
          };
        }
        case 'loggedOut': {
          return {
            loggedOut: true,
            loggedIn: false,
            admin: false,
            email: statePart.email,
          };
        }
        default:
          return statePart;
      }
    }
    default:
      return statePart;
  }
};
