import { AnyAction } from "redux";
import {
  FILL_STORIES,
  LOADING_STORIES,
  ERROR_STORIES,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const storiesReducer = (
  state = initialState.stories,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_STORIES:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_STORIES:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_STORIES:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
