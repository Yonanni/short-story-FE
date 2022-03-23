import { SingleAuthor } from "../typings/ReduxStore";
import { Row, Col, Image, Button } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/logoutAction";
import DeleteProfileModal from "./DeleteProfileModal";

interface PresentationPanelProps {
  author: SingleAuthor["data"];
}

export default function PresentationPanel({ author }: PresentationPanelProps) {
  const [editModalShow, setEditModalShow] = useState(false);
  const [deleteProfileModalShow, setDeleteProfileModalShow] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
    history.push("/login");
  };

  const location = useLocation();
  return (
    <div className="general-container presentation-panel p-5 mb-4">
      <Row>
        <Col xs={12} md={6} className="d-flex flex-column align-items-center">
          <Image
            src={author?.avatar}
            className="mb-3"
            roundedCircle
            fluid
            style={{ maxHeight: "20rem", maxWidth: "20rem" }}
          />
          <h2 className="text-center mb-3">{author?.name}</h2>
          {location.pathname === "/me" && (
            <div>
              <Button
                className="background-gradient mb-4 me-3"
                variant="outline-dark"
                onClick={() => setEditModalShow(true)}
              >
                Edit my profile
              </Button>
              <Button
                className="mb-4 me-3"
                variant="danger"
                onClick={() => setDeleteProfileModalShow(true)}
              >
                Delete profile
              </Button>
              <Button className="mb-4" variant="outline-dark" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </Col>
        <Col
          xs={12}
          md={6}
          className="info d-flex flex-column align-items-center justify-content-center p-5"
        >
          <p className="text-center">
            <strong>Contact me:</strong> <br /> {author?.email}
          </p>
          {author?.birthDate && (
            <p className="text-center">
              <strong>Birth date:</strong> <br />
              {format(parseISO(author?.birthDate), "PPP")}
            </p>
          )}
          {author?.gender && (
            <p className="text-center">
              <strong>Gender:</strong> <br />
              {author?.gender}
            </p>
          )}
          {author?.bio && (
            <p className="text-center">
              <strong>Bio:</strong> <br />
              {author?.bio}
            </p>
          )}
        </Col>
      </Row>
      <EditProfileModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
      />
      <DeleteProfileModal
        show={deleteProfileModalShow}
        onHide={() => setDeleteProfileModalShow(false)}
      />
    </div>
  );
}
