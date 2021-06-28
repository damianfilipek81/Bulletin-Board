export const initialState = {
  posts: {
    data: {
      products: [],
      categories: [],
      onePost: {},
      myPosts: [],
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
