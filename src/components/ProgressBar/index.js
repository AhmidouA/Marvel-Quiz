import React, { Fragment } from "react";

const ProgressBar = (props) => {
  const { idQuestions, maxQuestions } = props;

  const getPercent = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId;
  };

  const ProgressPercent = getPercent(maxQuestions, idQuestions + 1);

  return (
    <Fragment>
      <div className="percentage">
        <div className="progressPercent">{`Question: ${
          idQuestions + 1
        }/${maxQuestions}`}</div>
        <div className="progressPercent">{`Progression: ${ProgressPercent}%`}</div>
      </div>

      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${ProgressPercent}%` }}
        ></div>
      </div>
    </Fragment>
  );
};
export default React.memo(ProgressBar);
