import PropTypes from "prop-types";

const ProfileAbout = ({ profile }) => {
	return (
		<>
			{((profile.profile.skills && profile.profile.skills.length > 0) ||
				profile.profile.bio) && (
				<div className="p-4 rounded shadow mt-4">
					{profile.profile.skills && profile.profile.skills.length > 0 && (
						<>
							<h5 className="fw-bold mb-4 text-primary">Skills</h5>
							<div className="d-flex flex-wrap mb-2">
								{profile.profile.skills.map((skill, i) => (
									<span
										key={i}
										className="bg-secondary px-2 text-white rounded-pill me-1 mb-1"
									>
										{skill}
									</span>
								))}
							</div>
						</>
					)}
					{profile.profile.bio && (
						<>
							<hr />
							<h5 className="fw-bold mb-4 text-primary">
								{profile.profile.user.name.trim().split(" ")[0]} Bio
							</h5>
							{profile.profile.bio}
						</>
					)}
				</div>
			)}
		</>
	);
};

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
