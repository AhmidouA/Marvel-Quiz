// React and Hooks
import React, { useRef, useEffect, useState } from "react";

import { Link } from "react-router-dom";
// React link  => dirige vers un lien (=Page ou url de la page)

const Landing = () => {
  // useState = State des class
  // state pour les btn
  const [btn, setBtn] = useState(false);

  // useRef pour obtenir le current afin de manipuler le DOM (=getElementbyId ou le querySelector)
  // Maintentn refWolverine = current.main.welcomePage
  const refWolverine = useRef(null);
  // console.log("refWolverine Ref", refWolverine)

  // useEffect pour manipuler le Dom (cycle de vie d'un component)
  useEffect(() => {
    // On accéder a la methode classList pour ajouter une class
    // grace a cette ajout de class on peut ajouter une image en plus(Les griffe de fWolverine)
    refWolverine.current.classList.add("startingImg");

    // Tous les 3 seconde on retire les griffe pour avoir l'effet visuel
    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg");

      // une fois les griffe disparu on fait apparaitre les button
      setBtn(true);
    }, 1000); // 1 seconde
  }, []); // on met ou laisse le array vide car on veut qu'elle s'excute seulement au montage et non aprés

  // methode Over pour les btn
  // on ajoute les griffe gauche seulement quand on passe sur le btn gauche
  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg");
  };

  // on ajoute les griffe gauche seulement quand on passe sur le btn droite
  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg");
  };

  // Rentialise et enleve la class quand on enleve la souris
  const clearImg = () => {
    // on vérifie si elle ne contient pas la class (grace a contains)
    if (!refWolverine.current.classList.contains("leftImg")) {
      return refWolverine.current.classList.add("leftImg");
    }
    return refWolverine.current.classList.remove("rightImg");
  };

  // methode pour les button
  const dispalyBtn = () => {
    if (btn === true) {
      return (
        <React.Fragment>
          {" "}
          {/* React Fragments: permet de regrouper plusieurs éléments enfants sans ajouter d'élément DOM supplémentair */}
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
