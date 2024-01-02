import React, { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

//bdd
import { FirebaseContext } from "../Firebase";

const ForgotPassword = () => {
  const redirectPage = useNavigate();

  const firebase = useContext(FirebaseContext);

  // state email
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // methode validation du form
  const handleOnSubmit = (event) => {
    event.preventDefault();

    firebase
      .passwordReset(email)
      .then(() => {
        setSuccess(
          `Consulter votre boite email ${email} pour changer le mot de passe `
        );
        setEmail("");
        setError("");

        setTimeout(() => {
          redirectPage("/login");
        }, 5000);
      })

      .catch((error) => {
        setError(error);
        setEmail("");
      });
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const disabledBtn = () => {
    if (email === "") {
      return "disabled";
    }
  };

  const successMessage = () => {
    if (success) {
      return (
        <span
          style={{
            border: "1px solid green",
            background: "green",
            color: "#ffffff",
          }}
        >
          {success}
        </span>
      );
    }
    return null;
  };

  const errorMessage = () => {
    if (error) {
      return <span>Email incorrect</span>;
    }
    return null;
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainere">
        <div className="formBoxLeftForget"></div>
      </div>
      <div className="formBoxRight">
        <div className="formContent">

          {successMessage()}
          {errorMessage()}

          <h2>Mot de passe oublié ?</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="inputBox">
              <input
                onChange={handleEmail}
                value={email}
                type="email"
                autoComplete="off"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            
            <button disabled={disabledBtn()}>Recupérer</button>
            {}
          </form>
          <div className="linkContainer">
            <Link className="simpleLink" to="/login">
              Déjé Inscrit ? Connextez-vous.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
