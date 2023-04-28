import React from "react";
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

const ProfileTop = ({ profile }) => {
	return (
		<div className="d-flex">
			<img
				src={profile.user.avatar}
				alt={profile.user.name}
				width={80}
				height={80}
				className="rounded-pill me-2"
			/>
			<div>
				<div>
					<span className="h5 fw-bold text-primary">{profile.user.name}</span>
					<span className="d-flex align-items-center mb-2">
						<Codesandbox className="me-2" />
						<i>
							{profile.status} (
							<Link
								to={profile.website}
								className="d-inline-block text-decoration-none text-third"
								target="_blank"
							>
								{profile.company}
							</Link>
							)
						</i>
					</span>
				</div>
				{profile.social && (
					<div className="d-flex flex-wrap mb-2">
						{profile.social.linkedin && (
							<Link
								to={profile.social.linkedin}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Linkedin />
							</Link>
						)}
						{profile.social.facebook && (
							<Link
								to={profile.social.facebook}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Facebook />
							</Link>
						)}
						{profile.social.twitter && (
							<Link
								to={profile.social.twitter}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Twitter />
							</Link>
						)}
						{profile.social.youtube && (
							<Link
								to={profile.social.youtube}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Youtube />
							</Link>
						)}
						{profile.social.instagram && (
							<Link
								to={profile.social.instagram}
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
						onClick={() => (window.location = `mailto:${profile.user.email}`)}
					>
						{profile.user.email}
					</span>
				</div>
				{profile.githubUsername && (
					<div className="d-flex align-items-center mb-2">
						<GitHub className="me-2" />
						<Link
							to={`https://www.github.com/${profile.githubUsername}`}
							className="btn-link text-third text-decoration-none"
						>
							{profile.githubUsername}
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
