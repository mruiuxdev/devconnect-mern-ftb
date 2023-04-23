import { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Menu from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./redux/actions/auth";

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
					<Route path="/" element={<Header />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Provider>
		</>
	);
};

export default App;
