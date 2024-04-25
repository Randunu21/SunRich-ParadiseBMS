import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import SideNavbarFin from '../../Components/SideNavbarFin';
import DisplayGenPay from '../../Components/DisplayGenPay'
import EmployeeSalaryTable from '../../Components/EmployeeSalaryTable';
import Sidebar from '../../Components/Sidebar';

function Emppayroll() {
  return (
    <div style={{ background: '#dbf8e3' }} >
      <div>
        <Navbar/>
        <Sidebar />
      </div>
      <div>
        <DisplayGenPay/>
      </div>
      <div>
        <EmployeeSalaryTable/>
      </div>
      <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px", textAlign: "center" }}>
                <span style={{ left: '10px' }}>SunRich Paradise All rights Reserved</span>
            </footer>
    </div>
  )
}

export default Emppayroll