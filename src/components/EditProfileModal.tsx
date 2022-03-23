import { Modal, Button, Form, FloatingLabel, Alert } from "react-bootstrap";
import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getMeAction } from "../redux/actions/getMeAction";
import Loader from "./Loader";
import { getMyStoriesAction } from "../redux/actions/getMyStoriesAction";
import { getHeartedStories } from "../redux/actions/getHeartedStories";

interface EditProfileModalProps {
  show: boolean;
  onHide: () => void;
}

interface ProfileDetails {
  name: string | undefined;
  birthDate: string | undefined;
  gender: string | undefined;
  bio: string | undefined;
}
export default function EditProfileModal(props: EditProfileModalProps) {
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    name: "",
    birthDate: "",
    gender: "",
    bio: "",
  });
  const [avatar, setAvatar] = useState<null | FileList>(null);

  const [edit, setEdit] = useState({ error: "", loading: false });

  const me = useSelector((state: ReduxStore) => state.me.data);
  const config = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config
  );
  const configHeader = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config.headers
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const handleDetailsChange = (key: string, value: string) => {
    setProfileDetails({ ...profileDetails, [key]: value });
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setEdit({ error: "", loading: true });
      const firstResponse = await axios.put(
        `${process.env.REACT_APP_API_URL}/authors/me`,
        profileDetails,
        config
      );

      if (firstResponse.status === 200) {
        if (avatar) {
          let formData = new FormData();
          formData.append("avatar", avatar[0]);
          const secondResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/authors/avatar`,
            formData,
            {
              headers: {
                ...configHeader,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (secondResponse.status === 200) {
            setEdit({ error: "", loading: false });
            dispatch(getMeAction(config, history.push));
            dispatch(getMyStoriesAction(config));
            dispatch(getHeartedStories(config));
            props.onHide();
          } else {
            setEdit({ error: firstResponse.data.message, loading: false });
          }
        } else {
          setEdit({ error: "", loading: false });
          dispatch(getMeAction(config, history.push));
          props.onHide();
        }
      } else {
        setEdit({ error: firstResponse.data.message, loading: false });
      }
    } catch (error: any) {
      setEdit({ error: error.message, loading: false });
    }
  };

  useEffect(() => {
    setProfileDetails({
      ...profileDetails,
      name: me?.name ? me?.name : "",
      birthDate: me?.birthDate ? me?.birthDate.slice(0, 10) : "",
      gender: me?.gender ? me?.gender : "",
      bio: me?.bio ? me?.bio : "",
    });
    // eslint-disable-next-line
  }, [me?.name]);
  return (
    <Modal {...props} size="lg" aria-labelledby="edit-profile-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title id="edit-profile-modal">Edit my profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleEdit}>
        <Modal.Body>
          <FloatingLabel label="Full Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={profileDetails.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDetailsChange("name", e.target.value)
              }
            />
          </FloatingLabel>
          <FloatingLabel label="Birth date" className="mb-3">
            <Form.Control
              type="date"
              placeholder="Birth date"
              defaultValue={profileDetails.birthDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDetailsChange("birthDate", e.target.value)
              }
            />
          </FloatingLabel>
          <FloatingLabel label="Gender" className="mb-3">
            <Form.Select
              aria-label="Gender"
              value={profileDetails.gender}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleDetailsChange("gender", e.target.value)
              }
            >
              <option value="">Don't want to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel label="Bio" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Bio"
              value={profileDetails.bio}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleDetailsChange("bio", e.target.value)
              }
              style={{ height: "150px" }}
            />
          </FloatingLabel>
          <Form.Group>
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAvatar(e.target.files)
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            className="background-gradient"
            type="submit"
          >
            Edit
          </Button>
          {edit.loading ? (
            <Loader />
          ) : (
            edit.error && <Alert variant="danger">{edit.error}</Alert>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
