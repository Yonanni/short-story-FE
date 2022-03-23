import { Alert, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import { getAuthorsAction } from "../redux/actions/getAuthorsAction";
import AuthorInfo from "../components/AuthorInfo";
import Loader from "../components/Loader";

export default function AuthorsPage() {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const authors = useSelector((state: ReduxStore) => state.authors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorsAction());
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Row>
        {alphabet.map((letter, i) => (
          <Col key={i} xs={12} md={6} lg={4} className="mb-4">
            <div className="general-container p-3">
              <h2>{letter}</h2>
              <hr className="mb-3" />
              {authors.loading ? (
                <Loader />
              ) : authors.error ? (
                <Alert variant="danger">{authors.error}</Alert>
              ) : (
                authors.data
                  .filter(
                    (author) => letter === author.name[0].toLocaleUpperCase()
                  )
                  .map((author, j) => <AuthorInfo key={j} author={author} />)
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
