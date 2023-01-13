import { ADD_ASSERTIONS, ADD_SCORE, ADD_DIFF } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  difficulty: '',
  correct: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_ASSERTIONS: return {
    ...state,
    assertions: action.payload,
  };
  case ADD_SCORE: return {
    ...state,
    player: { ...state.player, score: action.payload },
  };
  case ADD_DIFF: return {
    ...state,
    difficulty: action.payload.difficulty,
    correct: action.payload.correct,
  };
  default:
    return state;
  }
};

export default gameReducer;
