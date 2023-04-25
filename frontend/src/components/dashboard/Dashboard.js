import { connect } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { getProfile } from "../../redux/actions/profile";
import styles from "./Dashboard.module.scss";
import Shimmer from "../shimmer/Shimmer";
import DashboardActions from "./DashboardActions";
import CustomAlert from "../alert/CustomAlert";

const { dashboard, heightFitContent } = styles;

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
				<CustomAlert className="w-100" />
				<div className="heading">
					<h1 className="fw-bolder">Dashboard</h1>
				</div>
				<div className="d-flex justify-content-between">
					{user && user.user && (
						<p className="d-flex text-secondary">
							<img
								src={user.user.avatar}
								alt={user.user.name}
								width={40}
								height={40}
								className="rounded-pill me-2"
							/>
							<div>
								{user.user.name}
								<br />
								<small>
									<i>
										<span
											className="btn-link"
											onClick={() =>
												(window.location = `mailto:${user.user.email}`)
											}
										>
											{user.user.email}
										</span>
									</i>
								</small>
								{profile === null && (
									<Link
										to="/create-profile"
										className="text-decoration-none mt-3"
									>
										<Alert className="alert alert-warning d-flex align-items">
											<span className="me-2">
												You have not yet setup a profile, please add some info
											</span>
											<span className="btn btn-primary rounded-pill text-white py-1 px-2 d-inline-block">
												Create Profile
											</span>
										</Alert>
									</Link>
								)}
							</div>
						</p>
					)}
					{profile !== null && (
						<DashboardActions className={heightFitContent} />
					)}
				</div>
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
