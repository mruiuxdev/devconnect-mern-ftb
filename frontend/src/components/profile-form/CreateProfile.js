import PropTypes from "prop-types";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "react-feather";
import styles from "./Profile.module.scss";

const { profile } = styles;

const CreateProfile = (props) => {
	const [formData, setFormData] = useState({
		company: "",
		website: "",
		location: "",
		status: "",
		githubUsername: "",
		bio: "",
		twitter: "",
		facebook: "",
		instagram: "",
		linkdein: "",
		youtube: "",
	});

	const {
		company,
		website,
		location,
		status,
		githubUsername,
		bio,
		twitter,
		facebook,
		instagram,
		linkdein,
		youtube,
	} = formData;

	return (
		<div className={`${profile} section`}>
			<Container>
				<div className="heading">
					<h1 className="fw-bolder">Create Profile</h1>
				</div>
				<p>Let's get some information to make your profile stands out</p>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label className="d-flex justify-content-between">
							<span>Professional Status</span>{" "}
							<small className="text-danger">required field*</small>
						</Form.Label>
						<Form.Control as="select" name="status">
							<option>* Select Professional Status</option>
							<option value="Developer">Developer</option>
							<option value="Junior Developer">Junior Developer</option>
							<option value="Senior Developer">Senior Developer</option>
							<option value="Manager">Manager</option>
							<option value="Student or Learning">Student or Learning</option>
							<option value="Instructor">Instructor or Teacher</option>
							<option value="Intern">Intern</option>
							<option value="Other">Other</option>
						</Form.Control>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Company</Form.Label>
						<Form.Control type="text" name="company"></Form.Control>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Website</Form.Label>
						<Form.Control type="text" name="website"></Form.Control>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Location</Form.Label>
						<Form.Control type="text" name="location"></Form.Control>
						<small>City & state suggested (eg. Boston, MA)</small>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Skills</Form.Label>
						<Form.Control type="text" name="skills"></Form.Control>
						<small>
							Please use comma separated values (eg. HTML, CSS, JavaScript)
						</small>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Github Username</Form.Label>
						<Form.Control type="text" name="githubUserName"></Form.Control>
						<small>
							If you want your latest repos and a Github link, please include
							your username
						</small>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Bio</Form.Label>
						<Form.Control
							as="textarea"
							rows={4}
							name="bio"
							className="rounded"
						></Form.Control>
						<small>Tell us a little about yourself</small>
					</Form.Group>
					<Form.Group className="mb-5">
						<div className="d-flex align-items-center mb-3">
							<Button
								variant="primary"
								type="submit"
								className="text-white rounded-pill"
							>
								Add Social Network Link
							</Button>
							<small className="ms-2">Optional</small>
						</div>
						<Form.Group className="mb-2">
							<Form.Label className="d-flex align-items-center">
								<Twitter className="me-2" /> <span>Twitter URL</span>
							</Form.Label>
							<Form.Control type="text" name="twitter"></Form.Control>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label className="d-flex align-items-center">
								<Facebook className="me-2" /> <span>Facebook URL</span>
							</Form.Label>
							<Form.Control type="text" name="facebook"></Form.Control>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label className="d-flex align-items-center">
								<Linkedin className="me-2" /> <span>Linkdein URL</span>
							</Form.Label>
							<Form.Control type="text" name="linkdein"></Form.Control>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label className="d-flex align-items-center">
								<Instagram className="me-2" /> <span>Instagram URL</span>
							</Form.Label>
							<Form.Control type="text" name="instagram"></Form.Control>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label className="d-flex align-items-center">
								<Youtube className="me-2" /> <span>Youtube URL</span>
							</Form.Label>
							<Form.Control type="text" name="youtube"></Form.Control>
						</Form.Group>
					</Form.Group>
					<Button
						variant="primary"
						type="submit"
						className="text-white rounded-pill w-100 mb-3"
					>
						Create
					</Button>
				</Form>
			</Container>
		</div>
	);
};

CreateProfile.propTypes = {};

export default CreateProfile;
