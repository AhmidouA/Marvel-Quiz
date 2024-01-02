import React, { Fragment } from "react";

const Loader = (props) => {
  const { loadingMsg, styling } = props;
  return (
    <Fragment>
      <div className="loader"></div>
      <p style={styling}> {loadingMsg}</p>
    </Fragment>
  );
};

export default Loader;
