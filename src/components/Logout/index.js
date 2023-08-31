import React, { useEffect, useState, useContext } from "react";

//bdd
import { FirebaseContext } from '../Firebase';

// npm react-tooltip pour la deconnexion
import { Tooltip } from 'react-tooltip'



const Logout = () => {

  // useContext pour récuper le provider (les data et methode) de Firebase
  const firebase = useContext(FirebaseContext) 

  // state pour le btn deconnexion (on le met en false de base)
  const [checked, setchecked] = useState(false)

  console.log("checked", checked)

  useEffect(() => {
    if (checked === true) {
        console.log("deconnexion")
        // methode SignOut
        firebase.signOutUser()
    }
 
  }, [checked])
  

  const handleChange = (event) => {
      // console.log("event>>>>", event.target)
      setchecked(event.target.checked)
  }

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input 
          onChange={handleChange}
          type="checkbox" 
          checked={checked}
        />
        {/* data-tooltip = npm pour la déconnexion */}
        <span className="slider round" data-tooltip-id="my-tooltip" data-tooltip-content="Déconnexion"></span>
      </label>
      {/* ReactTooltip = npm pour la déconnexion */}
       <Tooltip place="left" effect="solid" id="my-tooltip" />
    </div>
  )
}

export default Logout