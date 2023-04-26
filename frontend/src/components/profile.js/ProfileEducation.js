import PropTypes from "prop-types";
import Moment from "react-moment";
import { Award, Calendar, FileText, MapPin } from "react-feather";

const ProfileEducation = ({ education }) => {
	return (
		<>
			{education.profile.education.length > 0 && (
				<div className="p-4 rounded shadow mt-4">
					<h5 className="fw-bold mb-2 text-primary">Educations</h5>
					{education.profile.education.map((edu) => (
						<div className="py-2 border-bottom" key={edu._id}>
							<div className="fw-bold d-flex align-items-center mb-2">
								<FileText className="me-2" /> <span>Title: {edu.school}</span>
							</div>
							<div className="fw-bold d-flex align-items-center mb-2">
								<Award className="me-2" />
								<span>
									Degree: {edu.degree} - {edu.fieldOfStudy}
								</span>
							</div>
							<div className="fw-bold d-flex align-items-center mb-2">
								<MapPin className="me-2" />
								<span>Location: {edu.location}</span>
							</div>
							<div className="fw-bold d-flex align-items-center mb-2">
								<Calendar className="me-2" />
								<span>
									From:{" "}
									<Moment format="YYYY/MM/DD" className="ms-1">
										{edu.from}
									</Moment>
								</span>
								<span className="ms-1">
									To:{" "}
									<Moment format="YYYY/MM/DD" className="ms-1">
										{edu.to}
									</Moment>
								</span>
							</div>
							<div className=" mb-2">{edu.description}</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

ProfileEducation.propTypes = {
	education: PropTypes.array.isRequired,
};

export default ProfileEducation;
