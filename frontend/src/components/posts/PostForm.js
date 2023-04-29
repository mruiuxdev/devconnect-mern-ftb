import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { addPost } from "../../redux/actions/post";
import Button from "react-bootstrap/esm/Button";

const PostForm = ({ addPost }) => {
	const [postContent, setPostContent] = useState("");

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();

				addPost({ content: postContent }).then(() => setPostContent(""));
			}}
		>
			<Form.Group className="mb-2">
				<Form.Label>
					<h5 className="text-secondary">New Post</h5>
				</Form.Label>
				<Form.Control
					className="rounded"
					as="textarea"
					rows={2}
					name="postContent"
					value={postContent}
					onChange={(e) => setPostContent(e.target.value)}
					required
				/>
			</Form.Group>
			<Button type="submit" className="text-white rounded-pill ms-auto">
				Add Post
			</Button>
		</Form>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
