import React, { Fragment, useEffect, useState } from "react";

// npm react-icons pour les icons
import { FaTrophy } from "react-icons/fa";

import axios from "axios";

// Component
import Loader from "../Loader";
import Modal from "../Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    leveNames,
    userScore,
    maxQuestions,
    quizLevel,
    percent,
    loadLevelQuestions,
  } = props;


  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  //console.log("API_PUBLIC_KEY>>>>>,", API_PUBLIC_KEY)

  const hash = process.env.REACT_APP_MARVEL_API_HASH;
  //console.log("hash>>>>>,", hash)

  const [askedQuestion, setAskedQuestion] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [characterData, setCharacterData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAskedQuestion(ref.current);
    // console.log("ref.current>>>>>", ref.current)
    if (localStorage.getItem("marvelStorageDate")) {
      const dateData = localStorage.getItem("marvelStorageDate");
      checkDataAge(dateData);
    }

  }, [ref]);


  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDiffrence = today - date;

    const daysDiffrence = timeDiffrence / (1000 * 3600 * 24);
    if (daysDiffrence >= 15) {
      localStorage.clear();
      localStorage.setItem("marvelStorageDate", Date.now());
    }
  };

  const avergeGrade = maxQuestions / 2;

  if (userScore < avergeGrade) {

    setTimeout(() => {
      loadLevelQuestions(quizLevel);
    }, 5000);
  }

  const toastLoose = () => {
    return toast.warn(
      "😛 Raté ! Vous avez eu moins de 50%. Il faut recommencer le niveau.",
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
  };

  const showModal = (id) => {
    setOpenModal(true);


    if (localStorage.getItem(id)) {
      setCharacterData(JSON.parse(localStorage.getItem(id)));
      setLoading(false);
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          console.log("response Axios", response);
          setCharacterData(response.data);
          localStorage.setItem(id, JSON.stringify(response.data));
          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now());
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("error Axios", error);
        });
    }
  };

  const hideModal = () => {
    setOpenModal(false);
    setLoading(true);
  };

  const decision = () => {
    if (userScore >= avergeGrade) {

      return (
        <Fragment>
          <div className="stepsBtnContainer">
            {quizLevel < leveNames.length ? (
              <Fragment>
                <p className="successMsg">
                  Bravo, passez au niveau suivant !!!
                </p>
                <button
                  className="btnResult success"
                  onClick={() => loadLevelQuestions(quizLevel)}
                >
                  Niveau Suivant
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <p className="successMsg">
                  <FaTrophy size="50" /> Bravo, vous êtes un expert
                </p>

                <button
                  className="btnResult success"
                  onClick={() => loadLevelQuestions(0)}
                >
                  Acceuil
                </button>
              </Fragment>
            )}
          </div>
          <div className="percentage">
            <div className="progressPercent">Réussite : {percent} %</div>
            <div className="progressPercent">
              Note: {userScore}/{maxQuestions}
            </div>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {toastLoose()}
          <div className="stepsBtnContainer">
            <p className="failureMsg">Perdu, vous avez échoué !!!</p>
          </div>
          <div className="percentage">
            <div className="progressPercent">Réussite : {percent} %</div>
            <div className="progressPercent">
              Note: {userScore}/{maxQuestions}
            </div>
          </div>
        </Fragment>
      );
    }
  };

  const questionAnswerArray = () => {
    if (userScore >= avergeGrade) {
      return askedQuestion.map((arrayQuestion) => {
        return (
          <tr key={arrayQuestion.id}>
            <td>{arrayQuestion.question}</td>
            <td>{arrayQuestion.answer}</td>
            <td>
              <button
                className="btnInfo"
                onClick={() => showModal(arrayQuestion.heroId)}
              >
                Infos
              </button>
            </td>
          </tr>
        );
      });
    }
    return (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={"Pas de réponse..."}
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );
  };

  const urlHero = () => {
    if (characterData.data.results[0].urls) {
      return characterData.data.results[0].urls.map((url, index) => {
        return (
          <a
            key={index}
            href={url.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            {url.type}{" "}
          </a>
        );
      });
    }
  };

  console.log("quizLevel: Dans quizOuver", quizLevel);

  const resultModal = () => {
    if (!loading) {
      return (
        <Fragment>
          <div className="modalHeader">
            <h2>{characterData.data.results[0].name}</h2>
          </div>
          <div className="modalBody">
            <div className="comicImage">
              <img
                src={
                  characterData.data.results[0].thumbnail.path +
                  "." +
                  characterData.data.results[0].thumbnail.extension
                }
                alt={characterData.data.results[0].name}
              ></img>

              <p>{characterData.attributionText}</p>
            </div>
            <div className="comicDetails">
              <h3>Description</h3>
              {characterData.data.results[0].description ? (
                <p>{characterData.data.results[0].description}</p>
              ) : (
                <p>Description indisponible...</p>
              )}
              <h3>Plus d'info</h3>
              {urlHero()}
            </div>
          </div>
          <div className="modalFooter">
            <button className="modalBtn" onClick={hideModal}>
              Fermer
            </button>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="modalHeader">
            <h2>Réponse de Marvel...</h2>
          </div>
          <div className="modalBody">
            <Loader />
          </div>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {decision()}
      <ToastContainer limit={1} />
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
        {resultModal()}
      </Modal>
    </Fragment>
  );
});

export default React.memo(QuizOver);
