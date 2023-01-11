// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_NAME = 'ADD_NAME';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const addName = (name) => ({
  type: ADD_EMAIL,
  name,
});
