import { ADD_ASSERTIONS, ADD_SCORE, ADD_GRAVATAR,
  ADD_PLAYER } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_ASSERTIONS: return {
    ...state,
    player: { ...state.player, assertions: action.payload },
  };
  case ADD_SCORE: return {
    ...state,
    player: { ...state.player, score: action.payload },
  };
  case ADD_GRAVATAR: return {
    ...state,
    player: { ...state.player, gravatarEmail: action.payload },
  };
  case ADD_PLAYER: return {
    ...state,
    player: { ...state.player, name: action.payload },
  };
  default:
    return state;
  }
};

export default gameReducer;
