import { Dispatch } from "redux";
import { ReduxStore } from "../../typings/ReduxStore";
import { FILL_AUTHORS, LOADING_AUTHORS, ERROR_AUTHORS } from "./actionTypes";
import axios from "axios";

export const getAuthorsAction = () => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_AUTHORS,
        payload: "",
      });
      dispatch({
        type: LOADING_AUTHORS,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/authors`
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_AUTHORS,
          payload: response.data,
        });
        dispatch({
          type: LOADING_AUTHORS,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_AUTHORS,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_AUTHORS,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_AUTHORS,
        payload: error.message,
      });
      dispatch({
        type: LOADING_AUTHORS,
        payload: false,
      });
    }
  };
};
