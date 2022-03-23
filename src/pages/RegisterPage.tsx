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
import { RegisterInfo } from "../typings/RegisterInfo";
import { useHistory } from "react-router";
import axios from "axios";
import Loader from "../components/Loader";

export default function RegisterPage() {
  const [register, setRegister] = useState({ error: "", loading: false });
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
  });
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const history = useHistory();

  const handleInfoChange = (key: string, value: string) => {
    setRegisterInfo({ ...registerInfo, [key]: value });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (registerInfo.password === repeatedPassword) {
      try {
        setRegister({ error: "", loading: true });
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/authors/register`,
          registerInfo
        );

        if (response.status === 201) {
          history.push("/login");
        } else {
          setRegister({ error: response.data.message, loading: false });
        }
      } catch (error: any) {
        setRegister({ error: error.message, loading: false });
      }
    } else {
      setRegister({ error: "Passwords must match.", loading: false });
    }
  };
  return (
    <div className="login-register-page mb-5">
      <Row className="px-3 justify-content-center">
        <Col
          xs={12}
          sm={10}
          md={8}
          lg={6}
          className="general-container login-register-fields p-5 d-flex flex-column"
        >
          <Image
            className="mb-4 align-self-center"
            src="/breezeStories.png"
            fluid
            roundedCircle
            style={{ maxHeight: "20rem", maxWidth: "20rem" }}
          />
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleRegister}>
            <FloatingLabel label="Full name">
              <Form.Control
                className="mb-2"
                size="lg"
                type="text"
                placeholder="Large text"
                value={registerInfo.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInfoChange("name", e.target.value)
                }
              />
            </FloatingLabel>
            <FloatingLabel label="Email">
              <Form.Control
                className="mb-2"
                size="lg"
                type="email"
                placeholder="Large text"
                value={registerInfo.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInfoChange("email", e.target.value)
                }
              />
            </FloatingLabel>
            <FloatingLabel label="Password">
              <Form.Control
                className="mb-2"
                size="lg"
                type="password"
                placeholder="Large text"
                value={registerInfo.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInfoChange("password", e.target.value)
                }
              />
            </FloatingLabel>
            <FloatingLabel label="Repeat password">
              <Form.Control
                className="mb-2"
                size="lg"
                type="password"
                placeholder="Large text"
                value={repeatedPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRepeatedPassword(e.target.value)
                }
              />
            </FloatingLabel>
            <div className="d-grid" style={{ maxHeight: "58px" }}>
              <Button
                className="background-gradient"
                variant="outline-dark"
                type="submit"
              >
                Register
              </Button>
              {register.loading ? (
                <Loader />
              ) : (
                register.error && (
                  <Alert variant="danger">{register.error}</Alert>
                )
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
