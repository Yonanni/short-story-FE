import { Dispatch } from "redux";
import { ReduxStore } from "../../typings/ReduxStore";
import { FILL_COMMENTS, LOADING_COMMENTS, ERROR_COMMENTS } from "./actionTypes";
import axios from "axios";

export const getCommentsAction = (storyId: string) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_COMMENTS,
        payload: "",
      });
      dispatch({
        type: LOADING_COMMENTS,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/comments/story/${storyId}`
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_COMMENTS,
          payload: response.data,
        });
        dispatch({
          type: LOADING_COMMENTS,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_COMMENTS,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_COMMENTS,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_COMMENTS,
        payload: error.message,
      });
      dispatch({
        type: LOADING_COMMENTS,
        payload: false,
      });
    }
  };
};
