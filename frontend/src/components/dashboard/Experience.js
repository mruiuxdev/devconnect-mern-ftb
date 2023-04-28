import PropTypes from "prop-types";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Trash } from "react-feather";
import { connect } from "react-redux";
import { deleteExperience } from "../../redux/actions/profile";

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => {
		const { _id, company, title, from, to, description, current, location } =
			exp;

		return (
			<tr key={_id}>
				<td>{company}</td>
				<td>{title}</td>
				{location ? <td>{location}</td> : <td></td>}
				<td>
					<Moment format="YYYY/MM/DD">{from}</Moment>
				</td>
				<td>
					{!current ? <Moment format="YYYY/MM/DD">{to}</Moment> : "For Now"}
				</td>
				{description ? (
					<td title={description}>{description.substring(0, 100) + "..."}</td>
				) : (
					<td></td>
				)}
				<td>
					<Button
						className="btn btn-danger p-2"
						onClick={() => deleteExperience(_id)}
					>
						<Trash />
					</Button>
				</td>
			</tr>
		);
	});

	return (
		<>
			{experience.length > 0 && (
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
			)}
		</>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
