import styles from "./Header.module.scss";

const { header } = styles;

function Header() {
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
      <a href="/" className="btn btn-primary text-white rounded-pill">
        Get Started
      </a>
    </header>
  );
}

export default Header;
