import PropTypes from "prop-types";
import {
	Codesandbox,
	Facebook,
	GitHub,
	Instagram,
	Linkedin,
	Mail,
	Twitter,
	Youtube,
} from "react-feather";
import { Link } from "react-router-dom";

const ProfileTop = ({
	profile: {
		user: { avatar, name, email },
		status,
		website,
		company,
		social,
		githubUsername,
	},
}) => {
	return (
		<div className="d-flex">
			<img
				src={avatar}
				alt={name}
				width={80}
				height={80}
				className="rounded-pill me-2"
			/>
			<div>
				<div>
					<span className="h5 fw-bold text-primary">{name}</span>
					<span className="d-flex align-items-center mb-2">
						<Codesandbox className="me-2" />
						<i>
							{status} (
							<Link
								to={website}
								className="d-inline-block text-decoration-none text-third"
								target="_blank"
							>
								{company}
							</Link>
							)
						</i>
					</span>
				</div>
				{social && (
					<div className="d-flex flex-wrap mb-2">
						{social.linkedin && (
							<Link
								to={social.linkedin}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Linkedin />
							</Link>
						)}
						{social.facebook && (
							<Link
								to={social.facebook}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Facebook />
							</Link>
						)}
						{social.twitter && (
							<Link
								to={social.twitter}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Twitter />
							</Link>
						)}
						{social.youtube && (
							<Link
								to={social.youtube}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Youtube />
							</Link>
						)}
						{social.instagram && (
							<Link
								to={social.instagram}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Instagram />
							</Link>
						)}
					</div>
				)}
				<div className="d-flex align-items-center  mb-2">
					<Mail className="me-2" />
					<span
						className="text-third text-decoration-none"
						onClick={() => (window.location = `mailto:${email}`)}
					>
						{email}
					</span>
				</div>
				{githubUsername && (
					<div className="d-flex align-items-center mb-2">
						<GitHub className="me-2" />
						<Link
							to={`https://www.github.com/${githubUsername}`}
							className="btn-link text-third text-decoration-none"
						>
							{githubUsername}
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default ProfileTop;
