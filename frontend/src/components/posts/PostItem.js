import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Calendar, MessageCircle, ThumbsDown, ThumbsUp } from "react-feather";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../redux/actions/post";

const PostItem = ({
	auth,
	post: { _id, name, avatar, likes, comments, createdAt, content, user },
	addLike,
	removeLike,
	deletePost,
}) => {
	return (
		<Card className="rounded shadow h-100">
			<Card.Body className="d-flex flex-column justify-content-between">
				<div>
					<Link
						to={`/post/${_id}`}
						className="flex-column text-decoration-none text-third align-items-start"
					>
						{content.substring(0, 100) + "..."}
						<div className="d-flex align-items-center mt-2">
							<img
								src={avatar}
								width={30}
								height={30}
								alt={name}
								className="rounded-pill me-2"
							/>
							<small>{name}</small>
						</div>
						<i>
							<small className="d-flex align-items-center ms-2">
								<Calendar width={15} height={15} className="me-2" />{" "}
								<Moment format="MMM D">{createdAt}</Moment>
							</small>
						</i>
					</Link>
					<div className="d-flex align-items-center mt-4">
						<Button
							className="rounded-pill py-1 px-3 border-0 bg-light text-secondary d-flex align-items-center me-2"
							onClick={() => addLike(_id)}
						>
							<ThumbsUp className="me-2" width={14} height={14} />
							{<small>{likes.length}</small>}
						</Button>
						<Button
							className="rounded-pill py-2 border-0 px-3 bg-light text-secondary d-flex align-items-center me-2"
							onClick={() => removeLike(_id)}
						>
							<ThumbsDown width={14} height={14} />
						</Button>
						<div className="rounded-pill py-1 px-3 bg-light text-secondary d-flex align-items-center">
							<MessageCircle className="me-2" width={14} height={14} />
							<small>{comments.length}</small>
						</div>
					</div>
				</div>
				{!auth.loading && auth.user._id === user && (
					<Button
						className=" btn btn-danger rounded-pill py-2 w-100 mt-3"
						onClick={() => deletePost(_id)}
					>
						<small>Delete</small>
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

PostItem.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
