import { Dispatch } from "redux";
import { ReduxStore } from "../../typings/ReduxStore";
import { FILL_STORY, LOADING_STORY, ERROR_STORY } from "./actionTypes";
import axios from "axios";

export const getStoryAction = (storyId: string) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_STORY,
        payload: "",
      });
      dispatch({
        type: LOADING_STORY,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/stories/${storyId}`
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_STORY,
          payload: response.data,
        });
        dispatch({
          type: LOADING_STORY,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_STORY,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_STORY,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_STORY,
        payload: error.message,
      });
      dispatch({
        type: LOADING_STORY,
        payload: false,
      });
    }
  };
};
