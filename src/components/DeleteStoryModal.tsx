import { Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { getStoriesAction } from "../redux/actions/getStoriesAction";
import { getMyStoriesAction } from "../redux/actions/getMyStoriesAction";
import { getHeartedStories } from "../redux/actions/getHeartedStories";

interface DeleteStoryModalProps {
  show: boolean;
  onHide: () => void;
  storyid: string | undefined;
}

export default function DeleteStoryModal(props: DeleteStoryModalProps) {
  const [deleteStory, setDeleteStory] = useState({
    error: "",
    loading: false,
  });

  const config = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const handleProfileDeletion = async () => {
    try {
      setDeleteStory({ error: "", loading: true });
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/stories/${props.storyid}/me`,
        config
      );
      if (response.status === 200) {
        setDeleteStory({ error: "", loading: false });
        dispatch(getStoriesAction("", ""));
        dispatch(getMyStoriesAction(config));
        dispatch(getHeartedStories(config));
        props.onHide();
      } else {
        setDeleteStory({ error: response.data.message, loading: false });
        history.push("/login");
      }
    } catch (error: any) {
      setDeleteStory({ error: error.message, loading: false });
      history.push("/login");
    }
  };
  return (
    <Modal {...props} size="lg" aria-labelledby="edit-profile-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="edit-profile-modal">Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>This is irreversible!</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onHide}>
          I'm not sure.
        </Button>
        <Button variant="danger" onClick={handleProfileDeletion}>
          I'm Sure.
        </Button>
        {deleteStory.loading ? (
          <Loader />
        ) : (
          deleteStory.error && (
            <Alert variant="danger">{deleteStory.error}</Alert>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
}
