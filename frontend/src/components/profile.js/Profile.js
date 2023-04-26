import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { Edit } from "react-feather";
import { getProfileByUserId } from "../../redux/actions/profile";
import Shimmer from "../shimmer/Shimmer";
import ProfileTop from "./ProfileTop";
import styles from "./Profile.module.scss";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const { profilePage, btnEdit } = styles;

const Profile = ({
	getProfileByUserId,
	profile: { loading, profile },
	auth,
}) => {
	let userId = useParams();

	useEffect(() => {
		getProfileByUserId(userId.id);
	}, [getProfileByUserId, userId.id]);

	return (
		<div className={`${profilePage} section`}>
			<Container>
				{profile === null || loading ? (
					<Shimmer />
				) : (
					<>
						<div className="position-relative p-4 rounded shadow">
							<ProfileTop profile={profile} />
							{auth.isAuthenticated &&
								!auth.loading &&
								auth.user.user._id === profile.profile.user._id && (
									<Link
										to="/edit-profile"
										className={`${btnEdit} ms-3 btn btn-warning rounded-pill text-white p-2`}
									>
										<Edit />
									</Link>
								)}
						</div>
						<ProfileAbout profile={profile} />
						<ProfileExperience experience={profile} />
						<ProfileEducation education={profile} />
					</>
				)}
			</Container>
		</div>
	);
};

Profile.propTypes = {
	getProfileByUserId: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
