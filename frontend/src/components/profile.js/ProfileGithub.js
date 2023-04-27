import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { githubRepos } from "../../redux/actions/profile";
import Shimmer from "../shimmer/Shimmer";

const ProfileGithub = ({ githubRepos, username, repos }) => {
	console.log(username.profile.githubUsername);
	console.log(repos.github);
	useEffect(() => {
		githubRepos(username.profile.githubUsername);
	}, [githubRepos, username.profile.githubUsername]);

	return (
		<>
			{repos.github === null || repos.github === undefined ? (
				<Shimmer />
			) : (
				<div className="p-4 rounded shadow mt-4">
					<h5 className="fw-bold mb-2 text-primary">Github Repos</h5>
					{repos.github.map((repo) => (
						<Link
							to={repo.html_url}
							target="_blank"
							className="mb-2 border rounded p-2 w-100 text-decoration-none justify-content-start"
						>
							<p className="fw-bold text-secondary mb-0">{repo.name}</p>
						</Link>
					))}
				</div>
			)}
		</>
	);
};

ProfileGithub.propTypes = {
	githubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	username: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	repos: state.profile.repos,
});

export default connect(mapStateToProps, { githubRepos })(ProfileGithub);
