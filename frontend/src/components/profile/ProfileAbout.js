import PropTypes from "prop-types";

const ProfileAbout = ({
	profile: {
		skills,
		bio,
		user: { name },
	},
}) => {
	return (
		<>
			{((skills && skills.length > 0) || bio) && (
				<div className="p-4 rounded shadow mt-4">
					{skills && skills.length > 0 && (
						<>
							<h5 className="fw-bold mb-4 text-primary">Skills</h5>
							<div className="d-flex flex-wrap mb-2">
								{skills.map((skill, i) => (
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
					{bio && (
						<>
							<hr />
							<h5 className="fw-bold mb-4 text-primary">
								{name.trim().split(" ")[0]} Bio
							</h5>
							{bio}
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
