import { AnyAction } from "redux";
import {
  FILL_COMMENTS,
  LOADING_COMMENTS,
  ERROR_COMMENTS,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const commentsReducer = (
  state = initialState.comments,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_COMMENTS:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_COMMENTS:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_COMMENTS:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
