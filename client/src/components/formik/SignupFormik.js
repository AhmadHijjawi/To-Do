import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import Signup from "../../pages/signup";
import { login } from "../../redux/actions/user";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const dispatch = useDispatch();
  const handleLogin = (user) => {
    dispatch(login(user));
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(3).max(50),
      email: Yup.string().required(),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3002/users/signup", values)
        .then((res) => {
          handleLogin(res.data.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(values);
      navigate("/");
    },
  });

  return (
    <>
      <Signup
        values={formik.values}
        onSubmit={formik.handleSubmit}
        errors={formik.errors}
        handleChange={formik.handleChange}
      />
    </>
  );
}

export default SignupForm;
