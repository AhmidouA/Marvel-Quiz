import React, {Fragment, useEffect, useState} from 'react'


// npm react-icons pour les icons
import { FaTrophy } from 'react-icons/fa';


// je suis obliger d'utiliser React.forwardRef pour pouvoir acceder au ref envoyer depuis Quiz (tableau)
const QuizOver = React.forwardRef((props, ref) => {
  const {
    leveNames,
    userScore,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;
  // console.log("props", props)
  // console.log("ref", ref)


  // API key marvel depuis le ficher .env
  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
  //console.log("API_PUBLIC_KEY>>>>>,", API_PUBLIC_KEY)

  // API Hash marvel depuis le ficher .env
  const hash = process.env.REACT_APP_MARVEL_API_HASH
  //console.log("hash>>>>>,", hash)


  // state pour le tableau des question
  const [askedQuestion, setAskedQuestion] = useState([]);

  // useEffect => component didMont, component didUpdate
  useEffect(() => {
    // mon tableau des question et rep est dans la proprité current du ref
    setAskedQuestion(ref.current);
    // console.log("ref.current>>>>>", ref.current)

    // elle s'enclanche a chaque fois qu'il a une modif
    // je déclare ref comme dépendance
  }, [ref]);


  // const pour stocker la moyenne (50%)
  const avergeGrade = maxQuestions / 2;
  

  // condition pour Restart le Quiz du début ou juste le niveau quand on a échoué 
  if (userScore < avergeGrade) {   // si le score de user n'est pas d'au moins la moyenne

    setTimeout(() => {       

        // 1er condition 
        // on le fait revenir au debut du Quizz quand il a échoué (recommencé tout le QUIZ )
        // loadLevelQuestions(0)
        

        // 2em condition 
        // Recommencé juste le niveau 
        loadLevelQuestions(quizLevel)
    }, 5000); // 3ses
  }
  

  // methode pour la décision du Nextlevel ou pas
  const decision = () => {
    if (userScore >= avergeGrade) {
      // Si l'utilisateur a obtenu un score suffisant
      return (
        <Fragment>
          {/* Contenu affiché lorsque le score est suffisant */}
          <div className="stepsBtnContainer">
            {/* Si le niveau actuel est inférieur au nombre total de niveaux */}
            {quizLevel < leveNames.length ? (
              <Fragment>

                {/* Contenu affiché lorsque le niveau suivant existe */}
                <p className="successMsg">Bravo, passez au niveau suivant !!!</p>
                <button className="btnResult success" onClick={() => loadLevelQuestions(quizLevel)}>Niveau Suivant</button>

              </Fragment>

            ) : (

              // Sinon (tous les niveaux sont terminés)
              <Fragment>
                <p className="successMsg" >
                    <FaTrophy size='50' /> Bravo, vous êtes un expert
                </p>

                <button className="btnResult success" onClick={() => loadLevelQuestions(0)}>Acceuil</button>
              </Fragment>

            )}

            </div>
                <div className="percentage">
                    {/* Section affichant le pourcentage et la note */}
                    <div className="progressPercent">Réussite : {percent} %</div>
                    <div className="progressPercent">
                    Note: {userScore}/{maxQuestions}
                </div>
            </div>
        </Fragment>
      );
    } else {
      // Si la condition n'est pas remplie
      return (
        <Fragment>
          <div className="stepsBtnContainer">
            {/* Contenu affiché lorsque le score n'est pas suffisant */}
            <p className="failureMsg">Perdu, vous avez échoué !!!</p>
          </div>
          <div className="percentage">
            {/* Section affichant le pourcentage et la note */}
            <div className="progressPercent">Réussite : {percent} %</div>
            <div className="progressPercent">
              Note: {userScore}/{maxQuestions}
            </div>
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
              <button className="btnInfo">Infos</button>
            </td>
          </tr>
        );
      });
    }
    return (
      <tr>
        <td colSpan="3">
            <div className='loader'></div>
          <p style={{ textAlign: "center", color: "red" }}>
            Pas de réponses...
          </p>
        </td>
      </tr>
    );
  };



  console.log("quizLevel: Dans quizOuver", quizLevel);


  return (
    <Fragment>
      {/* Methode décision voir plus haut avec quizLevel comme params pour avoir le bon niveau */}
      {decision()}

      <hr />
      <p>Les réponses au question posées: </p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>

          <tbody>{questionAnswerArray()}</tbody>
        </table>
      </div>
    </Fragment>
  );
})


// Memo ne recahrge pas le composant si on ajoute pas une nouvelle valeur 
// (Optimisation)
export default React.memo(QuizOver)