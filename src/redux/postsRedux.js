/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getCategories = ({ posts }) => posts.data.products.map(data => data.categories[0]);
export const getFilteredCategories = ({ posts }) => {
  const { products, categories } = posts.data;

  if (categories.length === 0) {
    return products.filter(product => product.status === 'published');
  } else if (categories.length > 0) {
    return products.filter(product => product.categories.every((category) => categories.includes(category)) && product.status === 'published');
  }
};
export const getPostData = ({ posts }, id) => posts.data.products.filter(data => data.id === id);

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const ADD_CATEGORY = createActionName('ADD_CATEGORY');
const REMOVE_CATEGORY = createActionName('REMOVE_CATEGORY');
const EDIT_POST = createActionName('EDIT_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const addCategory = payload => ({ payload, type: ADD_CATEGORY });
export const removeCategory = payload => ({ payload, type: REMOVE_CATEGORY });
export const editPost = payload => ({ payload, type: EDIT_POST });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...statePart,
        data: {
          products: [
            ...statePart.data.products, action.payload,
          ],
        },
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: {
          products: [
            ...statePart.data.products.map((data) => {
              if(data.id === action.payload.id){
                return action.payload;
              }
              else{
                return data;
              }
            }),
          ],
        },
      };
    }
    case ADD_CATEGORY: {
      return {
        ...statePart,
        data: {
          products: [
            ...statePart.data.products,
          ],
          categories: [
            ...statePart.data.categories, action.payload,
          ],
        },
      };
    }
    case REMOVE_CATEGORY: {
      return {
        ...statePart,
        data: {
          products: [
            ...statePart.data.products,
          ],
          categories: statePart.data.categories.filter(category => category !== action.payload),
        },
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
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
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
