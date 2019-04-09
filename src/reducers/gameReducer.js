import {SET_SCORE, ADD_DIFFICULTY_LEVEL} from '../constants/constants';

const initialState = {
    score: 0,
    difficult: 0,
    time: 2000,
};

export function gameReducer(state = initialState, action) {
    switch (action.type) {
      case SET_SCORE: {
        return { ...state, score: action.payload};
      }
      case ADD_DIFFICULTY_LEVEL: {
        return { ...state, difficult: action.payload.difficult, time: action.payload.time};
      }
      default:
        return state;
    }
  }