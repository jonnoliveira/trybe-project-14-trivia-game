// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_NAME = 'ADD_NAME';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_SRC = 'ADD_HASH';
export const ADD_INDEX = 'ADD_INDEX';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const addName = (name) => ({
  type: ADD_NAME,
  payload: name,
});

export const addAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: assertions,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: score,
});

export const addSrc = (src) => ({
  type: ADD_SRC,
  payload: src,
});

export const addIndex = (index) => ({
  type: ADD_INDEX,
  payload: index,
});

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  category,
});

export const changeDifficulty = (difficulty) => ({
  type: CHANGE_DIFFICULTY,
  difficulty,
});
