import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MessageCircle, ThumbsDown, ThumbsUp, Trash } from "react-feather";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PostItem = ({
	auth,
	post: { name, avatar, likes, comments, createdAt, content, user },
}) => {
	return (
		<Card className="rounded shadow h-100">
			<Card.Body>
				<Card.Text>
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
					{/* <i>
						<small>
							<Moment format="YYYY/MM/DD"> {createdAt}</Moment>
						</small>
					</i> */}
					<div className="d-flex align-items-center mt-4">
						<div className="rounded-pill py-1 px-3 bg-light text-secondary d-flex align-items-center me-2">
							<ThumbsUp className="me-2" width={14} height={14} />
							<small>{likes.length}</small>
						</div>
						<div className="rounded-pill py-2 px-3 bg-light text-secondary d-flex align-items-center me-2">
							<ThumbsDown width={15} height={15} />
						</div>
						<div className="rounded-pill py-1 px-3 bg-light text-secondary d-flex align-items-center">
							<MessageCircle className="me-2" width={15} height={15} />
							<small>{comments.length}</small>
						</div>
					</div>
				</Card.Text>
				{!auth.loading && auth.user._id === user && (
					<Card.Link as="div" className="mt-4">
						<Button className=" btn btn-danger rounded-pill py-2 w-100">
							<small>Delete</small>
						</Button>
					</Card.Link>
				)}
			</Card.Body>
		</Card>
	);
};

PostItem.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
