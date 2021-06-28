/* eslint-disable linebreak-style */
export const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api';
export const USER_URL = process.env.NODE_ENV === 'production' ? '/user' : 'http://localhost:8000/user';