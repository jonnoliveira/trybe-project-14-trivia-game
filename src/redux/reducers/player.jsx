import {
  ADD_ASSERTIONS,
  ADD_SRC, ADD_SCORE,
  ADD_INDEX,
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
} from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  src: '',
  index: 0,
  category: '',
  difficulty: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case ADD_SRC:
    return {
      ...state,
      src: action.payload,
    };
  case ADD_INDEX:
    return {
      ...state,
      index: action.payload,
    };
  case CHANGE_CATEGORY:
    return {
      ...state,
      category: action.category,
    };
  case CHANGE_DIFFICULTY:
    return {
      ...state,
      difficulty: action.difficulty,
    };
  default:
    return state;
  }
};

export default player;
