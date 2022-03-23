import { AnyAction } from "redux";
import {
  FILL_COMMENT,
  LOADING_COMMENT,
  ERROR_COMMENT,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const commentReducer = (
  state = initialState.comment,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_COMMENT:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_COMMENT:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_COMMENT:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
