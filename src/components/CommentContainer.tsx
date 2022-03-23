import { Image, Row, Col, Button } from "react-bootstrap";
import { Comment } from "../typings/Comment";
import { format, parseISO } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { getCommentsAction } from "../redux/actions/getCommentsAction";
import Loader from "./Loader";

interface CommentContainerProps {
  comment: Comment; //comments
}

export default function CommentContainer({ comment }: CommentContainerProps) {
  const [loading, setLoading] = useState(false);

  const me = useSelector((state: ReduxStore) => state.me.data);
  const config = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleCommentDeletion = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/comments/${comment._id}/me`,
        config
      );
      if (response.status === 200) {
        dispatch(getCommentsAction(comment.story));
        setLoading(false);
      } else {
        setLoading(false);
        history.push("/login");
      }
    } catch (error) {
      setLoading(false);
      history.push("/login");
    }
  };

  return (
    <Row className="justify-content-end">
      <Col xs={11} className="general-container comments p-4 mb-4 d-flex">
        <Image
          className="me-4"
          src={comment?.author.avatar}
          style={{ maxHeight: "5rem", maxWidth: "5rem" }}
          roundedCircle
          fluid
        />
        <div className="d-flex flex-column w-100">
          <div className="d-flex justify-content-between">
            <h5>{comment?.author.name}</h5>
            {me?._id === comment.author._id && (
              <div>
                <Button variant="danger" onClick={handleCommentDeletion}>
                  Delete comment
                </Button>
                {loading && <Loader />}
              </div>
            )}
          </div>
          <p>{comment?.comment}</p>
          <p className="align-self-end mb-4">
            <em>{format(parseISO(comment?.createdAt), "PPpp")}</em>
          </p>
        </div>
      </Col>
    </Row>
  );
}
