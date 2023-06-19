import React from "react";

function Login(props) {
  return (
    <div className='Auth-form-container'>
      <form className='Auth-form' onSubmit={props.onSubmit}>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign In</h3>
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
          {props.errorMessage && (
            <div style={{ color: "red" }}>{props.errorMessage}</div>
          )}
          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
          <p className='forgot-password text-right mt-2'>
            Don't Have Account, <a href='/signup'>SignUp?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
