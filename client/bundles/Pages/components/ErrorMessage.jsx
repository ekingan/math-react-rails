import React from "react";

const ErrorMessage = ({error}) => {
  return (
    <div className="alert alert-danger" role="alert">
      <p className="mb-0">There was an error.</p>
      <p className="mb-0">{error}</p> 
    </div>
  );
};

export default ErrorMessage;