import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "react-bootstrap/Alert";

const CustomAlert = ({ alerts, ...rest }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map((alert) => {
		return (
			<Alert
				key={alert.id}
				variant={alert.alertType}
				className="w-100"
				{...rest}
			>
				{alert.message}
			</Alert>
		);
	});

CustomAlert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateProps = (state) => ({ alerts: state.alert });

export default connect(mapStateProps)(CustomAlert);
