import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import data from "./profile";
import post from "./post";

export default combineReducers({
	alert,
	auth,
	data,
	post,
});
