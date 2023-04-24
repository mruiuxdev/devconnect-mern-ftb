import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

export const getProfile = () => async (dispatch) => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
