import PropTypes from "prop-types";
import Moment from "react-moment";
import { Calendar, Code, Codesandbox, MapPin } from "react-feather";

const ProfileExperience = ({ experience }) => {
	return (
		<>
			{experience.experience.length > 0 && (
				<div className="p-4 rounded shadow mt-4">
					<h5 className="fw-bold mb-2 text-primary">Experiences</h5>
					{experience.experience.map((exp) => (
						<div className="py-2 border-bottom" key={exp._id}>
							<div className="fw-bold d-flex align-items-center mb-2">
								<Code className="me-2" /> <span>Title: {exp.title}</span>
							</div>
							<div className="fw-bold d-flex align-items-center mb-2">
								<Codesandbox className="me-2" />
								<span>Company: {exp.company}</span>
							</div>
							<div className="fw-bold d-flex align-items-center mb-2">
								<MapPin className="me-2" />
								<span>Location: {exp.location}</span>
							</div>
							<div className="fw-bold d-flex align-items-center mb-2">
								<Calendar className="me-2" />
								<span>
									From:{" "}
									<Moment format="YYYY/MM/DD" className="ms-1">
										{exp.from}
									</Moment>
								</span>
								<span className="ms-1">
									{!exp.to ? (
										<>
											- To: <Moment format="YYYY/MM/DD">{exp.to}</Moment>
										</>
									) : (
										" - To: For Now"
									)}
								</span>
							</div>
							<div className=" mb-2">{exp.description}</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
