import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import styles from "./Header.module.scss";

const { header } = styles;

const Header = ({ isAuthenticated }) => {
	if (isAuthenticated) return <Navigate to="/dashboard" />;

	return (
		<header
			className={`${header} section d-flex flex-column align-items-center justify-content-center`}
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

Header.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Header);
