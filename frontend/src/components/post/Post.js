import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";
import { Calendar, ThumbsDown, ThumbsUp } from "react-feather";
import Shimmer from "../shimmer/Shimmer";
import { getPost, addLike, removeLike } from "../../redux/actions/post";
import CommentForm from "./CommentForm";
import CustomAlert from "../alert/CustomAlert";
import CommentItem from "./CommentItem";

const Post = ({ post: { post, loading }, getPost, addLike, removeLike }) => {
	let postId = useParams();

	useEffect(() => {
		getPost(postId.id);
	}, [getPost, postId.id]);

	const handleAddLike = async (postId) => {
		await addLike(postId);
		getPost(postId);
	};

	const handleRemoveLike = async (postId) => {
		await removeLike(postId);
		getPost(postId);
	};

	return (
		<div className="section">
			<Container>
				{loading || post === null ? (
					<Shimmer />
				) : (
					<>
						<CustomAlert />
						<div className="bg-white shadow rounded p-4">
							<div className="d-flex align-items-center">
								<img
									src={post.avatar}
									alt={post.name}
									width={50}
									height={50}
									className="rounded-pill me-2"
								/>
								{post.name}
							</div>
							<div className="d-flex justify-content-between align-items-center mt-2">
								<div className="d-flex align-items-center">
									<Calendar className="me-2" width={15} height={15} />
									Posted on <Moment format="DD MMM">{post.createdAt}</Moment>
								</div>
								<div className="d-flex align-items-center">
									<Button
										className="rounded-pill py-1 px-3 border-0 bg-light text-secondary d-flex align-items-center me-2"
										onClick={() => handleAddLike(post._id)}
									>
										<ThumbsUp className="me-2" width={14} height={14} />
										{<small>{post.likes.length}</small>}
									</Button>
									<Button
										className="rounded-pill py-2 border-0 px-3 bg-light text-secondary d-flex align-items-center me-2"
										onClick={() => handleRemoveLike(post._id)}
									>
										<ThumbsDown width={14} height={14} />
									</Button>
								</div>
							</div>
							<div className="mt-3">{post.content}</div>
						</div>
						<div className="mt-4">
							<CommentForm postId={post._id} />
						</div>
						{post.comments.length > 0 && (
							<div className="mt-4">
								{post.comments.map((comment) => (
									<CommentItem comment={comment} postId={post._id} />
								))}
							</div>
						)}
					</>
				)}
			</Container>
		</div>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { getPost, addLike, removeLike })(Post);
