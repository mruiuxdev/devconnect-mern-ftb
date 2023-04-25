import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
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
		dispatch({ type: AUTH_ERROR });
	}
};

export const register =
	({ name, email, password }) =>
	async (dispatch) => {
		const body = { name, email, password };

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API_URL}/register`,
				body
			);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors)
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

			dispatch({ type: REGISTER_FAIL });
		}
	};

export const login = (email, password) => async (dispatch) => {
	const body = { email, password };

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_API_URL}/login`,
			body
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors)
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

		dispatch({ type: LOGIN_FAIL });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
	dispatch({ type: CLEAR_PROFILE });
};
