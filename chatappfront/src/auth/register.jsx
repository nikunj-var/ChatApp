import React, { useState } from "react";
import "./style.css";
import FormProviderInput from "../components/formHandler/formComponents/formInput/providerInput";
import FormProviderWrapper from "../components/formHandler/formProviderWrapper";
import { GoogleLogin } from "@react-oauth/google";
function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phonenumber: "",
    emailId: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "Username is required.";
    if (!formData.password || formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters.";
    if (!/^\d{10}$/.test(formData.phonenumber))
      tempErrors.phonenumber = "Phonenumber must be 10 digits.";
    if (!/\S+@\S+\.\S+/.test(formData.emailId))
      tempErrors.emailId = "Enter a valid email address.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted", formData);
      alert("Registration successful!");
      setFormData({
        username: "",
        password: "",
        phonenumber: "",
        emailId: "",
      });
    }
  };
  const handleGoogleSuccess = (response) => {
    console.log("rs", response);
    const { credential } = response;

    // Send the token to the backend for validation
    fetch("http://localhost:8080/auth/oauth2/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: credential }), // Send token to the backend
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User authenticated on backend", data);
      })
      .catch((error) => console.error("Error logging in with Google", error));
  };

  const handleGoogleFailure = (error) => {
    console.error(error);
  };

  return (
    <div className="container2">
      <div className="register-container">
        <h2>Register</h2>
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
              name="email"
              type="email"
              className="input"
              label="Email"
              placeholder="Email"
            />
          </div>
          <div className="input-field">
            <FormProviderInput
              name="phoneNumber"
              className="input"
              label="PhoneNumber"
              placeholder="Phone Number"
              type="number"
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
            <FormProviderInput
              name="confirmPassword"
              className="input"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="input-field">
            <button type="submit">Register</button>
          </div>
          <div className="input-field">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>

          <div className="text-line">Already have a account? Login Now</div>
        </FormProviderWrapper>
      </div>
    </div>
  );
}

export default RegisterForm;
