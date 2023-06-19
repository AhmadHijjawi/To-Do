import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import Login from "../../pages/login";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("LoggedUser"));
    console.log(user);
    if (user !== null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (user) => {
    dispatch(login(user));
    navigate("/");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      setLoading(true);

      axios
        .post("http://localhost:3002/users/login", values)
        .then((res) => {
          console.log(res.data.data.user);
          handleLogin(res.data.data.user);
          setLoading(true);
        })
        .catch((error) => {
          setLoading(true);
          setReqError(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className='text-center'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'></span>
            </div>
          </div>
        </div>
      ) : (
        <Login
          values={formik.values}
          onSubmit={formik.handleSubmit}
          errors={formik.errors}
          handleChange={formik.handleChange}
          errorMessage={reqError}
        />
      )}
    </>
  );
}

export default LoginForm;
