import {
  Row,
  Col,
  Image,
  Form,
  FloatingLabel,
  Button,
  Alert,
} from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginInfo } from "../typings/LoginInfo";
import { ReduxStore } from "../typings/ReduxStore";
import { getAuthorizationHeaderAction } from "../redux/actions/getAuthorizationHeaderAction";
import Loader from "../components/Loader";
import { useHistory } from "react-router";

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });

  const authorizationHeader = useSelector(
    (state: ReduxStore) => state.authorizationHeader
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    dispatch(getAuthorizationHeaderAction(loginInfo, history.push));
  };

  return (
    <div className="login-register-page mb-5">
      <Row className="px-3 justify-content-center">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          className="general-container p-5 d-flex flex-column"
        >
          <Image
            className="mb-4 align-self-center"
            src="/breezeStories.png"
            fluid
            roundedCircle
            style={{ maxHeight: "20rem", maxWidth: "20rem" }}
          />
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
            <FloatingLabel label="Email">
              <Form.Control
                className="mb-2"
                size="lg"
                type="email"
                placeholder="Large text"
                value={loginInfo.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
            </FloatingLabel>
            <FloatingLabel label="Password">
              <Form.Control
                className="mb-2"
                size="lg"
                type="password"
                placeholder="Large text"
                value={loginInfo.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
            </FloatingLabel>
            <div className="d-grid mb-4" style={{ maxHeight: "58px" }}>
              <Button
                className="background-gradient"
                variant="outline-dark"
                type="submit"
              >
                Login
              </Button>
            </div>
          </Form>
          {authorizationHeader.loading ? (
            <Loader />
          ) : (
            authorizationHeader.error && (
              <Alert variant="danger">{authorizationHeader.error}</Alert>
            )
          )}
        </Col>
      </Row>
    </div>
  );
}
