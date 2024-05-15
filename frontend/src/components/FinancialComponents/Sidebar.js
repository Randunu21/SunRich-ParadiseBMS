import React, { useState } from 'react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const sidebarStyle = {
    position: 'fixed',
    top: 55,
    left: 0,
    height: '100%',
    width: isCollapsed ? '60px' : '250px',
    backgroundColor: '#343a40',
    transition: 'width 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 1000,
  };

  const iconStyle = {
    color: 'white',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const textStyle = {
    marginLeft: '20px',
    display: isCollapsed ? 'none' : 'inline',
  };

  return (
    <div
      style={sidebarStyle}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <a href="/Financial/dash" style={iconStyle} className="sidebar-link">
        <i className="bi-clipboard-data"></i>
        <span style={textStyle}>Financial Summary</span>
      </a>
      <a href="/Financial/trans" style={iconStyle} className="sidebar-link">
        <i className="bi-currency-dollar"></i>
        <span style={textStyle}>Income/Expense Management</span>
      </a>
      <a href="/Financial/payroll" style={iconStyle} className="sidebar-link">
        <i className="bi-person-plus"></i>
        <span style={textStyle}>Employee Payroll Management</span>
      </a>
      <style jsx>{`
        .sidebar-link:hover {
          background-color: #e0e0e0; // Light gray background
          color: #343a40; // Dark text
        }

        .sidebar-link:hover i, .sidebar-link:hover span {
          color: #343a40; // Dark text for icons and span on hover
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
