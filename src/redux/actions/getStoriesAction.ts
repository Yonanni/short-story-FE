import { Dispatch } from "redux";
import { ReduxStore } from "../../typings/ReduxStore";
import { FILL_STORIES, LOADING_STORIES, ERROR_STORIES } from "./actionTypes";
import axios from "axios";

export const getStoriesAction = (title: string, category: string) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_STORIES,
        payload: "",
      });
      dispatch({
        type: LOADING_STORIES,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/stories?title=${title}&category=${category}`
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_STORIES,
          payload: response.data,
        });
        dispatch({
          type: LOADING_STORIES,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_STORIES,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_STORIES,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_STORIES,
        payload: error.message,
      });
      dispatch({
        type: LOADING_STORIES,
        payload: false,
      });
    }
  };
};
