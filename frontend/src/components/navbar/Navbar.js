import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Codesandbox, LogOut } from "react-feather";
import { logout } from "../../redux/actions/auth";

const Menu = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<>
			<Nav.Link as="span">
				<Link
					to="/dashboard"
					className="btn btn-primary text-white rounded-pill py-2"
				>
					<Codesandbox className="me-2" />{" "}
					<span className="d-md-inline-block d-none">Dashboard</span>
				</Link>
			</Nav.Link>
			<Nav.Link
				onClick={logout}
				as="span"
				className="d-flex align-items-center"
			>
				<LogOut className="me-2" />{" "}
				<span className="d-md-inline-block d-none">Logout</span>
			</Nav.Link>
		</>
	);

	const guestLinks = (
		<>
			<Nav.Link href="#home">Developers</Nav.Link>
			<Nav.Link as="span">
				<Link
					to="/register"
					className="btn btn-primary text-white rounded-pill py-2"
				>
					Register
				</Link>
			</Nav.Link>
			<Nav.Link as="span">
				<Link
					to="/login"
					className="btn btn-outline-secondary rounded-pill py-2"
				>
					Login
				</Link>
			</Nav.Link>
		</>
	);

	return (
		<Navbar bg="white" expand="lg" sticky="top" className="shadow-sm">
			<Container fluid>
				<Navbar.Brand as="span" className="fw-bold text-primary h1 mb-0 ">
					<Link className="text-decoration-none" to="/">
						DevConnect
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto d-flex align-items-center">
						{!loading && isAuthenticated ? authLinks : guestLinks}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

Menu.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Menu);
