import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ReduxStore } from "../typings/ReduxStore";
import { getRandomStoryAction } from "../redux/actions/getRandomStoryAction";
import StoryContainer from "../components/StoryContainer";
import Loader from "../components/Loader";
import { Alert } from "react-bootstrap";

export default function RandomStoryPage() {
  const randomStory = useSelector((state: ReduxStore) => state.randomStory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRandomStoryAction());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {randomStory.loading ? (
        <Loader />
      ) : randomStory.error ? (
        <Alert variant="danger">{randomStory.error}</Alert>
      ) : (
        <StoryContainer story={randomStory.data} />
      )}
    </div>
  );
}
