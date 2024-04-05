import { Link } from "react-router-dom";

export const Card = ({ title, redirect }) => {
  return (
    <Link to={redirect}>
      <div className="card-view">
        <h1>{title}</h1>
      </div>
    </Link>
  );
};
