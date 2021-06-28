export const initialState = {
  posts: {
    data: {
      products: [],
      categories: [],
      onePost: {},
    },
    loading: {
      active: false,
      error: false,
    },
  },
  users: {
    logged: false,
    email: '',
    id: '',
    name: '',
  },
  searchString: '',
};
