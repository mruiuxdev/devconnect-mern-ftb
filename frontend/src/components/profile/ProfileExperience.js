import PropTypes from "prop-types";
import Moment from "react-moment";
import { Calendar, Code, Codesandbox, MapPin } from "react-feather";

const ProfileExperience = ({ experience: { experience } }) => {
	return (
		<>
			{experience.length > 0 && (
				<div className="p-4 rounded shadow mt-4">
					<h5 className="fw-bold mb-2 text-primary">Experiences</h5>
					<div>
						{experience.map((exp) => {
							const { _id, title, company, location, from, to, description } =
								exp;

							return (
								<div className="py-2" key={_id}>
									<div className="fw-bold d-flex align-items-center mb-2">
										<Code className="me-2" /> <span>Title: {title}</span>
									</div>
									<div className="fw-bold d-flex align-items-center mb-2">
										<Codesandbox className="me-2" />
										<span>Company: {company}</span>
									</div>
									<div className="fw-bold d-flex align-items-center mb-2">
										<MapPin className="me-2" />
										<span>Location: {location}</span>
									</div>
									<div className="fw-bold d-flex align-items-center mb-2">
										<Calendar className="me-2" />
										<span>
											From:{" "}
											<Moment format="YYYY/MM/DD" className="ms-1">
												{from}
											</Moment>
										</span>
										<span className="ms-1">
											{!to ? (
												<>
													- To: <Moment format="YYYY/MM/DD">{to}</Moment>
												</>
											) : (
												" - To: For Now"
											)}
										</span>
									</div>
									<div className=" mb-2">{description}</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};

ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
