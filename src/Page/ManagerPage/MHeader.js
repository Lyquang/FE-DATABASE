import React, { useEffect, useState } from 'react';
import './MHeader.scss';
import { Navbar, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MHeader = ({ personnel }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock danh sách thông báo
  const notifications = [
    {
      id: 1,
      avatar: 'assets/images/xs/avatar1.jpg',
      name: 'Dylan Hunter',
      time: '2MIN',
      content: 'Added 2021-02-19 my-Task ui/ux Design',
      badge: 'Review',
    },
    {
      id: 2,
      avatar: '',
      name: 'Diane Fisher',
      time: '13MIN',
      content: 'Task added Get Started with Fast Cad project',
      badge: null,
    },
    {
      id: 3,
      avatar: 'assets/images/xs/avatar3.jpg',
      name: 'Andrea Gill',
      time: '1HR',
      content: 'Quality Assurance Task Completed',
      badge: null,
    },
    {
      id: 4,
      avatar: 'assets/images/xs/avatar5.jpg',
      name: 'Diane Fisher',
      time: '13MIN',
      content: 'Add New Project for App Development',
      badge: null,
    },
    {
      id: 5,
      avatar: 'assets/images/xs/avatar6.jpg',
      name: 'Andrea Gill',
      time: '1HR',
      content: 'Add Timesheet For Rhinestone project',
      badge: null,
    },
    {
      id: 6,
      avatar: 'assets/images/xs/avatar7.jpg',
      name: 'Zoe Wright',
      time: '1DAY',
      content: 'Add Calendar Event',
      badge: null,
    },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    console.log('MHeader personnel >>>', personnel);
  }, [personnel]);

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          My App
        </NavLink>

        <div className="header-icons position-relative">
          {/* Notification Icon */}
          <div className="bell position-relative" onClick={toggleNotifications}>
            <span className="material-icons layer-1">notifications_active</span>
            <span className="material-icons layer-2">notifications</span>
            <span className="material-icons layer-3">notifications</span>
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
              {notifications.length}
            </span>
          </div>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div
              id="NotificationsDiv"
              className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0"
              style={{
                display: 'block',
                position: 'absolute',
                top: '40px',
                right: '0',
                zIndex: 10,
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              <div className="card border-0 w380">
                <div className="card-header border-0 p-3">
                  <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                    <span>Notifications</span>
                    <span className="badge text-white">{notifications.length}</span>
                  </h5>
                </div>
                <div className="tab-content card-body">
                  <div className="tab-pane fade show active">
                    <ul className="list-unstyled list mb-0">
                      {notifications.map((notification) => (
                        <li key={notification.id} className="py-2 mb-1 border-bottom">
                          <div className="d-flex notification-item">
                            {notification.avatar ? (
                              <img
                                className="avatar rounded-circle"
                                src={notification.avatar}
                                alt=""
                              />
                            ) : (
                              <div className="avatar rounded-circle no-thumbnail">
                                {notification.name.charAt(0)}
                              </div>
                            )}
                            <div className="flex-fill ms-2">
                              <p className="d-flex justify-content-between mb-1">
                                <span className="notification-name">
                                  {notification.name}
                                </span>
                                <small className="notification-time">{notification.time}</small>
                              </p>
                              <span className="notification-content">
                                {notification.content}{' '}
                                {notification.badge && (
                                  <span className="badge bg-success">{notification.badge}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  className="card-footer text-center border-top-0 text-primary"
                  href="#"
                  style={{ textDecoration: 'none' }}
                >
                  View all notifications
                </a>
              </div>
            </div>
          )}

          {/* User Dropdown */}
          <NavDropdown
            title={
              <>
                <img
                  className="avatar rounded-circle"
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  alt="User Avatar"
                  style={{ width: '30px', height: '30px', marginRight: '8px' }}
                />
                <span className="profile-name">
                  {personnel?.firstName ? personnel.firstName : 'Loading...'}
                </span>
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
