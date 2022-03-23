import { AnyAction } from "redux";
import {
  FILL_AUTHOR,
  LOADING_AUTHOR,
  ERROR_AUTHOR,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const authorReducer = (
  state = initialState.author,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_AUTHOR:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_AUTHOR:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_AUTHOR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
