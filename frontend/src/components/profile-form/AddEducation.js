import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { addEducation } from "../../redux/actions/profile";
import styles from "./Profile.module.scss";
import CustomAlert from "../alert/CustomAlert";

const { profileSection } = styles;

const AddEducation = ({ addEducation }) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldOfStudy: "",
		from: "",
		to: "",
		description: "",
	});

	const { school, degree, fieldOfStudy, from, to, description } = formData;

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

		if (atLeastOneKeyHasValue(formData)) navigate("/dashboard");

		addEducation(formData);
	};

	return (
		<div className={`${profileSection} section`}>
			<Container>
				<div className="heading">
					<h1 className="fw-bolder">Add Experience</h1>
				</div>
				<p>Add any school or bootcamp that you have attended</p>
				<CustomAlert />
				<Form onSubmit={(e) => onSubmit(e)}>
					<Row className="align-items-center">
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label className="d-flex justify-content-between">
									<span>School</span>
									<small className="text-danger">required field*</small>
								</Form.Label>
								<Form.Control
									type="text"
									className="form-control"
									name="school"
									value={school}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label className="d-flex justify-content-between">
									<span>Degree</span>
									<small className="text-danger">required field*</small>
								</Form.Label>
								<Form.Control
									type="text"
									name="degree"
									value={degree}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label className="d-flex justify-content-between">
									<span>Field Of Study</span>
									<small className="text-danger">required field*</small>
								</Form.Label>
								<Form.Control
									type="text"
									name="fieldOfStudy"
									value={fieldOfStudy}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label className="d-flex justify-content-between">
									<span>From Date</span>
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
						<Col lg={12}>
							<Form.Group className="mb-3">
								<Form.Label>To Date</Form.Label>
								<Form.Control
									type="date"
									name="to"
									value={to}
									onChange={(e) => onChange(e)}
								></Form.Control>
							</Form.Group>
						</Col>
						<Col lg={12}>
							<Form.Group className="mb-3">
								<Form.Label>Job Education</Form.Label>
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
						<Col lg={12}>
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

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
