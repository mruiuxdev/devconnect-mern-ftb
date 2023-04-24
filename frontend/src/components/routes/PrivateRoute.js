import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
}) => (isAuthenticated && !loading ? <Component /> : <Navigate to="/login" />);

PrivateRoute.propTypes = { auth: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
