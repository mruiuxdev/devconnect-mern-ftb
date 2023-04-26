import PropTypes from "prop-types";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Trash } from "react-feather";
import { connect } from "react-redux";
import { deleteExperience } from "../../redux/actions/profile";

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td>{exp.title}</td>
			{exp.location ? <td>{exp.location}</td> : <td></td>}
			<td>
				<Moment format="YYYY/MM/DD">{exp.form}</Moment>
			</td>
			<td>
				{!exp.current ? (
					<Moment format="YYYY/MM/DD">{exp.to}</Moment>
				) : (
					"For Now"
				)}
			</td>
			{exp.description ? (
				<td title={exp.description}>
					{exp.description.substring(0, 100) + "..."}
				</td>
			) : (
				<td></td>
			)}
			<td>
				<Button
					className="btn btn-danger p-2"
					onClick={() => deleteExperience(exp._id)}
				>
					<Trash />
				</Button>
			</td>
		</tr>
	));

	return (
		<>
			<div className="heading mb-2">
				<h4>Experiences</h4>
			</div>
			<Table striped bordered responsive>
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Location</th>
						<th>Date From</th>
						<th>Date To</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</Table>
		</>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
