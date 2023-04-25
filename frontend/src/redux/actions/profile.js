import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR } from "./types";
import { setAlert } from "./alert";

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

export const createUpdateProfile =
	(formData, history, edit = false) =>
	async (dispatch) => {
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/profile`,
				formData
			);

			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});

			dispatch(
				setAlert(edit ? "Profile Updated" : "Profile Created", "success")
			);

			// if (!edit) history.push("/dashboard");
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors)
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};
