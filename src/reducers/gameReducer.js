import {SET_SCORE, ADD_DIFFICULTY_LEVEL, SET_COUNT_FAILS} from '../constants/constants';

const initialState = {
    score: 0,
    difficult: 0,
    time: 2000,
    countFails: 0,
};

export function gameReducer(state = initialState, action) {
    switch (action.type) {
      case SET_SCORE: {
        return { ...state, score: action.payload.score};
      }
      case ADD_DIFFICULTY_LEVEL: {
        return { ...state, difficult: action.payload.difficult, time: action.payload.time};
      }
      case SET_COUNT_FAILS: {
        return { ...state, countFails: action.payload.countFails};
      }
      default:
        return state;
    }
  }