import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, FileText, User } from "react-feather";

const DashboardActions = ({ className }) => {
	return (
		<div className="d-flex flex-wrap">
			<Link
				to="/edit-profile"
				className={`${className} btn btn-outline-secondary py-1 px-2 rounded-pill d-flex align-items-center me-3`}
			>
				<User className="me-2" /> <span>Edit Profile</span>
			</Link>
			<Link
				to="/add-experience"
				className={`${className} btn btn-outline-secondary py-1 px-2 rounded-pill d-flex align-items-center me-3`}
			>
				<Briefcase className="me-2" /> <span>Add Experience</span>
			</Link>
			<Link
				to="/add-education"
				className={`${className} btn btn-outline-secondary py-1 px-2 rounded-pill d-flex align-items-center`}
			>
				<FileText className="me-2" /> <span>Add Education</span>
			</Link>
		</div>
	);
};

export default DashboardActions;
