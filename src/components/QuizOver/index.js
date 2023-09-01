import React, {Fragment, useEffect, useState} from 'react'


// npm react-icons pour les icons
import { FaTrophy } from 'react-icons/fa';

// npm axios pour les appel d'Api
import axios from 'axios';

// Component 
import Loader from '../Loader';
import Modal from '../Modal';


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

  // state pour les info des reponse
  const [openModal, setOpenModal] = useState(false);

  // state pour les data info nom du hero de la request axios (=> Marvel)
  const [characterData, setCharacterData] = useState([]);

  // state pour afficher les info le temps de les avoir
  const [loading, setLoading] = useState(true);




  // useEffect => component didMont, component didUpdate
  useEffect(() => {
    // mon tableau des question et rep est dans la proprité current du ref
    setAskedQuestion(ref.current);
    // console.log("ref.current>>>>>", ref.current)

    // je vérifie la date pour refresh la data dans le LocalStorage (Pour que la data soit tjr bonne si y'a une mise a jour)
    if (localStorage.getItem('marvelStorageDate')) {
        const dateData = localStorage.getItem('marvelStorageDate')
        checkDataAge(dateData)
    }

    // elle s'enclanche a chaque fois qu'il a une modif
    // je déclare ref comme dépendance
  }, [ref]);



  // methode pour vérifier la date de la data dans le localStorage
  const checkDataAge = (date) => { 
    const today = Date.now();
    const timeDiffrence =  today - date;

    // je transforme la valeur en miliseconde en jour
    const daysDiffrence = timeDiffrence / (1000 * 3600 * 24)

    // 15 jours
    if (daysDiffrence >= 15) {
        // clear = effacer les info dans le localStorage
        localStorage.clear();
        // j'enregistre les nouvelle data
        localStorage.setItem("marvelStorageDate", Date.now())
    }
}


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
    }, 2000); // 5ses
  };

  // Methode modal info 
  const showModal = (id) => {
        setOpenModal(true);

        // on créer une condtion pour éviter trop les appel vers l'api marvel
        // on vérifie si l'info n'est pas deja dans notre localStorage
        if(localStorage.getItem(id)) {
            setCharacterData(JSON.parse(localStorage.getItem(id)))
            setLoading(false)

        } else {

                // Api Marvel https://developer.marvel.com/docs#!/public/getCharacterIndividual_get_1
                // https://gateway.marvel.com:443/v1/public/characters/1009362?apikey=570e9be66ef619abdb4bcbbbfc9364b6
                axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
                .then (response => {
                console.log("response Axios", response)
                // console.log("response Data", response.data.data.results[0].name)

                // je stock les reponse dans le tableau
                // les info sont dans la partie data de la response
                setCharacterData(response.data)    
                

                // je stock les info dans le localStorage pour garder en memoire reponse
                // faut tjr deux params (id ou key et la data)
                localStorage.setItem(id, JSON.stringify(response.data))

                // si la clée marvelStorageDate n'existe pas je la créer 
                if (!localStorage.getItem('marvelStorageDate')) {
                    // je stock la date des info enregistrer
                    localStorage.setItem("marvelStorageDate", Date.now())
                }
                
                // une fois les reponse récuperé on le ferme 
                setLoading(false)
            })
            .catch(error => {
                console.log("error Axios", error)
            })
        }
        
  };

 

  // methode fermer la modal
  const hideModal = () => {
        setOpenModal(false)
        // une fois la modal fermer on attend la rep de axios avant de le re ouvrir et le repasser en false
        setLoading(true)
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
              <button className="btnInfo" onClick={() => showModal(arrayQuestion.heroId)}>Infos</button>
            </td>
          </tr>
        );
      });
    }
    return (
      <tr>
        <td colSpan="3">
            <Loader loadingMsg={'Pas de réponse...'} styling={{ textAlign: "center", color: "red" }}/>
        </td>
      </tr>
    );
  };


  // methode pour afficher les liens urls obligatoire (Plus d'info dans l'info de la rep)
  const urlHero = () => {
    if (characterData.data.results[0].urls) {
        return characterData.data.results[0].urls.map((url, index) => {
            // vue qu'on modifie rien et qu'on affiche tous les element on mes index
            // Pour afficher dans un nouvelle onglet on met un target
            return <a key={index} href={url.url} target='_blank' rel='noopener noreferrer'> {url.type} </a>
        })
    }
  }


  console.log("quizLevel: Dans quizOuver", quizLevel);


  const resultModal = () => { 
    // si le loading est false
    // c'est a dire nous avons reçu la data
    if (!loading) {  
        return <Fragment>
            <div className='modalHeader'>
                {/* response axios data */}
                <h2>{characterData.data.results[0].name}</h2>
                {/* data.data.results[0].name */}
            </div>
                <div className='modalBody'>
                    <div className='comicImage'>                     
                        {/* Url pour avoir l'image du hero */}
                        <img 
                            src={characterData.data.results[0].thumbnail.path+'.'+characterData.data.results[0].thumbnail.extension}
                            alt={characterData.data.results[0].name}>
                        </img>

                        {/* ex : Data provided by Marvel. © 2023 MARVEL */}
                        <p>{characterData.attributionText}</p>
                    </div>
                    <div className='comicDetails'>
                        <h3>Description</h3>
                        {/* Condition pour afficher la description si elle est existe dans la data */}
                        {characterData.data.results[0].description ? (
                            <p>{characterData.data.results[0].description}</p>
                        ) : (
                            <p>Description indisponible...</p>
                        )}
                        <h3>Plus d'info</h3>
                            {/* Methode pour afficher les urls obligatoire des info dans la modal avec les nom */}
                            {urlHero()}
                    </div>
            </div>
            <div className='modalFooter'>
                <button className='modalBtn' onClick={hideModal}>Fermer</button>
            </div>
        </Fragment>      
    } else {
        return <Fragment>
            <div className='modalHeader'>
                {/* response axios data */}
                <h2>Réponse de Marvel...</h2>
            </div>
                <div className='modalBody'>
                <Loader />
            </div>
        </Fragment>
    }
}



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


        {/* Component Modal  */}
      <Modal showModal={openModal}>
         {/* result marval des info depuis la methode resultModal() plus haut  */}
        {resultModal()}
      </Modal>

     
    </Fragment>
  );
})


// Memo ne recahrge pas le composant si on ajoute pas une nouvelle valeur 
// (Optimisation)
export default React.memo(QuizOver)