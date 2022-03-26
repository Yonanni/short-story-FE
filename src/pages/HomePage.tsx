import Hero from "../components/Hero";
import CurrentUser from "../context/CurrentUser";
import StoryContainer from "../components/StoryContainer";
import Loader from "../components/Loader";
import {
  Alert,
  Form,
  FloatingLabel,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import { getStoriesAction } from "../redux/actions/getStoriesAction";

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const stories = useSelector((state: ReduxStore) => state.stories);
  const dispatch = useDispatch();

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(getStoriesAction(title, category));
  };

  useEffect(() => {
    dispatch(getStoriesAction(title, category));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <CurrentUser>
      <Hero />
      </CurrentUser>
      <Container>
        <Form onSubmit={onSearch}>
          <Row className="general-container p-4 mb-4">
            <Col xs={12} md={6} lg={8} className="mb-2">
              <FloatingLabel label="Search by title">
                <Form.Control
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={3} lg={2} className="mb-2">
              <FloatingLabel label="Category">
                <Form.Select
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setCategory(e.target.value)
                  }
                >
                  <option value="">Any</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Sci-fi">Sci-fi</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Horror">Horror</option>
                  <option value="Historical">Historical</option>
                  <option value="Romance">Romance</option>
                  <option value="Dystopian">Dystopian</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col
              xs={12}
              md={3}
              lg={2}
              className="d-grid"
              style={{ maxHeight: "58px" }}
            >
              <Button
                className="background-gradient"
                variant="outline-dark"
                type="submit"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      {stories.loading ? (
        <Loader />
      ) : stories.error ? (
        <Alert variant="danger">{stories.error}</Alert>
      ) : (
        stories.data.map((story, i) => <StoryContainer key={i} story={story} />)
      )}
    </div>
  );
}
