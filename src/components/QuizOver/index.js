import React, {Fragment, useEffect, useState} from 'react'


// je suis obliger d'utiliser React.forwardRef pour pouvoir acceder au ref envoyer depuis Quiz (tableau)
const QuizOver = React.forwardRef((props, ref) => {

    // console.log("props", props)
    // console.log("ref", ref)

    // state
    const [askedQuestion, setAskedQuestion] = useState([])

    // useEffect => component didMont, component didUpdate
    useEffect(() => {
        // mon tableau des question et rep est dans la proprité current du ref
        setAskedQuestion(ref.current)
        // console.log("ref.current>>>>>", ref.current)
    

    // elle s'enclanche a chaque fois qu'il a une modif 
    // je déclare ref comme dépendance
    }, [ref])

    // je paracours le tableau avec la methode map pour afficher 
    const questionAnswerArray = askedQuestion.map((arrayQuestion) => {
        return (
            <tr key={arrayQuestion.id}>
                {/* Les questions se trouvent dans le current.question */}
                <td>{arrayQuestion.question}</td>
                {/* Les reponses se trouvent dans le current.answer */}
                <td>{arrayQuestion.answer}</td>
                <td>
                    <button className='btnInfo'>Infos</button>
                </td>
            </tr>
        )
    })
    
  return (
    <Fragment>
        <div className='stepsBtnContainer'>
            <p className='successMsg'>Bravo, vous êtes un expert</p>
            <button className='btnResult success'>Niveau Suivant</button>
        </div>
        <div className='percentage'>
            <div className='progressPercent'>Réussite : 10%</div>
            <div className='progressPercent'>Note: 1/10</div>
        </div>

        <hr />
        <p>Les réponses au question posées: </p>

        <div className='answerContainer'>
            <table className='answers'>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Réponse</th>
                        <th>Infos</th>
                    </tr>
                </thead>

                <tbody>
                    {questionAnswerArray}
                </tbody>
            </table>
        </div>


    </Fragment>
  )
})


// Memo ne recahrge pas le composant si on ajoute pas une nouvelle valeur 
// (Optimisation)
export default React.memo(QuizOver)