import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, FormEvent, useEffect } from "react";
import { getStoryAction } from "../redux/actions/getStoryAction";
import { getCommentsAction } from "../redux/actions/getCommentsAction";
import { ReduxStore } from "../typings/ReduxStore";
import StoryContainer from "../components/StoryContainer";
import {
  Form,
  Row,
  Col,
  Container,
  FloatingLabel,
  Button,
  Alert,
} from "react-bootstrap";
import Loader from "../components/Loader";
import CommentContainer from "../components/CommentContainer";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface MatchParams {
  storyId: string;
}

export default function SingleStoryPage() {
  const [submitComment, setSubmitComment] = useState({
    error: "",
    loading: false,
  });
  const [comment, setComment] = useState("");

  const story = useSelector((state: ReduxStore) => state.story);
  const comments = useSelector((state: ReduxStore) => state.comments);
  const config = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config
  );

  const params = useRouteMatch<MatchParams>().params;
  const storyId = params.storyId;

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmitComment({ error: "", loading: true });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/comments/story/${storyId}`,
        { comment },
        config
      );
      if (response.status === 201) {
        dispatch(getCommentsAction(storyId));
        setSubmitComment({ error: "", loading: false });
      } else {
        setSubmitComment({ error: response.data.message, loading: false });
        history.push("/login");
      }
    } catch (error: any) {
      setSubmitComment({ error: error.message, loading: false });
      history.push("/login");
    }
  };

  useEffect(() => {
    dispatch(getStoryAction(storyId));
    dispatch(getCommentsAction(storyId));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {story.loading ? (
        <Loader />
      ) : story.error ? (
        <Alert variant="danger">{story.error}</Alert>
      ) : (
        <StoryContainer story={story.data} />
      )}
      <Container>
        <Form onSubmit={handleSubmitComment}>
          <Row className="general-container p-4 mb-4">
            <Col xs={12} md={8} lg={10} className="mb-2">
              <FloatingLabel label="Post a comment">
                <Form.Control
                  as="textarea"
                  value={comment}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                  }
                />
              </FloatingLabel>
            </Col>
            <Col
              xs={12}
              md={4}
              lg={2}
              className="d-grid"
              style={{ maxHeight: "58px" }}
            >
              <Button
                className="background-gradient"
                variant="outline-dark"
                type="submit"
              >
                Comment
              </Button>
            </Col>
            {submitComment.loading ? (
              <Loader />
            ) : (
              submitComment.error && (
                <Alert variant="danger">{submitComment.error}</Alert>
              )
            )}
          </Row>
        </Form>
      </Container>
      {comments.loading ? (
        <Loader />
      ) : comments.error ? (
        <Alert variant="danger">{comments.error}</Alert>
      ) : (
        comments.data.map((c, i) => <CommentContainer key={i} comment={c} />)
      )}
    </div>
  );
}
