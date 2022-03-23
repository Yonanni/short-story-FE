import { Dispatch } from "redux";
import { ReduxStore } from "../../typings/ReduxStore";
import {
  FILL_AUTHORIZATION_HEADER,
  LOADING_AUTHORIZATION_HEADER,
  ERROR_AUTHORIZATION_HEADER,
} from "./actionTypes";
import axios from "axios";
import { LoginInfo } from "../../typings/LoginInfo";

export const getAuthorizationHeaderAction = (
  loginInfo: LoginInfo,
  historyPush: (location: string) => void
) => {
  return async (dispatch: Dispatch, getState: () => ReduxStore) => {
    try {
      dispatch({
        type: ERROR_AUTHORIZATION_HEADER,
        payload: "",
      });
      dispatch({
        type: LOADING_AUTHORIZATION_HEADER,
        payload: true,
      });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/authors/login`,
        loginInfo
      );

      if (response.status === 200) {
        dispatch({
          type: FILL_AUTHORIZATION_HEADER,
          payload: response.data.accessToken,
        });
        dispatch({
          type: LOADING_AUTHORIZATION_HEADER,
          payload: false,
        });
        historyPush("/me");
      } else {
        dispatch({
          type: ERROR_AUTHORIZATION_HEADER,
          payload: response.data.message,
        });
        dispatch({
          type: LOADING_AUTHORIZATION_HEADER,
          payload: false,
        });
      }
    } catch (error: any) {
      dispatch({
        type: ERROR_AUTHORIZATION_HEADER,
        payload: error.message,
      });
      dispatch({
        type: LOADING_AUTHORIZATION_HEADER,
        payload: false,
      });
    }
  };
};
