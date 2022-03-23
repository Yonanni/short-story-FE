import { AnyAction } from "redux";
import {
  FILL_HEARTED_STORIES,
  LOADING_HEARTED_STORIES,
  ERROR_HEARTED_STORIES,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const heartedStoriesReducer = (
  state = initialState.heartedStories,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_HEARTED_STORIES:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_HEARTED_STORIES:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_HEARTED_STORIES:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
