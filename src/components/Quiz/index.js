import React, { Component, Fragment } from "react";

// npm react-toastify pour les notifacation et Toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// npm react-icons pour les icons
import { FaChevronCircleRight } from "react-icons/fa";

// Component
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
import QuizOver from "../QuizOver";

class Quiz extends Component {
  constructor(props) {
    super(props);

    // state
    this.initialState = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      storedQuestion: [],
      questions: null,
      maxQuestion: 10,
      idQuestion: 0,
      options: [],
      btnDisabled: true,
      userAnswer: null,
      userScore: 0,
      quizEnd: false,
      percent: 0,
    };

    this.state = this.initialState;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (level) => {

    const fetchedArrayQuizQuestion = QuizMarvel[0].quizz[level];

    if (fetchedArrayQuizQuestion.length >= this.state.maxQuestion) {
      this.storedDataRef.current = fetchedArrayQuizQuestion;

      const newArray = fetchedArrayQuizQuestion.map((question) => {
        const { answer, ...rest } = question;
        return rest;
      });

      this.setState({ storedQuestion: newArray });
    }
    console.log("Pas assez de question");
  };

  // message d'accueil avec un toast
  WelcomeMessage = (name) => {
    toast.info(`🚀 🚀 Bienvenue ${name}!!!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  // Montage de composant
  componentDidMount() {
    this.loadQuestions(this.state.levelNames[0]);
  }

  // mise a jour du composant
  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestion !== prevState.storedQuestion) {
      this.setState({
        questions: this.state.storedQuestion[this.state.idQuestion].question,
        options: this.state.storedQuestion[this.state.idQuestion].options,
      });
    }

    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        questions: this.state.storedQuestion[this.state.idQuestion].question,
        options: this.state.storedQuestion[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.state.quizEnd !== prevState.quizEnd) {

      const userPercentage = this.getPercentage(
        this.state.maxQuestion,
        this.state.userScore
      );
      this.gameOver(userPercentage);
    }
    if (!prevProps.userData.username && this.props.userData.username) {
      this.WelcomeMessage(this.props.userData.username);
    }
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestion - 1) {
      // End
      this.setState({
        quizEnd: true,
      });
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        userScore: prevState.userScore + 1,
      }));
      toast.success("✅ Bravo, Bonne réponse +1 !!!", {
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
      toast.error("❌ Raté, Mauvaise réponse !!!", {
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

  submitAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      btnDisabled: false,
    });
  };

  // methode pourcentage
  getPercentage = (maxQuest, ourScore) => {
    return (ourScore / maxQuest) * 100;
  };

  gameOver = (userPercent) => {
    if (userPercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: userPercent,
      });
    } else {
      this.setState({
        percent: userPercent,
      });
    }
  };

  loadLevelQuestions = (params) => {

    this.setState({ ...this.initialState, quizLevel: params });
    if (this.state.userScore >= this.state.maxQuestion / 2) {
      this.loadQuestions(this.state.levelNames[params]);
    } else {
      this.loadQuestions(this.state.levelNames[params]);
    }
  };

  render() {
    const finshButton = () => {
      if (this.state.idQuestion < this.state.maxQuestion - 1) {
        return "Suivant";
      }
      return "Terminer";
    };


    const displayOptions = this.state.options.map((option, indexOption) => (
      <p
        key={indexOption}
        className={`answerOptions ${
          this.state.userAnswer === option ? "selected" : null
        }`}
        onClick={() => this.submitAnswer(option)}
      >
        <FaChevronCircleRight /> {option}
      </p>
    ));

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
            loadLevelQuestions={this.loadLevelQuestions}
          />
        );
      }

      return (
        <Fragment>
          <ToastContainer />
          <Levels
            levelNames={this.state.levelNames}
            quizLevel={this.state.quizLevel}
          />

          <ProgressBar
            idQuestions={this.state.idQuestion}
            maxQuestions={this.state.maxQuestion}
          />

          <h2>{this.state.questions}</h2>

          {displayOptions}

          <button
            disabled={this.state.btnDisabled}
            onClick={this.nextQuestion}
            className="btnSubmit"
          >
            {finshButton()}
          </button>
        </Fragment>
      );
    };
    return gameEnd();
  }
}

export default Quiz;
