import React, { Component, Fragment } from 'react'

// npm react-toastify pour les notifacation et Toaster
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Component
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import {QuizMarvel} from '../QuizMarvel'
import QuizOver from '../QuizOver';


class Quiz extends Component {
  

  // state 
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    storedQuestion: [],
    questions: null,
    maxQuestion: 10,
    idQuestion: 0,
    options:[],
    btnDisabled: true,
    userAnswer: null,
    userScore: 0,
    quizEnd: false,
    percent: 0

  };

  storedDataRef = React.createRef();


  // methode chercher les question
  loadQuestions = (level) => {
    // console.log("levels", level)

    const fetchedArrayQuizQuestion = QuizMarvel[0].quizz[level];
    // console.log("fetchedArrayQuizQuestion", fetchedArrayQuizQuestion)

    if (fetchedArrayQuizQuestion.length >= this.state.maxQuestion) {

      // je met toutes les question avec les rep dans mon un ref pour comparer et le recuperer dans QuizOver
      this.storedDataRef.current = fetchedArrayQuizQuestion;

      // methode map pour cacher les rep sur la console avec la methode map
      // on prends simplement les question sans les rep
      const newArray = fetchedArrayQuizQuestion.map((question) => {
        const { answer, ...rest } = question;
        return rest;
      });

      console.log("newArray", newArray)

      // je mets a jour le state avec les question sans les rep (j'ajoute a mon state)
       this.setState({ storedQuestion: newArray })

      
      
    }
    console.log('Pas assez de question')

  };

  // message d'accueil avec un toast
   WelcomeMessage = (name) => {
      toast.info(`🚀 🚀 Bienvenu ${name}!!!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        });
    }
    

  // Montage de composant 
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[0])
    
  };



  // mise a jour du composant
  componentDidUpdate(prevProps, prevState) {
  if (this.state.storedQuestion !== prevState.storedQuestion) {
    this.setState({
      questions: this.state.storedQuestion[this.state.idQuestion].question,
      options: this.state.storedQuestion[this.state.idQuestion].options
    });
  }
  

  // une fois une reponse valider on remet une nouvelle question 
  // ensuite on remet le tableau a 0 pour les reponse choisie et le button pas visible
  if (this.state.idQuestion !== prevState.idQuestion) {
    this.setState({
      // on recupére une nouvelle question
      questions: this.state.storedQuestion[this.state.idQuestion].question,
      // on recupére des nouvelles options
      options: this.state.storedQuestion[this.state.idQuestion].options,
      userAnswer: null,
      btnDisabled: true
    });  
  };

  
  // Toast message d'acceuil
  // Vérifiez si le nom d'utilisateur précédent était vide et le nouveau nom d'utilisateur est défini
  if (!prevProps.userData.username && this.props.userData.username) {
    // Appelez la méthode WelcomeMessage pour afficher le message de bienvenue
    this.WelcomeMessage(this.props.userData.username);
  }
};


  nextQuestion = () => {
    // on ne depasse le 10 questions
    if (this.state.idQuestion === this.state.maxQuestion -1 ) {
      // End
      this.gameOver()
     
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion +1
      }))
    }
    
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        userScore: prevState.userScore +1
        
      }))
      toast.success('✅ Bravo, Bonne réponse +1 !!!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });    
    } else {

      toast.error('❌ Raté, Mauvaise réponse !!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  // methode pour valider la reponse
  submitAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      btnDisabled: false
    })
  };


  // methode pourcentage 
  getPercentage = (maxQuest, ourScore) => {
    return (ourScore / maxQuest ) * 100
}

  // methode fin de quiz (questions) (State)
  gameOver = () => {

    // le pourcentage du score de l'user
    const userPercentage = this.getPercentage(this.state.maxQuestion, this.state.userScore)


    // condition pour savoir si il a la moyenne
    if (!userPercentage >= 50 ) {
      // si il n'a pas la moyenne on lui donne juste son Pourcentage et la page QuizOver avec le recape
        this.setState({
          percent: userPercentage,
          quizEnd: true
        })     
    }
    // si il a la moyenne on lui donne son Pourcentage et la page QuizOver avec le recape plus le button pour le prochain level
      return this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: userPercentage,
        quizEnd: true
      })
  }


  render() {

    // button suivant ou terminer
    const finshButton = () => {
      if (this.state.idQuestion < this.state.maxQuestion - 1) {
        return "Suivant";
      }
      return "Terminer";
    };


    // methode map pour affciher les options de reponse 
    const displayOptions = this.state.options.map((option, indexOption) => (
      <p
        key={indexOption}
        className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
        onClick={() => this.submitAnswer(option)}
      >
        {option}
      </p>
    ));

    // methode fin de quiz
    const gameEnd = () => {
      if (this.state.quizEnd) {
        return (
          <QuizOver
            ref={this.storedDataRef}
            leveNames={this.state.levelNames}
            userScore={this.state.userScore}
            maxQuestions={this.state.maxQuestion}
            quizLevel={this.state.quizLevel}
            percent={this.state.percent}
          />
        );
      }
      
      return (
        <Fragment>
          {/* <h2>Bienvenu: <span style={{color: 'blue'}}>{username}</span></h2>  ==> Ancien code*/}
  
          {/* J'affcihe mon toast de bienvenu (voir methode welcomeMessage)  */}
          <ToastContainer />
  
  
          {/* Component de levels et progresse import */}
          <Levels />
          <ProgressBar idQuestions={this.state.idQuestion} maxQuestions={this.state.maxQuestion}/>
  
  
          <h2>{this.state.questions}</h2>  
          
          {/* Les options des question  */}
          {displayOptions}

          
          <button disabled={this.state.btnDisabled} onClick={this.nextQuestion}className='btnSubmit'>{finshButton()}</button>
      </Fragment>
  
      )
    }



    // return du 
    return gameEnd(); 
  }
}

export default Quiz