import React from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={props.onSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign In</h3>
          <div className='form-group mt-3'>
            <label>Name</label>
            {props.errors?.name ? (
              <div style={{ color: "red" }}>{props.errors.name}</div>
            ) : null}
            <input
              type='text'
              id='name'
              name='name'
              className='form-control mt-1'
              value={props.values.name}
              onChange={props.handleChange}
              placeholder='Your Name'
            />
          </div>
          <div className='form-group mt-3'>
            <label>Email address</label>
            {props.errors?.email ? (
              <div style={{ color: "red" }}>{props.errors.email}</div>
            ) : null}
            <input
              type='email'
              id='email'
              name='email'
              className='form-control mt-1'
              value={props.values.email}
              onChange={props.handleChange}
              placeholder='Enter email'
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            {props.errors?.password ? (
              <div style={{ color: "red" }}>{props.errors.password}</div>
            ) : null}
            <input
              type='password'
              id='password'
              name='password'
              className='form-control mt-1'
              value={props.values.password}
              onChange={props.handleChange}
              placeholder='Enter password'
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password Confirm</label>
            {props.errors?.passwordConfirm ? (
              <div style={{ color: "red" }}>{props.errors.passwordConfirm}</div>
            ) : null}
            <input
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              className='form-control mt-1'
              value={props.values.passwordConfirm}
              onChange={props.handleChange}
              placeholder='Enter password'
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn '>
              Submit
            </button>
            <button className='btn' onClick={() => handleNavigate("/login")}>
              Cancel{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
