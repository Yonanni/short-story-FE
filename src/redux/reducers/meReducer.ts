import { AnyAction } from "redux";
import { FILL_ME, LOADING_ME, ERROR_ME } from "../actions/actionTypes";
import initialState from "../initialState";

export const meReducer = (state = initialState.me, action: AnyAction) => {
  switch (action.type) {
    case FILL_ME:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_ME:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_ME:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
