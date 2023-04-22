import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "react-bootstrap/Alert";

const AlertComponent = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <Alert key={alert.id} variant={alert.alertType}>
      {alert.message}
    </Alert>
  ));

AlertComponent.propTypes = {
  alerts: PropTypes.func.isRequired,
};

const mapStateProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateProps)(AlertComponent);
