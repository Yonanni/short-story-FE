import { AnyAction } from "redux";
import { FILL_STORY, LOADING_STORY, ERROR_STORY } from "../actions/actionTypes";
import initialState from "../initialState";

export const storyReducer = (state = initialState.story, action: AnyAction) => {
  switch (action.type) {
    case FILL_STORY:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING_STORY:
      return {
        ...state,
        loading: action.payload,
      };
    case ERROR_STORY:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
