import { Dispatch } from "redux";
import { ReduxStore } from "../../typings/ReduxStore";
import { FILL_COMMENT, LOADING_COMMENT, ERROR_COMMENT } from "./actionTypes";
import axios from "axios";

export const getCommentAction = (commentId: string) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_COMMENT,
        payload: "",
      });
      dispatch({
        type: LOADING_COMMENT,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/comments/${commentId}`
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_COMMENT,
          payload: response.data,
        });
        dispatch({
          type: LOADING_COMMENT,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_COMMENT,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_COMMENT,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_COMMENT,
        payload: error.message,
      });
      dispatch({
        type: LOADING_COMMENT,
        payload: false,
      });
    }
  };
};
