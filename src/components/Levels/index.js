import React, { useEffect, useState } from "react";

// npm react-stepper-horizontal
import Stepper from "react-stepper-horizontal";

const Levels = (props) => {

  const { levelNames, quizLevel } = props;
  // console.log("props Levels", props)

  const [userLevels, setUserLevels] = useState([]);

  useEffect(() => {

    const quizSteps = levelNames.map((level) =>
      ({ title: level.toUpperCase() })
    );

    setUserLevels(quizSteps);

  }, [levelNames]);

  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        steps={userLevels}
        activeStep={quizLevel}
        circleTop={0}
        activeTitleColor={"#d31017"}
        activeColor={"#d31017"}
        size={36}
        titleFontSize={18}
      />
    </div>
  );
};
export default React.memo(Levels);
