import { Dispatch } from "redux";
import { ReduxStore } from "../../typings/ReduxStore";
import { FILL_AUTHOR, LOADING_AUTHOR, ERROR_AUTHOR } from "./actionTypes";
import axios from "axios";

export const getAuthorAction = (authorId: string) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_AUTHOR,
        payload: "",
      });
      dispatch({
        type: LOADING_AUTHOR,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/authors/${authorId}`
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_AUTHOR,
          payload: response.data,
        });
        dispatch({
          type: LOADING_AUTHOR,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_AUTHOR,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_AUTHOR,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_AUTHOR,
        payload: error.message,
      });
      dispatch({
        type: LOADING_AUTHOR,
        payload: false,
      });
    }
  };
};
