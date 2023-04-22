import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Menu from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AlertComponent from "./components/alert/Alert";

const App = () => {
  return (
    <>
      <Menu />
      <AlertComponent />
      <Routes>
        <Route exact path="/" element={<Header />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
