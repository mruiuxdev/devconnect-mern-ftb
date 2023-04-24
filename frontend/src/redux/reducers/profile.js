import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

// eslint-disable-next-line
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: true,
				profile: null,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				loading: true,
				profile: null,
				repos: [],
			};
		default:
			return state;
	}
}
