import { Dispatch } from "redux";
import { AuthorizationHeader, ReduxStore } from "../../typings/ReduxStore";
import {
  FILL_HEARTED_STORIES,
  LOADING_HEARTED_STORIES,
  ERROR_HEARTED_STORIES,
} from "./actionTypes";
import axios from "axios";

export const getHeartedStories = (config: AuthorizationHeader["config"]) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_HEARTED_STORIES,
        payload: "",
      });
      dispatch({
        type: LOADING_HEARTED_STORIES,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/stories/hearts`,
        config
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_HEARTED_STORIES,
          payload: response.data,
        });
        dispatch({
          type: LOADING_HEARTED_STORIES,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_HEARTED_STORIES,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_HEARTED_STORIES,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_HEARTED_STORIES,
        payload: error.message,
      });
      dispatch({
        type: LOADING_HEARTED_STORIES,
        payload: false,
      });
    }
  };
};
