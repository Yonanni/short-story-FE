import { FloatingLabel, Form, Button, Alert } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import { useHistory } from "react-router";
import Loader from "../components/Loader";

export default function PostUpdateStoryPage() {
  const [submit, setSubmit] = useState({ error: "", loading: false });
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [story, setStory] = useState("");
  const [storyImage, setStoryImage] = useState<null | FileList>(null);

  const config = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config
  );
  const configHeader = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config.headers
  );

  const history = useHistory();

  const handleCheckBoxes = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCategories([...categories, e.target.value]);
    } else {
      const index = categories.indexOf(e.target.value);
      categories.splice(index, 1);
      setCategories(categories);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmit({ error: "", loading: true });
      const firstResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/stories`,
        { title, categories, story },
        config
      );

      if (firstResponse.status === 201) {
        if (storyImage) {
          let formData = new FormData();
          formData.append("storyImage", storyImage[0]);
          const secondResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/stories/${firstResponse.data.story._id}/storyImage`,
            formData,
            {
              headers: {
                ...configHeader,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (secondResponse.status === 200) {
            setSubmit({ error: "", loading: false });
            history.push("/");
          } else {
            setSubmit({ error: firstResponse.data.message, loading: false });
          }
        } else {
          setSubmit({ error: "", loading: false });
          history.push("/");
        }
      } else {
        setSubmit({ error: firstResponse.data.message, loading: false });
      }
    } catch (error: any) {
      setSubmit({ error: error.message, loading: false });
    }
  };

  return (
    <div className="general-container p-5">
      <h2 className="mb-4">Post a Story</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </FloatingLabel>
        <Form.Group className="mb-3" onChange={handleCheckBoxes}>
          <Form.Label>Categories (at least one)</Form.Label>
          <br />
          {[
            "Mystery",
            "Thriller",
            "Horror",
            "Historical",
            "Romance",
            "Sci-fi",
            "Fantasy",
            "Dystopian",
          ].map((category, i) => (
            <Form.Check
              key={i}
              className="d-inline-block me-3"
              type="checkbox"
              label={category}
              value={category}
            />
          ))}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Story image (optional)</Form.Label>
          <Form.Control
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStoryImage(e.target.files)
            }
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>Story</Form.Label>
          <ReactQuill
            theme="snow"
            style={{ height: "400px" }}
            value={story}
            onChange={setStory}
          />
        </Form.Group>
        <div className="d-flex justify-content-end mt-5">
          <Button
            type="submit"
            variant="outline-dark"
            className="background-gradient"
          >
            Submit
          </Button>
          {submit.loading ? (
            <Loader />
          ) : (
            submit.error && <Alert variant="danger">{submit.error}</Alert>
          )}
        </div>
      </Form>
    </div>
  );
}
