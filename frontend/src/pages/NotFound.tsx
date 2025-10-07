import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-300 mb-6">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="text-indigo-400 hover:text-indigo-300 underline">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
