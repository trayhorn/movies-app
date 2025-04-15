import { Link } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <div className="NotFoundPage">
      <h1 className="error">404</h1>
      <h2 className="text">Page Not Found</h2>
      <Link className="link" to="/">Back to homepage</Link>
		</div>
	);
}