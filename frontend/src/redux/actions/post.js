import axios from "axios";
import {
	ADD_COMMENT,
	ADD_POST,
	DELETE_COMMENT,
	DELETE_POST,
	GET_POST,
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
} from "./types";
import { setAlert } from "./alert";

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);

		dispatch({
			type: GET_POSTS,
			payload: res.data.posts,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`);

		dispatch({
			type: GET_POST,
			payload: res.data.post,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(
			`${process.env.REACT_APP_API_URL}/post/like/${id}`
		);

		dispatch({
			type: UPDATE_LIKES,
			payload: {
				id,
				likes: res.data.likes,
			},
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const removeLike = (id) => async (dispatch) => {
	try {
		const res = await axios.put(
			`${process.env.REACT_APP_API_URL}/post/unlike/${id}`
		);

		dispatch({
			type: UPDATE_LIKES,
			payload: {
				id,
				likes: res.data.likes,
			},
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addPost = (formData) => async (dispatch) => {
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/post/create`,
			formData
		);

		dispatch({
			type: ADD_POST,
			payload: res.data.newPost,
		});

		dispatch(setAlert("Post Created", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`${process.env.REACT_APP_API_URL}/post/${id}`);

		dispatch({
			type: DELETE_POST,
			payload: id,
		});

		dispatch(setAlert("Post Removed", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const addComment = (id, formData) => async (dispatch) => {
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/post/comment/${id}`,
			formData
		);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data.comment,
		});

		dispatch(setAlert("Comment Added", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		await axios.delete(
			`${process.env.REACT_APP_API_URL}/post/comment/${postId}/${commentId}`
		);

		dispatch({
			type: DELETE_COMMENT,
			payload: commentId,
		});

		dispatch(setAlert("Comment Removed", "success"));
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
