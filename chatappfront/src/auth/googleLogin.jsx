import { GoogleLogin } from "@react-oauth/google";

import React from "react";

const handleGoogleSuccess = (response) => {
  console.log(response); // You can send this to your backend for further authentication
};

const handleGoogleFailure = (error) => {
  console.error(error);
};

const GoogleLogin2 = () => {
  return (
    <div className="input-field">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
};

export default GoogleLogin2;
