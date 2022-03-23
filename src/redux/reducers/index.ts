import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { authorsReducer } from "./authorsReducer";
import { meReducer } from "./meReducer";
import { authorReducer } from "./authorReducer";
import { storiesReducer } from "./storiesReducer";
import { myStoriesReducer } from "./myStoriesReducer";
import { heartedStoriesReducer } from "./heartedStoriesReducer";
import { authorStoriesReducer } from "./authorStoriesReducer";
import { randomStoryReducer } from "./randomStoryReducer";
import { storyReducer } from "./storyReducer";
import { commentsReducer } from "./commentsReducer";
import { commentReducer } from "./commentReducer";
import { authorizationHeaderReducer } from "./authorizationHeaderReducer";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENCRYPTED_PERSIST_KEY!,
    }),
  ],
};

const reducer = combineReducers({
  me: meReducer,
  authors: authorsReducer,
  author: authorReducer,
  stories: storiesReducer,
  myStories: myStoriesReducer,
  heartedStories: heartedStoriesReducer,
  authorStories: authorStoriesReducer,
  randomStory: randomStoryReducer,
  story: storyReducer,
  comments: commentsReducer,
  comment: commentReducer,
  authorizationHeader: authorizationHeaderReducer,
});

const persistingReducer = persistReducer(persistConfig, reducer);

export default persistingReducer;
