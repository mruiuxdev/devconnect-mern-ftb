import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { deleteComment } from "../../redux/actions/post";

const CommentItem = ({
	auth,
	postId,
	deleteComment,
	comment: { _id, user, content, name, date, avatar },
}) => {
	return (
		<div className="p-4 rounded border mb-3 bg-white" key={_id}>
			{content}
			<div className="d-flex mt-2 align-items-center justify-content-between">
				<Link
					to={`/profile/${user}`}
					className="d-flex align-items-center text-decoration-none text-third"
				>
					<img
						src={avatar}
						alt={name}
						width={20}
						height={20}
						className="rounded-pill me-2"
					/>
					<small>{name}</small>
				</Link>
				<small>
					Commented on <Moment format="DD MMM">{date}</Moment>
				</small>
			</div>
			{!auth.loading && user === auth.user._id && (
				<Button
					className="btn btn-danger mt-4 ms-auto py-2 rounded-pill"
					onClick={() => deleteComment(postId, _id)}
				>
					Delete
				</Button>
			)}
		</div>
	);
};

CommentItem.propTypes = {
	auth: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	postId: PropTypes.number.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
