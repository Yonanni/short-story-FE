import { AnyAction } from "redux";
import {
  FILL_MY_STORIES,
  LOADING_MY_STORIES,
  ERROR_MY_STORIES,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const myStoriesReducer = (
  state = initialState.myStories,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_MY_STORIES:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_MY_STORIES:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_MY_STORIES:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
