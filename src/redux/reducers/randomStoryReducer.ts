import { AnyAction } from "redux";
import {
  FILL_RANDOM_STORY,
  LOADING_RANDOM_STORY,
  ERROR_RANDOM_STORY,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const randomStoryReducer = (
  state = initialState.randomStory,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_RANDOM_STORY:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_RANDOM_STORY:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_RANDOM_STORY:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
