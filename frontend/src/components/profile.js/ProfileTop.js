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
				src={profile.profile.user.avatar}
				alt={profile.profile.user.name}
				width={80}
				height={80}
				className="rounded-pill me-2"
			/>
			<div>
				<div>
					<span className="h5 fw-bold text-primary">
						{profile.profile.user.name}
					</span>
					<span className="d-flex align-items-center mb-2">
						<Codesandbox className="me-2" />
						<i>
							{profile.profile.status} (
							<Link
								to={profile.profile.website}
								className="d-inline-block text-decoration-none text-third"
								target="_blank"
							>
								{profile.profile.company}
							</Link>
							)
						</i>
					</span>
				</div>
				{profile.profile.social && (
					<div className="d-flex flex-wrap mb-2">
						{profile.profile.social.linkedin && (
							<Link
								to={profile.profile.social.linkedin}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Linkedin />
							</Link>
						)}
						{profile.profile.social.facebook && (
							<Link
								to={profile.profile.social.facebook}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Facebook />
							</Link>
						)}
						{profile.profile.social.twitter && (
							<Link
								to={profile.profile.social.twitter}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Twitter />
							</Link>
						)}
						{profile.profile.social.youtube && (
							<Link
								to={profile.profile.social.youtube}
								className="btn btn-primary rounded-pill text-white p-1 me-1 mb-1"
							>
								<Youtube />
							</Link>
						)}
						{profile.profile.social.instagram && (
							<Link
								to={profile.profile.social.instagram}
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
						onClick={() =>
							(window.location = `mailto:${profile.profile.user.email}`)
						}
					>
						{profile.profile.user.email}
					</span>
				</div>
				{profile.profile.githubUsername && (
					<div className="d-flex align-items-center mb-2">
						<GitHub className="me-2" />
						<Link
							to={`https://www.github.com/${profile.profile.githubUsername}`}
							className="btn-link text-third text-decoration-none"
						>
							{profile.profile.githubUsername}
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
