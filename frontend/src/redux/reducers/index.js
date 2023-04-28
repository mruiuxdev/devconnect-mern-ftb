import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import data from "./profile";

export default combineReducers({
	alert,
	auth,
	data,
});
