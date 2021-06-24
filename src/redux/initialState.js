export const initialState = {
  posts: {
    data: {
      products: [],
      categories: [],
      onePost: [],
    },
    loading: {
      active: false,
      error: false,
    },
  },
  users: {
    loggedOut: false,
    loggedIn: true,
    admin: false,
    email: 'damianfilipek@gmail.com',
  },
  searchString: '',
};
