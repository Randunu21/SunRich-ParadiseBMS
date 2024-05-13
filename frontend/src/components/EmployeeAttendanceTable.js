import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployeeAttendanceTable() {
  const [employees, setEmployees] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [todayAttendance, setTodayAttendance] = useState({});

  useEffect(() => {
    // Fetch employees
    axios.get("http://localhost:4000/api/employees/getEmployees")
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });

    // Fetch today's attendance
    const today = new Date().toISOString().split("T")[0];
    axios.get(`http://localhost:4000/api/employees/attendance/${today}`)
      .then(response => {
        setTodayAttendance(response.data);
      })
      .catch(error => {
        console.error('Error fetching today\'s attendance:', error);
      });

    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString(undefined, options));
  }, []);

  const getAttendance = (employeeId) => {
    return todayAttendance[employeeId] || "Absent";
  };

  const getAttendanceColor = (attendance) => {
    return attendance === "Present" ? "bg-success" : "bg-danger";
  };

  return (
    <div className="container mt-4">
      <h2>Employee Attendance Table - {currentDate}</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Today's Attendance</th>
            <th>Date</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
            <th>Action</th> {/* New column for the "View" button */}
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.empId}</td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td className={getAttendanceColor(getAttendance(employee._id))}>{getAttendance(employee._id)}</td>
              <td>{todayAttendance[employee._id]?.date}</td>
              <td>{todayAttendance[employee._id]?.arrivalTime}</td>
              <td>{todayAttendance[employee._id]?.departureTime}</td>
              <td>
                <Link to={`/employee/${employee._id}`} className="btn btn-primary">View</Link> {/* View button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAttendanceTable;
