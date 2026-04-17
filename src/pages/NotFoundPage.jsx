import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { ArrowIcon } from "../icons/Icons";

export default function NotFoundPage() {
  const error = useRouteError();

  const status = isRouteErrorResponse(error) ? error.status : null;
  const message = isRouteErrorResponse(error)
    ? error.statusText
    : "Something went wrong";

  return (
    <div className="app">
      <main className="app__content">
        <div className="error-page">
          <p className="error-page__code">{status || "Error"}</p>
          <h1 className="error-page__heading">
            {status === 404 ? "Page not found" : message}
          </h1>
          <p className="error-page__body">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn--primary">
            Back to home <ArrowIcon />
          </Link>
        </div>
      </main>
    </div>
  );
}
