import { ReduxStore } from "../../typings/ReduxStore";

const initialState: ReduxStore = {
  me: { data: null, loading: false, error: "" },
  authors: { data: [], loading: false, error: "" },
  author: { data: null, loading: false, error: "" },
  stories: { data: [], loading: false, error: "" },
  myStories: { data: [], loading: false, error: "" },
  heartedStories: { data: [], loading: false, error: "" },
  authorStories: { data: [], loading: false, error: "" },
  randomStory: { data: null, loading: false, error: "" },
  story: { data: null, loading: false, error: "" },
  comments: { data: [], loading: false, error: "" },
  comment: { data: null, loading: false, error: "" },
  authorizationHeader: {
    config: {
      headers: {
        Authorization: "",
      },
    },
    loading: false,
    error: "",
  },
};

export default initialState;
