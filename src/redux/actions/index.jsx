// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_NAME = 'ADD_NAME';
export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_GRAVATAR = 'ADD_GRAVATAR';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_DIFF = 'DIFF';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const addName = (name) => ({
  type: ADD_NAME,
  payload: name,
});

export const addPlayer = (name) => ({
  type: ADD_PLAYER,
  payload: name,
});

export const addGravatar = (gravatarEmail) => ({
  type: ADD_GRAVATAR,
  payload: gravatarEmail,
});

export const addAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: assertions,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: score,
});

export const addDiff = (obj) => ({
  type: ADD_DIFF,
  payload: obj,
});
