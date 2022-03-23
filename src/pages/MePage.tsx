import PresentationPanel from "../components/PresentationPanel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import { getMeAction } from "../redux/actions/getMeAction";
import { getMyStoriesAction } from "../redux/actions/getMyStoriesAction";
import { getHeartedStories } from "../redux/actions/getHeartedStories";
import { useHistory } from "react-router";
import Loader from "../components/Loader";
import StoryContainer from "../components/StoryContainer";
import { ButtonGroup, Button, Alert } from "react-bootstrap";

export default function MePage() {
  const [stories, setStories] = useState<boolean>(true);

  const authorizationHeader = useSelector(
    (state: ReduxStore) => state.authorizationHeader
  );
  const me = useSelector((state: ReduxStore) => state.me);
  const myStories = useSelector((state: ReduxStore) => state.myStories);
  const heartedStories = useSelector(
    (state: ReduxStore) => state.heartedStories
  );

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(getMeAction(authorizationHeader.config, history.push));
    dispatch(getMyStoriesAction(authorizationHeader.config));
    dispatch(getHeartedStories(authorizationHeader.config));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <PresentationPanel author={me.data} />
      <div className="my-stories general-container p-4 mb-4 d-flex justify-content-center">
        <ButtonGroup aria-label="Basic example">
          <Button
            className={stories ? "background-gradient active-page" : ""}
            variant="outline-dark"
            onClick={() => setStories(true)}
          >
            My Stories
          </Button>
          <Button
            className={stories ? "" : "background-gradient active-page"}
            variant="outline-dark"
            onClick={() => setStories(false)}
          >
            Hearted Stories
          </Button>
        </ButtonGroup>
      </div>
      {stories ? (
        <>
          {myStories.loading ? (
            <Loader />
          ) : myStories.error ? (
            <Alert variant="danger">{myStories.error}</Alert>
          ) : (
            myStories.data.map((story, i) => (
              <StoryContainer key={i} story={story} />
            ))
          )}
        </>
      ) : (
        <>
          {heartedStories.loading ? (
            <Loader />
          ) : heartedStories.error ? (
            <Alert variant="danger">{heartedStories.error}</Alert>
          ) : (
            heartedStories.data.map((story, i) => (
              <StoryContainer key={i} story={story} />
            ))
          )}
        </>
      )}
    </div>
  );
}
