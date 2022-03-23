import { Dispatch } from "redux";
import { ReduxStore } from "../../typings/ReduxStore";
import {
  FILL_RANDOM_STORY,
  LOADING_RANDOM_STORY,
  ERROR_RANDOM_STORY,
} from "./actionTypes";
import axios from "axios";

export const getRandomStoryAction = () => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_RANDOM_STORY,
        payload: "",
      });
      dispatch({
        type: LOADING_RANDOM_STORY,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/stories/random`
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_RANDOM_STORY,
          payload: response.data,
        });
        dispatch({
          type: LOADING_RANDOM_STORY,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_RANDOM_STORY,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_RANDOM_STORY,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_RANDOM_STORY,
        payload: error.message,
      });
      dispatch({
        type: LOADING_RANDOM_STORY,
        payload: false,
      });
    }
  };
};
