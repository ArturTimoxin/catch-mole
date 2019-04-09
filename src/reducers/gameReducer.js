import {SCORE_INCREMENT} from '../constants/constants';

const initialState = {
    score: 0,
    difficult: 1,
    time: 2000,
};

export function gameReducer(state = initialState, action) {
    switch (action.type) {
      case SCORE_INCREMENT: {
        return { ...state, score: this.score++ };
      }
      default:
        return state;
    }
  }