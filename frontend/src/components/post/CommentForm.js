import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { addComment } from "../../redux/actions/post";
import Button from "react-bootstrap/esm/Button";

const CommentForm = ({ addComment, postId }) => {
	const [comment, setComment] = useState("");

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();

				addComment(postId, { content: comment }).then(() => setComment(""));
			}}
		>
			<Form.Group className="mb-2">
				<Form.Control
					className="rounded"
					as="textarea"
					rows={2}
					name="comment"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
				/>
			</Form.Group>
			<Button type="submit" className="text-white rounded-pill ms-auto">
				Add Comment
			</Button>
		</Form>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
