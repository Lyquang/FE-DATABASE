import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Signup.css'; // Import the external CSS

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/signup", { email, password });
      if (res.data === "exist") {
        setErrorMessage("User already exists");
      } else if (res.data === "notexist") {
        navigate("/home", { state: { id: email } });
      }
    } catch (e) {
      setErrorMessage("There was an error with the signup. Please try again.");
      console.log(e);
    }
  }

  return (
    <div className="signup-container">
      <table className="signup-table">
        <thead>
          <tr>
            <td id="subTitle" className="signup-title">
              BK Manager
            </td>
          </tr>
        </thead>
        <tbody className="signup-body">
          <tr>
            <td>
              <table className="signup-content">
                <tr>
                  <td id="pageContent" className="signup-box">
                    <h1 className="signup-heading">Đăng ký</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form className="signup-form" onSubmit={submit}>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Tên đăng nhập
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your username"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password" className="form-label">
                          Mật khẩu
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <button type="submit" className="submit-button">
                          Đăng ký
                        </button>
                      </div>
                    </form>
                    <div className="alternative">
                      <p className="alt-text">OR</p>
                      <Link to="/login" className="login-link">
                        Đến phần Đăng Nhập
                      </Link>
                    </div>
                    <hr className="separator" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Signup;
