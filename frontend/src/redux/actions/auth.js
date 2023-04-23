import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) setAuthToken(localStorage.token);

	try {
		const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth`);

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({ AUTH_ERROR });
	}
};

export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const config = { headers: { "Content-Type": "application/json" } };

		const body = JSON.stringify({ name, email, password });

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/register`,
				body,
				config
			);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors)
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

			dispatch({ type: REGISTER_FAIL });
		}
	};
