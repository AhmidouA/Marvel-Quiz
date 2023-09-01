import React, { useEffect, useState } from "react";

// npm react-stepper-horizontal
import Stepper from "react-stepper-horizontal";

const Levels = (props) => {
  // import props
  const { levelNames, quizLevel } = props;
  // console.log("props Levels", props)

  // state pour le level
  const [userLevels, setUserLevels] = useState([]);

  //useEffect
  useEffect(() => {
    // map pour obtenir un new objet pour les niveau et les afficher

    const quizSteps = levelNames.map((level) =>
      // map va prendre l'element en question et va l'associer a un title
      ({ title: level.toUpperCase() })
    );

    // j'enregiste le nouveau tableau dans mon state
    setUserLevels(quizSteps);

    // a chaque fois qu'il a un changement elle se recharge = componentDidUpdate
  }, [levelNames]);

  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={userLevels}
        activeStep={quizLevel}
        // {/* circleTop = style de Stepper = margin */}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        size={36}
        titleFontSize={18}
      />
    </div>
  );
};

// Memo ne recahrge pas le composant si on ajoute pas une nouvelle valeur
// (Optimisation)
export default React.memo(Levels);
