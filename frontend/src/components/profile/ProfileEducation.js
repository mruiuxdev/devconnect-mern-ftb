import PropTypes from "prop-types";
import Moment from "react-moment";
import { Award, Calendar, FileText, MapPin } from "react-feather";

const ProfileEducation = ({ education: { education } }) => {
	return (
		<>
			{education.length > 0 && (
				<div className="p-4 rounded shadow mt-4">
					<h5 className="fw-bold mb-2 text-primary">Educations</h5>
					<div>
						{education.map((edu) => {
							const {
								_id,
								school,
								degree,
								fieldOfStudy,
								location,
								from,
								to,
								description,
							} = edu;

							return (
								<div className="py-2" key={_id}>
									<div className="fw-bold d-flex align-items-center mb-2">
										<FileText className="me-2" /> <span>Title: {school}</span>
									</div>
									<div className="fw-bold d-flex align-items-center mb-2">
										<Award className="me-2" />
										<span>
											Degree: {degree} - {fieldOfStudy}
										</span>
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
											To:{" "}
											<Moment format="YYYY/MM/DD" className="ms-1">
												{to}
											</Moment>
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

ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired,
};

export default ProfileEducation;
