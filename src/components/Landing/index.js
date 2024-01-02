// React and Hooks
import React, { useRef, useEffect, useState } from "react";

import { Link } from "react-router-dom";

const Landing = () => {
  const [btn, setBtn] = useState(false);

  const refWolverine = useRef(null);

  useEffect(() => {

    refWolverine.current.classList.add("startingImg");

    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");

      setBtn(true);
    }, 1000);
  }, []);

  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg");
  };

  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
  };

  const clearImg = () => {
    if (!refWolverine.current.classList.contains("leftImg")) {
      return refWolverine.current.classList.add("leftImg");
    }
    return refWolverine.current.classList.remove("rightImg");
  };

  const dispalyBtn = () => {
    if (btn === true) {
      return (
        <React.Fragment>
          {" "}
          <div
            onMouseOver={setLeftImg}
            onMouseOut={clearImg}
            className="leftBox"
          >
            <Link to="/signup" className="btn-welcome">
              Inscription
            </Link>
          </div>
          <div
            onMouseOver={setRightImg}
            onMouseOut={clearImg}
            className="rightBox"
          >
            <Link to="/login" className="btn-welcome">
              Connexion
            </Link>
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <main ref={refWolverine} className="welcomePage">
      {dispalyBtn()}
    </main>
  );
};

export default Landing;
