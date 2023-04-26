import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Share2 } from "react-feather";
import { allProfiles } from "../../redux/actions/profile";
import Shimmer from "../shimmer/Shimmer";
import ProfileItem from "./ProfileItem";

const Profiles = ({
	allProfiles,
	profile: {
		profiles: { profiles },
		loading,
	},
}) => {
	useEffect(() => {
		allProfiles();
	}, [allProfiles]);

	return (
		<div className="section">
			<Container>
				<div className="heading">
					<h1>Developers</h1>
				</div>
				<p className="d-flex align-items-center">
					<Share2 className="me-1" style={{ width: "20px", height: "20px" }} />
					<span>Browse and connect with developers</span>
				</p>
				{loading ? (
					<Row>
						{[1, 2, 3, 4, 6, 7, 8].map((i) => (
							<Col lg={4} md={6} key={i}>
								<Shimmer />
							</Col>
						))}
					</Row>
				) : (
					<>
						{profiles && profiles.length > 0 ? (
							<Row className="mt-4">
								{profiles.map((profile) => (
									<Col xl={3} lg={4} md={6} key={profile._id}>
										<ProfileItem profile={profile} />
									</Col>
								))}
							</Row>
						) : (
							<Alert className="alert alert-info">No profiles added</Alert>
						)}
					</>
				)}
			</Container>
		</div>
	);
};

Profiles.propTypes = {
	allProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ profile: state.profile });

export default connect(mapStateToProps, { allProfiles })(Profiles);
