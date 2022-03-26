import { Image } from "react-bootstrap";
import { useUser } from "../context/CurrentUser";


export default function Hero() {
  const user = useUser()
 
  return (
    <div id="hero" className="mb-4">
      <Image src="/breezeHero.png" fluid />
      <div className="hero-text d-flex flex-column align-items-end">
        <h1>{user}</h1>
        <p className="d-none d-sm-none d-md-block">
          A place for Storytellers and readers.
        </p>
      </div>
    </div>
  );
}
