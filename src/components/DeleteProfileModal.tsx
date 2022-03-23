import { Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../redux/actions/logoutAction";
import Loader from "./Loader";

interface DeleteProfileModalProps {
  show: boolean;
  onHide: () => void;
}

export default function DeleteProfileModal(props: DeleteProfileModalProps) {
  const [deleteProfile, setDeleteProfile] = useState({
    error: "",
    loading: false,
  });

  const config = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleProfileDeletion = async () => {
    try {
      setDeleteProfile({ error: "", loading: true });
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/authors/me`,
        config
      );
      if (response.status === 200) {
        setDeleteProfile({ error: "", loading: false });
        history.push("/register");
        dispatch(logoutAction());
      } else {
        setDeleteProfile({ error: response.data.message, loading: false });
        history.push("/login");
      }
    } catch (error: any) {
      setDeleteProfile({ error: error.message, loading: false });
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
        {deleteProfile.loading ? (
          <Loader />
        ) : (
          deleteProfile.error && (
            <Alert variant="danger">{deleteProfile.error}</Alert>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
}
