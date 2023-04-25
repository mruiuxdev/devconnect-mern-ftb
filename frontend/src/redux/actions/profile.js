import axios from "axios";
import {
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
} from "./types";
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
	(formData, edit = true) =>
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

export const addExperience = (formData) => async (dispatch) => {
	try {
		const res = await axios.put(
			`${process.env.REACT_APP_API_URL}/profile/experience`,
			formData
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Experience Added", "success"));
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

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_API_URL}/profile/experience/${id}`
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Experience Deleted", "success"));
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

export const addEducation = (formData) => async (dispatch) => {
	try {
		const res = await axios.put(
			`${process.env.REACT_APP_API_URL}/profile/education`,
			formData
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Education Added", "success"));
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

export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(
			`${process.env.REACT_APP_API_URL}/profile/education/${id}`
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Education Deleted", "success"));
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

export const deleteAccount = () => async (dispatch) => {
	if (window.confirm("Are you sure? This can not undo!"))
		try {
			const res = await axios.delete(
				`${process.env.REACT_APP_API_URL}/profile`
			);

			dispatch({ type: CLEAR_PROFILE });

			dispatch({ type: ACCOUNT_DELETED });

			dispatch(setAlert("Your account has been permanently deleted"));
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
