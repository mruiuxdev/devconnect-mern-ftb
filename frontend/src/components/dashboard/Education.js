import PropTypes from "prop-types";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Trash } from "react-feather";
import { connect } from "react-redux";
import { deleteEducation } from "../../redux/actions/profile";

const Education = ({ education, deleteEducation }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td>{edu.degree}</td>
			<td>{edu.fieldOfStudy}</td>
			<td>
				<Moment format="YYYY/MM/DD">{edu.form}</Moment>
			</td>
			<td>
				<Moment format="YYYY/MM/DD">{edu.to}</Moment>
			</td>
			<td>{edu.description}</td>
			<td>
				<Button
					className="btn btn-danger p-2"
					onClick={() => deleteEducation(edu._id)}
				>
					<Trash />
				</Button>
			</td>
		</tr>
	));

	return (
		<>
			<div className="heading mb-2">
				<h4>Educations</h4>
			</div>
			<Table striped bordered responsive>
				<thead>
					<tr>
						<th>School</th>
						<th>Degree</th>
						<th>Field Of Study</th>
						<th>Date From</th>
						<th>Date To</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{educations}</tbody>
			</Table>
		</>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
