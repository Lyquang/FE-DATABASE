import React, { useEffect, useState } from "react";
import "./EHeader.scss";
import { Navbar, NavDropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const EHeader = () => {
  const [name, setName] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployeeName = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("accountId");

        if (!token || !accountId) {
          setError("Authentication token or account ID not found");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/employee/account?id=${accountId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();
        setName(`${data.lastName} ${data.firstName}`);
      } catch (err) {
        console.error("Error fetching employee name:", err);
        setError(err.message);
      }
    };

    fetchEmployeeName();
  }, []);

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          {/* Logo or Brand Name */}
        </NavLink>

        <div className="header-icons">
          {/* Notification Icon */}
          <div className="bell">
            <span className="material-icons layer-1">notifications_active</span>
            <span className="material-icons layer-2">notifications</span>
            <span className="material-icons layer-3">notifications</span>
          </div>

          {/* Message Icon */}
          <span className="material-icons icon">message</span>

          {/* Profile Dropdown */}
          <NavDropdown
            title={
              <>
                {/* <img
                  className="avatar rounded-circle"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User Avatar"
                  style={{ width: "30px", height: "30px", marginRight: "8px" }}
                /> */}
                <span className="profile-name">{name}</span>
              </>
            }
            id="profile-dropdown"
          >
            <NavDropdown.Item>Hồ sơ</NavDropdown.Item>
            <NavDropdown.Item>Đăng xuất</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default EHeader;
