import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/user-slices";
import axios from "axios"; // Import axios for the API call

import './Login.css'; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // API call directly inside the component
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password
      });

      if (response && response.data) {
        const { accountId, token, expired, authenticated, role } = response.data.result;

        console.log("Account ID:", accountId);
        console.log("Token:", token);

        // Save token and accountId to localStorage for persistence
        localStorage.setItem("token", token);
        localStorage.setItem("accountId", accountId);
        // Dispatch login action to Redux
        dispatch(
          login({
            accountId,
            token,
            expired,
            authenticated,
            role,
          })
        );

        // Navigate based on the user role
        if (role === "EMPLOYEE") {
          navigate("/login/employee");
        } else if (role === "MANAGER") {
          navigate("/login/manager");
        } else {
          navigate("/login/admin");
        }
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <table className="login-table">
        <thead>
          <tr>
            <td id="subTitle" className="login-title">
              BK Manager
            </td>
          </tr>
        </thead>
        <tbody className="login-body">
          <tr>
            <td>
              <table className="login-content">
                <tbody>
                  <tr>
                    <td id="pageContent" className="login-box">
                      <h1 className="login-heading">Đăng Nhập</h1>
                      {errorMessage && <p className="error-message">{errorMessage}</p>}
                      <form onSubmit={submit} className="login-form">
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">
                            Tên đăng nhập
                          </label>
                          <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="form-input"
                            required
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
                            required
                          />
                        </div>
                        <div>
                          <button type="submit" className="submit-button">
                            Đăng nhập
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Login;
