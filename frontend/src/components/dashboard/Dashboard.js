import { connect } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { getProfile } from "../../redux/actions/profile";
import styles from "./Dashboard.module.scss";
import Shimmer from "../shimmer/Shimmer";

const { dashboard } = styles;

const Dashboard = ({
	getProfile,
	auth: { user },
	profile: { loading, profile },
}) => {
	useEffect(() => {
		getProfile();
	}, []);

	return loading && profile !== null ? (
		<Container className="p-5">
			<Shimmer />
		</Container>
	) : (
		<div className={`${dashboard} section`}>
			<Container>
				<div className="heading">
					<h1 className="fw-bolder">Dashboard</h1>
				</div>
				{user && user.user && (
					<p className="d-flex align-items-center text-secondary">
						<img
							src={user.user.avatar}
							alt={user.user.name}
							width={40}
							height={40}
							className="rounded-pill me-2"
						/>
						{user.user.name}
					</p>
				)}
				{profile !== null ? (
					<p>Has Profile</p>
				) : (
					<>
						<Link to="/create-profile" className="text-decoration-none">
							<Alert className="alert alert-warning d-flex align-items">
								<span className="me-2">
									You have not yet setup a profile, please add some info
								</span>
								<span className="btn btn-primary rounded-pill text-white py-1 px-2 d-inline-block">
									Create Profile
								</span>
							</Alert>
						</Link>
					</>
				)}
			</Container>
		</div>
	);
};

Dashboard.propTypes = {
	getProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Dashboard);
