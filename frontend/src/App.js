import { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./redux/actions/auth";
import Menu from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import "./App.scss";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<>
			<Provider store={store}>
				<Menu />
				<Routes>
					<Route exact path="/" element={<Header />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
					<Route
						exact
						path="/dashboard"
						element={<PrivateRoute component={Dashboard} />}
					/>
					<Route
						exact
						path="/create-profile"
						element={<PrivateRoute component={CreateProfile} />}
					/>
					<Route
						exact
						path="/edit-profile"
						element={<PrivateRoute component={EditProfile} />}
					/>
				</Routes>
			</Provider>
		</>
	);
};

export default App;
