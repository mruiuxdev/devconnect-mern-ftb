import PropTypes from "prop-types";
import { connect } from "react-redux";
import { githubRepos } from "../../redux/actions/profile";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Shimmer from "../shimmer/Shimmer";

const ProfileGithub = ({ username, githubRepos, repos }) => {
	useEffect(() => {
		githubRepos(username);
	}, [githubRepos, username]);

	return (
		<>
			{repos && repos.length > 0 ? (
				<div className="p-4 rounded shadow mt-4">
					<h5 className="fw-bold mb-4 text-primary">Github Repos</h5>
					{repos.map((repo) => {
						const { id, html_url, name } = repo;

						return (
							<Link
								key={id}
								to={html_url}
								target="_blank"
								className="mb-2 border rounded p-2 w-100 text-decoration-none justify-content-start"
							>
								<p className="fw-bold text-secondary mb-0">{name}</p>
							</Link>
						);
					})}
				</div>
			) : (
				<div className="mt-4">
					<Shimmer />
				</div>
			)}
		</>
	);
};

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired,
	githubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
};

ProfileGithub.defaultProps = { repos: [] };

const mapStateToProps = (state) => ({ repos: state.data.repos.github });

export default connect(mapStateToProps, { githubRepos })(ProfileGithub);
