import axios from "axios";
import { GET_POSTS, POST_ERROR } from "./types";

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
