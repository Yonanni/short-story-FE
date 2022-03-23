import { Image } from "react-bootstrap";
import { Author } from "../typings/Author";
import { useHistory } from "react-router-dom";

interface AuthorInfoProps {
  author: Author;
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  const history = useHistory();
  return (
    <div
      className="author-info d-flex align-self-end align-items-center mb-4"
      onClick={() => history.push(`/singleAuthor/${author._id}`)}
    >
      <div className="me-3" style={{ maxHeight: "4rem", maxWidth: "4rem" }}>
        <Image src={author?.avatar} fluid roundedCircle />
      </div>
      <div className="author-name">{author?.name}</div>
    </div>
  );
}
