import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BreezeNavBar from "./components/BreezeNavBar";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthorsPage from "./pages/AuthorsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MePage from "./pages/MePage";
import PostUpdateStoryPage from "./pages/PostUpdateStoryPage";
import RandomStoryPage from "./pages/RandomStoryPage";
import SingleAuthorPage from "./pages/SingleAuthorPage";
import SingleStoryPage from "./pages/SingleStoryPage";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    (window as any).window.process = {
      ...window.process,
    };
  }, []);
  return (
    <Router>
      <div className="App">
        <BreezeNavBar />
        <Container id="main-container">
          <Route path="/" exact component={HomePage} />
          <Route path="/me" exact component={MePage} />
          <Route path="/authors" exact component={AuthorsPage} />
          <Route path="/postStory" exact component={PostUpdateStoryPage} />
          <Route path="/random" exact component={RandomStoryPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route
            path="/singleAuthor/:authorId"
            exact
            component={SingleAuthorPage}
          />
          <Route
            path="/singleStory/:storyId"
            exact
            component={SingleStoryPage}
          />
        </Container>
      </div>
    </Router>
  );
}
