import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Employee.css";

const EmployeeCard = ({ employee }) => {
    return (
        <div className="employee-card">
            <div className="card">
                <div className="card-header">
                    <h4>{employee.hoten}</h4>
                </div>
                <div className="card-body">
                    <p>
                        <strong>Employee Code:</strong> {employee.msnv}
                    </p>
                    <p>
                        <strong>Birthdate:</strong> {employee.ngaysinh}
                    </p>
                    <p>
                        <strong>Gender:</strong> {employee.gioitinh}
                    </p>
                    <p>
                        <strong>ID (CCCD):</strong> {employee.cccd}
                    </p>
                    <p>
                        <strong>Type:</strong> {employee.loainhanvien}
                    </p>
                    <p>
                        <strong>Department Code:</strong> {employee.mspb}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    // Fetch employees from API
    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8080/NVCT/getallnhanvien", {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "Keep-Alive": "timeout=60",
                },
            });
            console.log("data", response.data);
            setEmployees(response.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
            setError("Failed to load employee data. Please try again later.");
        }
    };
    
    

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="employee-grid">
                {employees.map((employee) => (
                    <EmployeeCard key={employee.msnv} employee={employee} />
                ))}
            </div>
        </div>
    );
};

export default Employee;
