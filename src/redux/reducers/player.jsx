import { ADD_ASSERTIONS, ADD_SCORE, ADD_GRAVATAR, ADD_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_ASSERTIONS: return {
    ...state,
    assertions: action.payload };
  case ADD_SCORE: return {
    ...state,
    score: action.payload };
  case ADD_GRAVATAR: return {
    ...state,
    gravatarEmail: action.payload };
  case ADD_PLAYER: return {
    ...state,
    name: action.payload };
  default:
    return state;
  }
};

export default player;
