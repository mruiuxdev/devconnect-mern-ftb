import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getPosts } from "../../redux/actions/post";
import Shimmer from "../shimmer/Shimmer";
import PostItem from "./PostItem";
import CustomAlert from "../alert/CustomAlert";
import PostForm from "./PostForm";

const Posts = ({ getPosts, posts: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<div className="section">
			<Container>
				<CustomAlert />
				<div className="heading">
					<h1>Posts</h1>
				</div>
				{loading ? (
					<Shimmer />
				) : (
					<div className="mt-4">
						<Row>
							<div className="mb-4">
								<PostForm />
							</div>
							{posts.map((post) => (
								<Col xl={3} lg={4} md={6} key={post._id}>
									<PostItem post={post} />
								</Col>
							))}
						</Row>
					</div>
				)}
			</Container>
		</div>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	posts: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
