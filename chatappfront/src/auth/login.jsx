import React from "react";
import FormProviderWrapper from "../components/formHandler/formProviderWrapper";
import FormProviderInput from "../components/formHandler/formComponents/formInput/providerInput";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container2">
      {" "}
      <div className="register-container">
        <h2>Login</h2>
        <FormProviderWrapper
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          <div className="input-field">
            <FormProviderInput
              name="username"
              className="input"
              label="Username"
              placeholder="Username"
            />
          </div>

          <div className="input-field">
            <FormProviderInput
              name="password"
              className="input"
              label="Password"
              placeholder="Password"
              type="password"
            />
          </div>

          <div className="input-field">
            <button type="submit">Login</button>
          </div>
          <Link to="/register">
            <div className="text-line">
              Don't have an account ? Register Now
            </div>
          </Link>
        </FormProviderWrapper>
      </div>
    </div>
  );
};

export default Login;
