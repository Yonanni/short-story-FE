import PresentationPanel from "../components/PresentationPanel";
import { Alert } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import { useRouteMatch } from "react-router";
import Loader from "../components/Loader";
import StoryContainer from "../components/StoryContainer";
import { getAuthorAction } from "../redux/actions/getAuthorAction";
import { getAuthorStoriesAction } from "../redux/actions/getAuthorStoriesAction";

interface MatchParams {
  authorId: string;
}

export default function SingleAuthorPage() {
  const author = useSelector((state: ReduxStore) => state.author);
  const authorStories = useSelector((state: ReduxStore) => state.authorStories);

  const dispatch = useDispatch();

  const params = useRouteMatch<MatchParams>().params;
  const authorId = params.authorId;

  useEffect(() => {
    dispatch(getAuthorAction(authorId));
    dispatch(getAuthorStoriesAction(authorId));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <PresentationPanel author={author.data} />
      {authorStories.loading ? (
        <Loader />
      ) : authorStories.error ? (
        <Alert variant="danger">{authorStories.error}</Alert>
      ) : (
        authorStories.data.map((story, i) => (
          <StoryContainer key={i} story={story} />
        ))
      )}
    </div>
  );
}
