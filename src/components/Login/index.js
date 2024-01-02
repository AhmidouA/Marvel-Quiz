// React
import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

//bdd
import { FirebaseContext } from "../Firebase";

const Login = () => {
  const firebase = useContext(FirebaseContext);

  const redirectPage = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setbtn] = useState(false);
  const [error, setError] = useState(""); 

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setbtn(true);
    } else if (btn === true) {
      setbtn(false);
    }
  }, [password, email, btn]);


  const btnDisplay = () => {
    if (btn === false) {
      return <button disabled>Connexion</button>;
    }
    return <button>Connexion</button>;
  };


  const handleOnSubmit = (event) => {
    event.preventDefault();

    firebase
      .loginUser(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        redirectPage("/welcome");
      })
      .catch((error) => {
        setError(error);
        setEmail("");
        setPassword("");
      });
  };

  const errorMessage = () => {
    if (!error) {
      return null;
    }
    return <span>Email ou Mot de passe incorrect</span>;
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainere">
        <div className="formBoxLeftLogin"></div>
      </div>
      <div className="formBoxRight">
        <div className="formContent">
          {errorMessage()}
          <h2>Connexion</h2>
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

            <div className="inputBox">
              <input
                onChange={handlePassword}
                value={password}
                type="password"
                autoComplete="off"
                required
              />
              <label htmlFor="password">Mot de passe</label>
            </div>

            {btnDisplay()}
          </form>
          <div className="linkContainer">
            <Link className="simpleLink" to="/signup">
              Nouveau sur Marvel-Quiz? Inscrivez-vous maintenant.
            </Link>
            <br />
            <Link className="simpleLink" to="/forgotpassword">
              Mot de passe oublié ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
