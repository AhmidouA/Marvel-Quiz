import React, { Component } from 'react'

// Component
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import {QuizMarvel} from '../QuizMarvel'

class Quiz extends Component {

  // state 
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    storedQuestion: [],
    questions: null,
    options:[],


  };


  // methode chercher les question
  loadQuestions = (level) => {
    console.log("levels", level)

    const fetchedArrayQuizQuestion = QuizMarvel[0].quizz[level];
    console.log("fetchedArrayQuizQuestion", fetchedArrayQuizQuestion)

    if (fetchedArrayQuizQuestion.length >= 10) {

      // methode map pour cacher les rep sur la console avec la methode map
      // on prends simplement les question sans les rep
      const newArray = fetchedArrayQuizQuestion.map((question) => {
        const { answer, ...rest } = question;
        return rest;
      });

      console.log("newArray", newArray)

      // je mets a jour le state avec les question sans les rep (j'ajoute a mon state)
       this.setState({
          storedQuestion: newArray
      })

      console.log("this.storedQuestion", this.state.storedQuestion)
      
    }
    console.log('Pas assez de question')

  };

  // Montage de composant 
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[0])
  };

  // mise a jour du composant
  componentDidUpdate(prevProps, prevState) {
  if (this.state.storedQuestion !== prevState.storedQuestion) {
    this.setState({
      questions: this.state.storedQuestion[0].questions,
      options: this.state.storedQuestion[0].options
    });
  }
}

  render() {
    // console.log("props>>>>", this.props)
    const {username, email } = this.props.userData;

    const displayOptions = this.state.options.map((option, indexOption) => {
      return <p key={indexOption}className='answerOptions'>{option}</p>
    })

    return (
      <div>
        <h2>Pseudo: <span style={{color: 'blue'}}>{username}</span></h2>
        <Levels />
        <ProgressBar />

        <h2>{this.state.questions}</h2>       
        {displayOptions}
        
        <button className='btnSubmit'>Suivant</button>
    </div>

    )
  }
}

export default Quiz