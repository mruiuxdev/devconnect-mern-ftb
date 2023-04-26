import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import {
	Code,
	Facebook,
	GitHub,
	Instagram,
	Linkedin,
	Mail,
	Twitter,
	Youtube,
} from "react-feather";

const ProfileItem = ({
	profile: {
		user: { _id, name, avatar, email },
		company,
		githubUsername,
		skills,
		social,
	},
}) => {
	return (
		<Card className="h-100">
			<Card.Img
				variant="top"
				src={avatar}
				height={200}
				style={{
					objectFit: "cover",
					objectPosition: "center center",
				}}
			/>
			<Card.Body className="d-flex flex-column justify-content-between">
				<Card.Title className="h6 text-primary">
					<h5 className="mb-3">{name}</h5>
					<small>
						<i>
							<span className="text-secondary d-flex align-items-center">
								<Code className="me-1" /> {company}
							</span>
						</i>
					</small>
					<small>
						<i>
							<span
								className="btn-link text-secondary d-flex align-items-center"
								onClick={() => (window.location = `mailto:${email}`)}
							>
								<Mail className="me-1" /> {email}
							</span>
						</i>
					</small>
					{githubUsername && (
						<small className="mt-1">
							<i>
								<Link
									className="btn-link text-secondary d-flex align-items-center"
									to={`https://www.github.com/${githubUsername}`}
								>
									<GitHub className="me-1" />
									{githubUsername}
								</Link>
							</i>
						</small>
					)}
					{social && (
						<div className="d-flex flex-wrap mt-3">
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
					{skills && (
						<div className="d-flex flex-wrap mt-2">
							{skills.slice(0, 6).map((skill, i) => (
								<small
									key={i}
									className="bg-secondary rounded-pill text-white py-1 px-2 me-1 mb-1"
								>
									{skill.toLowerCase()}
								</small>
							))}
						</div>
					)}
				</Card.Title>
				<Card.Text className="mt-4 mb-0">
					<Link
						to={`/profile/${_id}`}
						className="btn btn-outline-primary rounded-pill py-2 w-100"
					>
						View Details
					</Link>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

ProfileItem.propTypes = { profile: PropTypes.object.isRequired };

export default ProfileItem;
