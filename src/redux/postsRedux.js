import Axios from 'axios';

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
export const getOnePostData = ({ posts }) => posts.data.onePost;

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
const FETCH_ONE_POST = createActionName('FETCH_ONE_POST');
const DELETE_POST = createActionName('DELETE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const addCategory = payload => ({ payload, type: ADD_CATEGORY });
export const removeCategory = payload => ({ payload, type: REMOVE_CATEGORY });
export const editPost = payload => ({ payload, type: EDIT_POST });
export const fetchOnePost = payload => ({ payload, type: FETCH_ONE_POST });
export const deletePost = payload => ({ payload, type: FETCH_ONE_POST });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    if (getState().posts.data.products.length < 1 && getState().posts.loading.active === false) {
      dispatch(fetchStarted());

      Axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchPost = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchOnePost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchAddPost = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .post(`http://localhost:8000/api/posts/add`, data)
      .then(res => {
        dispatch(addPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchEditPost = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .put(`http://localhost:8000/api/posts/${data._id}/edit`, data)
      .then(res => {
        dispatch(editPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchDeletePost = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .delete(`http://localhost:8000/api/posts/${id}/delete`)
      .then(res => {
        dispatch(deletePost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

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
          categories: [],
          onePost: {},
        },
      };
    }
    case DELETE_POST: {
      return {
        ...statePart,
        data: {
          products:[
            ...statePart.data.products.filter(data => data._id !== action.payload._id),
          ],
          categories: [],
          onePost: {},
        },
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: {
          products: [
            ...statePart.data.products.map((data) => {
              if (data._id === action.payload._id) {
                return action.payload;
              }
              else {
                return data;
              }
            }),
          ],
          categories: [],
          onePost: statePart.data.onePost,
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
        data: {
          products: action.payload,
          categories: [],
          onePost: statePart.data.onePost,
        },
      };
    }
    case FETCH_ONE_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: {
          ...statePart.data,
          onePost: action.payload,
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
