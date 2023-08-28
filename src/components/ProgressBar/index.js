import React, {Fragment} from 'react'

const ProgressBar = (props) => {
  // Props envoyé depuis Quiz 
  const {idQuestions, maxQuestions} = props

  // methode la barre de progression
  const getPercent = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId
  };

  // la barre de progression du Quiz
  const ProgressPercent = getPercent(maxQuestions, idQuestions+1)
  console.log("ProgressPercent", ProgressPercent)

  return (
    <Fragment>
        <div className='percentage'>
            {/* On rajoute un + 1 idQuestion car ça commence a 0 */}
            <div className='progressPercent'>{`Question: ${idQuestions + 1}/${maxQuestions}`}</div>
            <div className='progressPercent'>{`Progression: ${ProgressPercent}%`}</div>
        </div>

        <div className='progressBar'>
            <div className='progressBarChange' style={{width: `${ProgressPercent}%`}}></div>
        </div>
    </Fragment>
  )
}

// Memo ne recahrge pas le composant si on ajoute pas une nouvelle valeur 
// (Optimisation)
export default React.memo(ProgressBar)