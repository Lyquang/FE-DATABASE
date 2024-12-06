import React from 'react';
import './MHeader.scss';

import { Navbar, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MHeader = () => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          {/* Logo text or image */}
        </NavLink>

        <div className="header-icons">
          {/* Notification icon with shake effect */}
          <div className="bell">
            <span className="material-icons layer-1">notifications_active</span>
            <span className="material-icons layer-2">notifications</span>
            <span className="material-icons layer-3">notifications</span>
          </div>

          {/* Message icon from Material Icons */}
          <span className="material-icons icon">message</span>

          <NavDropdown
            title={
              <>
                <img
                  className="avatar rounded-circle"
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="User Avatar"
                  style={{ width: '30px', height: '30px', marginRight: '8px' }}
                />
                <span className="profile-name">John Doe</span>
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

export default MHeader;
