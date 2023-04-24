import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const { header } = styles;

const Header = ({ auth: { isAuthenticated, loading } }) => {
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
			{!loading && !isAuthenticated && (
				<Link
					to="/register"
					className="btn btn-primary text-white rounded-pill"
				>
					Get Started
				</Link>
			)}
		</header>
	);
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Header);
