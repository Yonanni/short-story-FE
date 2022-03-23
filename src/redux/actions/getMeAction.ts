import { Dispatch } from "redux";
import { AuthorizationHeader, ReduxStore } from "../../typings/ReduxStore";
import { FILL_ME, LOADING_ME, ERROR_ME } from "./actionTypes";
import axios from "axios";

export const getMeAction = (
  config: AuthorizationHeader["config"],
  historyPush: (location: string) => void
) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_ME,
        payload: "",
      });
      dispatch({
        type: LOADING_ME,
        payload: true,
      });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/authors/me`,
        config
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_ME,
          payload: response.data,
        });
        dispatch({
          type: LOADING_ME,
          payload: false,
        });
      } else {
        dispatch({
          type: ERROR_ME,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_ME,
          payload: false,
        });
        historyPush("/login");
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_ME,
        payload: error.message,
      });
      dispatch({
        type: LOADING_ME,
        payload: false,
      });
      historyPush("/login");
    }
  };
};
