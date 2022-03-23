import { useHistory } from "react-router-dom";
import { Image, Button } from "react-bootstrap";
import AuthorInfo from "./AuthorInfo";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { Story } from "../typings/Story";
import { format, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { ReduxStore } from "../typings/ReduxStore";
import ReactHtmlParser from "react-html-parser";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteStoryModal from "./DeleteStoryModal";

interface StoryContainerProps {
  story: Story | null;
}

export default function StoryContainer({ story }: StoryContainerProps) {
  const [deleteStoryModalShow, setDeleteStoryModalShow] = useState(false);
  const [hearted, setHearted] = useState<boolean>(false);
  const me = useSelector((state: ReduxStore) => state.me.data);
  const config = useSelector(
    (state: ReduxStore) => state.authorizationHeader.config
  );

  const history = useHistory();

  const handleHeart = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/stories/${story?._id}/hearts`,
        {},
        config
      );

      if (response.status === 200) {
        setHearted(!hearted);
      } else {
        history.push("/login");
      }
    } catch (error) {
      history.push("/login");
    }
  };

  useEffect(() => {
    story?.hearts.forEach((heartId) => {
      if (heartId === me?._id) {
        setHearted(true);
      }
    });
    // eslint-disable-next-line
  }, [story?.hearts]);

  return (
    <div className="general-container story-container p-5 mb-4 d-flex flex-column align-items-center">
      {me?._id === story?.author._id && (
        <Button
          variant="danger"
          className="align-self-end"
          onClick={() => setDeleteStoryModalShow(true)}
        >
          Delete Story
        </Button>
      )}
      <h2 className="mb-4 text-center">{story?.title}</h2>
      <h5 className="mb-4">
        {story?.categories.map((c, i) => (
          <span key={i}>{c}, </span>
        ))}
      </h5>
      {story?.story && (
        <div className="mb-4">{ReactHtmlParser(story?.story)}</div>
      )}

      {story?.storyImage && (
        <Image
          src={story?.storyImage}
          className="mb-4"
          style={{ maxHeight: "30rem" }}
          rounded
          fluid
        />
      )}
      <div className="hearts-comments align-self-start mb-4">
        <span className="me-4" onClick={handleHeart}>
          {story?.hearts && (
            <span className="me-2">
              {story?.hearts.length + (hearted ? 1 : 0)}
            </span>
          )}
          {hearted ? (
            <AiFillHeart size={40} style={{ color: "red" }} />
          ) : (
            <AiOutlineHeart size={40} />
          )}
        </span>

        <span onClick={() => history.push(`/singleStory/${story?._id}`)}>
          <FaComments size={40} />
        </span>
      </div>
      {story?.createdAt && (
        <p className="align-self-end mb-4">
          <em>{format(parseISO(story?.createdAt), "PPpp")}</em>
        </p>
      )}
      {story?.author && <AuthorInfo author={story?.author} />}
      <DeleteStoryModal
        show={deleteStoryModalShow}
        onHide={() => setDeleteStoryModalShow(false)}
        storyid={story?._id}
      />
    </div>
  );
}
