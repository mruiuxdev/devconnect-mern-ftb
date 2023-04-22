import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { User } from "react-feather";
import styles from "./Auth.module.scss";

const { auth } = styles;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
    } else {
      console.log("Success");
    }
  };

  return (
    <div className={`${auth} d-flex align-items-center`}>
      <Container>
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="shadow rounded-3 border-0">
              <Card.Body>
                <Card.Title className="mb-3 text-primary mb-3 text-center">
                  Sign Up
                </Card.Title>
                <p className="d-flex align-items-center justify-content-center text-secondary mb-4 text-center">
                  <User className="me-2" /> Create your account
                </p>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                      required
                    ></Form.Control>
                  </Form.Group>
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
                  <Form.Group className="mb-5">
                    <Form.Label htmlFor="confirmPassword">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      minLength={6}
                      value={confirmPassword}
                      required
                      onChange={(e) => onChange(e)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="text-white rounded-pill w-100 mb-3"
                  >
                    Register
                  </Button>
                  <p className="text-center mb-0">
                    Already have an account!{" "}
                    <Link to="/login" className="text-link">
                      Login
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

export default Register;
