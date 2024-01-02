import React, { useEffect, useState, useContext } from "react";

//bdd
import { FirebaseContext } from "../Firebase";

import { Tooltip } from "react-tooltip";

const Logout = () => {
  const firebase = useContext(FirebaseContext);

  const [checked, setchecked] = useState(false);

  console.log("checked", checked);

  useEffect(() => {
    if (checked === true) {
      console.log("deconnexion");
      firebase.signOutUser();
    }
  }, [checked]);

  const handleChange = (event) => {
    setchecked(event.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} /> 
        <span
          className="slider round"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Déconnexion"
        ></span>
      </label>
      <Tooltip place="left" effect="solid" id="my-tooltip" />
    </div>
  );
};

export default Logout;
