import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h4 className="mb-5 text-danger">Oops! You seem to be lost.</h4>
      <NavLink to="/">Go Home</NavLink>
    </div>
  );
};

export default NotFoundPage;
