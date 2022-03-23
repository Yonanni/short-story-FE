import { Dispatch } from "redux";
import { AuthorizationHeader, ReduxStore } from "../../typings/ReduxStore";
import {
  FILL_MY_STORIES,
  LOADING_MY_STORIES,
  ERROR_MY_STORIES,
} from "./actionTypes";
import axios from "axios";

export const getMyStoriesAction = (config: AuthorizationHeader["config"]) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_MY_STORIES,
        payload: "",
      });
      dispatch({
        type: LOADING_MY_STORIES,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/stories/me`,
        config
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_MY_STORIES,
          payload: response.data,
        });
        dispatch({
          type: LOADING_MY_STORIES,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_MY_STORIES,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_MY_STORIES,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_MY_STORIES,
        payload: error.message,
      });
      dispatch({
        type: LOADING_MY_STORIES,
        payload: false,
      });
    }
  };
};
