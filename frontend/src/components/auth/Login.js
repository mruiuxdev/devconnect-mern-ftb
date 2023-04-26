import { useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../../redux/actions/auth";
import { User } from "react-feather";
import styles from "./Auth.module.scss";
import CustomAlert from "../alert/CustomAlert";

const { auth } = styles;

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		login(email, password);
	};

	if (isAuthenticated) return <Navigate to="/dashboard" />;

	return (
		<div className={`${auth} section d-flex align-items-center`}>
			<Container>
				<Row className="justify-content-center">
					<Col lg="6" md="8">
						<CustomAlert />
						<Card className="shadow rounded-3 border-0">
							<Card.Body>
								<Card.Title className="mb-4 text-primary mb-3 text-center">
									Login
								</Card.Title>
								<p className="d-flex align-items-center justify-content-center text-secondary mb-4 text-center">
									<User className="me-2" /> Sign into your account
								</p>
								<Form onSubmit={(e) => onSubmit(e)}>
									<Form.Group className="mb-3">
										<Form.Label htmlFor="email">Email Address</Form.Label>
										<Form.Control
											type="email"
											name="email"
											value={email}
											required
											onChange={(e) => onChange(e)}
										></Form.Control>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label htmlFor="password">Password</Form.Label>
										<Form.Control
											type="password"
											name="password"
											minLength={6}
											value={password}
											required
											onChange={(e) => onChange(e)}
										></Form.Control>
									</Form.Group>
									<Button
										variant="primary"
										type="submit"
										className="text-white rounded-pill w-100 mb-3"
									>
										Login
									</Button>
									<p className="text-center mb-0">
										Don't have an account!
										<Link to="/register" className="text-link d-inline-block">
											Register
										</Link>
									</p>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateProps, { login })(Login);
