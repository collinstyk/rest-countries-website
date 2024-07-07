import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="fixed flex h-dvh w-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-[12rem] font-bold text-gray-800">404</h1>
        <p className="mb-8 text-xl text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="z-20 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
