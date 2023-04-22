import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const { header } = styles;

const Header = () => {
  return (
    <header
      className={`${header} d-flex flex-column align-items-center justify-content-center`}
    >
      <div className="heading mb-4">
        <h1 className="mb-0 fw-bolder">Developer Connecter</h1>
      </div>
      <p className="mb-4">
        Create A Developer Profile, Share Posts and Get Help From Other
        Developers
      </p>
      <Link to="/register" className="btn btn-primary text-white rounded-pill">
        Get Started
      </Link>
    </header>
  );
};

export default Header;
