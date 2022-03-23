import { AnyAction } from "redux";
import {
  FILL_AUTHORS,
  LOADING_AUTHORS,
  ERROR_AUTHORS,
} from "../actions/actionTypes";
import initialState from "../initialState";

export const authorsReducer = (
  state = initialState.authors,
  action: AnyAction
) => {
  switch (action.type) {
    case FILL_AUTHORS:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_AUTHORS:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_AUTHORS:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
