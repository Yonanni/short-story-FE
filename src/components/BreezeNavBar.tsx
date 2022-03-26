import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { GiRollingDices } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { ReduxStore } from "../typings/ReduxStore";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/actions/logoutAction";



export default function BreezeNavBar() {
  const pathName = useLocation().pathname;
  const authorizationHeader = useSelector(
    (state: ReduxStore) => state.authorizationHeader
  );
  
  

  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch(logoutAction());
    history.push("/login");
  };

  return (
    <Navbar id="breeze-navbar" className="background-gradient" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          <Image
            src="/breezeStories.png"
            alt="breeze icon"
            roundedCircle
            style={{ height: "4rem" }}
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              className={pathName === "/" ? "nav-link active-page" : "nav-link"}
              to="/"
            >
              Home
            </Link>
            <Link
              className={
                pathName === "/me" ? "nav-link active-page" : "nav-link"
              }
              to="/me"
            >
              Me
            </Link>
            <Link
              className={
                pathName === "/authors" ? "nav-link active-page" : "nav-link"
              }
              to="/authors"
            >
              Authors
            </Link>
            <Link
              className={
                pathName === "/postStory" ? "nav-link active-page" : "nav-link"
              }
              to="/postStory"
            >
              Post Story
            </Link>
            <Link
              className={
                pathName === "/random" ? "nav-link active-page" : "nav-link"
              }
              to="/random"
            >
              <GiRollingDices size={35} />
            </Link>
          </Nav>
          <Nav className="justify-content-end">
            {
             authorizationHeader.config.headers.Authorization ? 
            <Link
            className={
               
              "nav-link"
            }
            to="/login"
            onClick={logout}
          >
            Logout
          </Link> :
              <>
              <Link
              className={
                pathName === "/login" ? "nav-link active-page" : "nav-link"
              }
              to="/login"
            >
              Login
            </Link>
            <Link
              className={
                pathName === "/register" ? "nav-link active-page" : "nav-link"
              }
              to="/register"
            >
              Register
            </Link>
             </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
