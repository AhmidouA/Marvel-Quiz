import React, {Fragment, useEffect, useState} from 'react'


// je suis obliger d'utiliser React.forwardRef pour pouvoir acceder au ref envoyer depuis Quiz (tableau)
const QuizOver = React.forwardRef((props, ref) => {

    const {leveNames, userScore, maxQuestions, quizLevel, percent } = props
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

    
    // 
    const avergeGrade = maxQuestions / 2

    // methode pour la décision du Nextlevel ou pas
    const decision = () => {
        if (userScore >= avergeGrade) {
            // Si l'utilisateur a obtenu un score suffisant
          return (
            <Fragment>
                {/* Contenu affiché lorsque le score est suffisant */}
              <div className='stepsBtnContainer'>
              {/* Si le niveau actuel est inférieur au nombre total de niveaux */}
                {quizLevel < leveNames.length ? (
                  <Fragment>
                    {/* Contenu affiché lorsque le niveau suivant existe */}
                    <p className='successMsg'>Bravo, passez au niveau suivant !!!</p>
                    <button className='btnResult success'>Niveau Suivant</button>
                  </Fragment>

                ) 
                : 
                (

                    // Sinon (tous les niveaux sont terminés)
                  <Fragment>
                    <p className='successMsg'>Bravo, vous êtes un expert</p>
                    <button className='btnResult success'>Niveau Suivant</button>
                  </Fragment>
                )}
              </div>
              <div className='percentage'>
                {/* Section affichant le pourcentage et la note */}
                <div className='progressPercent'>Réussite : {percent} %</div>
                <div className='progressPercent'>Note: {userScore}/{maxQuestions}</div>
              </div>
            </Fragment>
          );

        } else {
          // Si la condition n'est pas remplie
          return (
            <Fragment>
                
                <div className='stepsBtnContainer'>
                    {/* Contenu affiché lorsque le score n'est pas suffisant */}
                    <p className='failureMsg'>Perdu, vous avez échoué !!!</p>
                    
                </div>
                <div className='percentage'>
                    {/* Section affichant le pourcentage et la note */}
                    <div className='progressPercent'>Réussite : {percent} %</div>
                    <div className='progressPercent'>Note: {userScore}/{maxQuestions}</div>
              </div>

            </Fragment>
          );
        }
      };

    
    // conditon pour afficher le récap des bon rep
    // si il n'a pas obtenu la moyenne on ne lui affaiche pas
    const questionAnswerArray = () => {
        if (userScore >= avergeGrade) {
            // je paracours le tableau avec la methode map pour afficher 
            return askedQuestion.map((arrayQuestion) => {  
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
        }
                return ( 
                <tr>               
                    <td colSpan="3">
                        <p style={{textAlign: 'center', color: 'red'}}>Pas de réponses...</p>
                    </td>
                </tr>
                )
                          
    }

  
    
    
  return (
    <Fragment>

           {/* Methode décision voir plus haut */}
           {decision()}


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
                    {questionAnswerArray()}
                </tbody>
            </table>
        </div>


    </Fragment>
  )
})


// Memo ne recahrge pas le composant si on ajoute pas une nouvelle valeur 
// (Optimisation)
export default React.memo(QuizOver)