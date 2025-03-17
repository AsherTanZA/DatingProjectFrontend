import React, { useState } from "react";
import { loginAPICall, saveLoggedInUser, storeToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [usernameoremail, setUsernameorEmail] = useState("");
  const [password, setPassword] = useState("");
  const[userloginstatus, setuserloginstatus] = useState('');

  const navigator = useNavigate();

  async function handleLoginForm(e : React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();

    await loginAPICall(usernameoremail, password).then((response) => {
        console.log(response.data);

        const token = 'Basic ' + window.btoa(usernameoremail + ":" +password);
        storeToken(token);

        setuserloginstatus("Login Successful");
        saveLoggedInUser(usernameoremail);
        navigator("/attendees");
        window.location.reload();
    }).catch(error => {
        console.error(error);
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div>
          <div className="card shadow-lg">
            <div className="card-header text-center">
              <h2>Login Form</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3 row align-items-center">
                  <label className="col-md-3 col-form-label text-md-end">
                    Username or Email
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter username"
                      value={usernameoremail}
                      onChange={(e) => setUsernameorEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-md-3 col-form-label text-md-end">
                    Password
                  </label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => handleLoginForm(e)}
                  >
                    Submit
                  </button>
                  <div className="text-success">{userloginstatus}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
