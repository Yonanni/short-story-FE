import { AnyAction } from "redux";
import {
  FILL_AUTHOR_STORIES,
  LOADING_AUTHOR_STORIES,
  ERROR_AUTHOR_STORIES,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const authorStoriesReducer = (
  state = initialState.authorStories,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_AUTHOR_STORIES:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_AUTHOR_STORIES:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_AUTHOR_STORIES:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
