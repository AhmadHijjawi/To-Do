import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "../components/formik/LoginFormik";
import SignupForm from "../components/formik/SignupFormik";
import Home from "./home.js";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' exact element={<LoginForm />} />
        <Route path='/signup' exact element={<SignupForm />} />
        <Route path='/' exact element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
