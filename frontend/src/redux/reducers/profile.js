import {
	CLEAR_PROFILE,
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	GET_REPOS,
	NO_REPOS,
} from "../actions/types";

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
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case GET_PROFILES: {
			return {
				...state,
				profiles: payload,
				loading: false,
			};
		}
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
		case GET_REPOS:
			return {
				...state,
				repos: payload,
				loading: false,
			};
		case NO_REPOS:
			return {
				...state,
				repos: [],
			};
		default:
			return state;
	}
}
