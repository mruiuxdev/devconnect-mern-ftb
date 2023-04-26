import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { addExperience } from "../../redux/actions/profile";
import styles from "./Profile.module.scss";
import CustomAlert from "../alert/CustomAlert";

const { profileSection } = styles;

const AddExperience = ({ addExperience }) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	function atLeastOneKeyHasValue(obj) {
		for (let key in obj) {
			if (!obj.hasOwnProperty(key)) {
				continue;
			}
			if (obj[key]) {
				return true;
			}
		}
		return false;
	}

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		if (
			atLeastOneKeyHasValue(formData) &&
			formData.company &&
			formData.title &&
			formData.from
		)
			navigate("/dashboard");

		addExperience(formData);
	};

	return (
		<div className={`${profileSection} section`}>
			<Container>
				<div className="heading">
					<h1 className="fw-bolder">Add Experience</h1>
				</div>
				<p>Add any developer/programming positions that you had in the past</p>
				<CustomAlert />
				<Form onSubmit={(e) => onSubmit(e)}>
					<Row className="align-items-center">
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label className="d-flex justify-content-between">
									<span>Job Title</span>
									<small className="text-danger">required field*</small>
								</Form.Label>
								<Form.Control
									type="text"
									className="form-control"
									name="title"
									value={title}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label className="d-flex justify-content-between">
									<span>Company</span>
									<small className="text-danger">required field*</small>
								</Form.Label>
								<Form.Control
									type="text"
									name="company"
									value={company}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label>Location</Form.Label>
								<Form.Control
									type="text"
									name="location"
									value={location}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label className="d-flex justify-content-between">
									<span>Form Date</span>
									<small className="text-danger">required field*</small>
								</Form.Label>
								<Form.Control
									type="date"
									name="from"
									value={from}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Check
									type="checkbox"
									name="current"
									label={`Current Job`}
									value={current}
									id="current"
									checked={current}
									onChange={(e) => {
										setFormData({ ...formData, current: !current });
										toggleDisabled(!toDateDisabled);
									}}
								/>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label>To Date</Form.Label>
								<Form.Control
									type="date"
									name="to"
									value={to}
									onChange={(e) => onChange(e)}
									disabled={toDateDisabled ? "disabled" : ""}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={12}>
							<Form.Group className="mb-3">
								<Form.Label>Job Description</Form.Label>
								<Form.Control
									as="textarea"
									rows={4}
									name="description"
									className="rounded"
									value={description}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<div className="d-flex justify-content-end">
								<Link to="/dashboard" className="btn btn-light">
									Back
								</Link>
								<Button
									variant="primary"
									type="submit"
									className="text-white rounded-pill ms-3"
									disabled={atLeastOneKeyHasValue(formData) ? "" : "disabled"}
								>
									Add
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Container>
		</div>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
