import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "react-feather";
import { createUpdateProfile } from "../../redux/actions/profile";
import styles from "./Profile.module.scss";
import CustomAlert from "../alert/CustomAlert";

const { profile } = styles;

const CreateProfile = ({ createUpdateProfile, history }) => {
	const [formData, setFormData] = useState({
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubUsername: "",
		bio: "",
		twitter: "",
		facebook: "",
		instagram: "",
		linkdein: "",
		youtube: "",
	});

	const [displaySocialLinks, toggleSocialLinks] = useState(false);

	const {
		company,
		website,
		location,
		status,
		skills,
		githubUsername,
		bio,
		twitter,
		facebook,
		instagram,
		linkdein,
		youtube,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createUpdateProfile(formData, history);
	};

	return (
		<div className={`${profile} section`}>
			<Container>
				<div className="heading">
					<h1 className="fw-bolder">Create Profile</h1>
				</div>
				<p>Let's get some information to make your profile stands out</p>
				<CustomAlert className="w-100" />
				<Form onSubmit={(e) => onSubmit(e)}>
					<Row>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label className="d-flex justify-content-between">
									<span>Professional Status</span>{" "}
									<small className="text-danger">required field*</small>
								</Form.Label>
								<Form.Control
									as="select"
									name="status"
									value={status}
									onChange={(e) => onChange(e)}
								>
									<option>* Select Professional Status</option>
									<option value="Developer">Developer</option>
									<option value="Junior Developer">Junior Developer</option>
									<option value="Senior Developer">Senior Developer</option>
									<option value="Manager">Manager</option>
									<option value="Student or Learning">
										Student or Learning
									</option>
									<option value="Instructor">Instructor or Teacher</option>
									<option value="Intern">Intern</option>
									<option value="Other">Other</option>
								</Form.Control>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label>Company</Form.Label>
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
								<Form.Label>Website</Form.Label>
								<Form.Control
									type="text"
									name="website"
									value={website}
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
								<small>City & state suggested (eg. Boston, MA)</small>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label>Skills</Form.Label>
								<Form.Control
									type="text"
									name="skills"
									value={skills}
									onChange={(e) => onChange(e)}
								></Form.Control>
								<small>
									Please use comma separated values (eg. HTML, CSS, JavaScript)
								</small>
							</Form.Group>
						</Col>
						<Col lg={6}>
							<Form.Group className="mb-3">
								<Form.Label>Github Username</Form.Label>
								<Form.Control
									type="text"
									name="githubUsername"
									value={githubUsername}
									onChange={(e) => onChange(e)}
								></Form.Control>
								<small>
									If you want your latest repos and a Github link, please
									include your username
								</small>
							</Form.Group>
						</Col>
						<Col lg={12}>
							<Form.Group className="mb-3">
								<Form.Label>Bio</Form.Label>
								<Form.Control
									as="textarea"
									rows={4}
									name="bio"
									className="rounded"
									value={bio}
									onChange={(e) => onChange(e)}
								></Form.Control>
								<small>Tell us a little about yourself</small>
							</Form.Group>
						</Col>
						<Col lg={12}>
							<Form.Group className="mb-5">
								<div className="d-flex align-items-center mb-3">
									<Button
										variant="secondary"
										type="button"
										className="text-white rounded-pill"
										onClick={() => toggleSocialLinks(!displaySocialLinks)}
									>
										{!displaySocialLinks
											? "Add Social Network Links"
											: "Hide Social Network Links"}
									</Button>
									<small className="ms-2">Optional</small>
								</div>
								{displaySocialLinks && (
									<>
										<Form.Group className="mb-2">
											<Form.Label className="d-flex align-items-center">
												<Twitter className="me-2" /> <span>Twitter URL</span>
											</Form.Label>
											<Form.Control
												type="text"
												name="twitter"
												value={twitter}
												onChange={(e) => onChange(e)}
											></Form.Control>
										</Form.Group>
										<Form.Group className="mb-2">
											<Form.Label className="d-flex align-items-center">
												<Facebook className="me-2" /> <span>Facebook URL</span>
											</Form.Label>
											<Form.Control
												type="text"
												name="facebook"
												value={facebook}
												onChange={(e) => onChange(e)}
											></Form.Control>
										</Form.Group>
										<Form.Group className="mb-2">
											<Form.Label className="d-flex align-items-center">
												<Linkedin className="me-2" /> <span>Linkdein URL</span>
											</Form.Label>
											<Form.Control
												type="text"
												name="linkdein"
												value={linkdein}
												onChange={(e) => onChange(e)}
											></Form.Control>
										</Form.Group>
										<Form.Group className="mb-2">
											<Form.Label className="d-flex align-items-center">
												<Instagram className="me-2" />{" "}
												<span>Instagram URL</span>
											</Form.Label>
											<Form.Control
												type="text"
												name="instagram"
												value={instagram}
												onChange={(e) => onChange(e)}
											></Form.Control>
										</Form.Group>
										<Form.Group className="mb-2">
											<Form.Label className="d-flex align-items-center">
												<Youtube className="me-2" /> <span>Youtube URL</span>
											</Form.Label>
											<Form.Control
												type="text"
												name="youtube"
												value={youtube}
												onChange={(e) => onChange(e)}
											></Form.Control>
										</Form.Group>
									</>
								)}
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
								>
									Create
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Container>
		</div>
	);
};

CreateProfile.propTypes = { createUpdateProfile: PropTypes.func.isRequired };

export default connect(null, { createUpdateProfile })(CreateProfile);
