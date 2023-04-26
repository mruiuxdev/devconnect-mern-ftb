import { connect } from "react-redux";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { getProfile, deleteAccount } from "../../redux/actions/profile";
import { GitHub, Mail, Trash, UserCheck } from "react-feather";
import DashboardActions from "./DashboardActions";
import CustomAlert from "../alert/CustomAlert";
import Experience from "./Experience";
import Education from "./Education";
import styles from "./Dashboard.module.scss";

const { dashboard, heightFitContent, deleteAcc } = styles;

const Dashboard = ({
	getProfile,
	auth: { user },
	profile: { loading, profile },
	deleteAccount,
}) => {
	useEffect(() => {
		getProfile();
	}, [getProfile]);

	return (
		<div className={`${dashboard} section`}>
			<Container>
				<CustomAlert />
				<div className="heading">
					<h1 className="fw-bolder">Dashboard</h1>
				</div>
				<div className="d-flex flex-wrap justify-content-between">
					{user && user.user && (
						<div className="d-flex text-secondary">
							<UserCheck className="me-2" />
							<div className="position-relative">
								<Button
									className={`btn btn-danger rounded-pill p-2 ${deleteAcc}`}
									onClick={() => deleteAccount()}
								>
									<Trash />
								</Button>
								{user.user.name}
								<br />
								<small>
									<i>
										<span
											className="btn-link text-secondary d-flex align-items-center"
											onClick={() =>
												(window.location = `mailto:${user.user.email}`)
											}
										>
											<Mail className="me-2" /> {user.user.email}
										</span>
									</i>
								</small>
								{profile !== null && profile.profile.githubUsername && (
									<small>
										<i>
											<Link
												to={`https://github.com/${profile.profile.githubUsername}`}
												className="btn-link text-secondary d-flex align-items-center"
												target="_blank"
											>
												<GitHub className="me-2" />
												{profile.profile.githubUsername}
											</Link>
										</i>
									</small>
								)}
								{profile === null && loading && (
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
						</div>
					)}
					{profile !== null && (
						<DashboardActions className={`${heightFitContent} mt-md-0 mt-3`} />
					)}
				</div>
				{profile !== null &&
					profile.profile.experience !== null &&
					profile.profile.experience.length > 0 && (
						<div className="mt-4">
							<Experience experience={profile.profile.experience} />
						</div>
					)}
				{profile !== null &&
					profile.profile.education !== null &&
					profile.profile.education.length > 0 && (
						<div className="mt-4">
							<Education education={profile.profile.education} />
						</div>
					)}
			</Container>
		</div>
	);
};

Dashboard.propTypes = {
	getProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getProfile, deleteAccount })(
	Dashboard
);
