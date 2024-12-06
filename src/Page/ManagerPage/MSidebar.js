import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { FaProjectDiagram, FaRegUser } from 'react-icons/fa';
import { GiTeamUpgrade } from 'react-icons/gi';
import { BiLogOut, BiChat, BiX, BiChevronRight } from 'react-icons/bi'; 
import './MSidebar.scss';

function MSidebar() {
  const [expanded, setExpanded] = useState(true);

  const [isLogoHidden, setIsLogoHidden] = useState(false); // Trạng thái checkbox để ẩn logo

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`}>

     <div className="sidebar-header">
        <div className="header-row">
          <span className={`logo ${isLogoHidden ? 'hide-text' : ''}`}>BK-MANARATE</span>
          <button onClick={() => setExpanded((prev) => !prev)} className="toggle-btn" aria-label="Toggle Sidebar">
            {expanded ? 'X' : '>'}
          </button>
        </div>
        <div className="user-info">
          <img className="avatar rounded-circle" src="https://randomuser.me/api/portraits/women/1.jpg" alt="User Avatar" />
          {expanded && <span className="user-name">Manager</span>}
        </div>
      </div>


      <div className="nav-links">
        <Link to="infor" className="nav-link-side">
          <FaRegUser />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Thông tin</span>
        </Link>
        <Link to="attendance" className="nav-link-side">
          <PiNotePencilDuotone />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Chấm công</span>
        </Link>

        <Link to="project" className="nav-link-side">
          <FaProjectDiagram />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Dự án</span>
        </Link>
    
        <Link to="chat" className="nav-link-side">
          <BiChat />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Tin nhắn</span>
        </Link>
        
        <Link to="logout" className="nav-link-side">
          <BiLogOut />
          <span className={`link-text ${expanded ? 'show' : ''}`}>Đăng xuất</span>
        </Link>
      </div>
    </div>
  );
}

export default MSidebar;
