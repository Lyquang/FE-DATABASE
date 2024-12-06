import React from "react";
import { useLocation, Link } from "react-router-dom";
import './Home.css'; // Importing the CSS file

function Home() {
  const location = useLocation();

  return (
    <div className="home-container">
      <div className="home-box">
        <h2 className="home-title">Đăng nhập</h2>
        <ul className="home-links">
          <li>
            <Link to="/login" className="home-link home-employee">
              Nhân viên
            </Link>
          </li>
          <li>
            <Link to="/login" className="home-link home-manager">
              Quản lý
            </Link>
          </li>
          <li>
            <Link to="/login" className="home-link home-hr">
              Phòng Nhân sự
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
