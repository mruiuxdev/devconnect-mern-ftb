import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
}) => {
	const navigate = useNavigate();

	return isAuthenticated && !loading ? <Component /> : navigate(-1);
};

PrivateRoute.propTypes = { auth: PropTypes.object.isRequired };

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
