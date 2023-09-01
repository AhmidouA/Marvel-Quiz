import React from "react";
import batman from "../../images/batman.png";

// Css inline
const centerH2 = {
  textAlign: "center",
  marginTop: "50px",
};

const CenterImg = {
  display: "block",
  margin: "40px auto",
};

const ErrorPage = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={centerH2}>Oupsc cette page n'existe pas!</h2>
        <img style={CenterImg} src={batman} alt="error page" />
      </div>
    </div>
  );
};

export default ErrorPage;
