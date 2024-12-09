import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployee from "./AddEmployee.js";
import "./Employee.css";

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Keep track of current page
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Records per page

    // Fetch employees from the API
    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8080/NVCT/getallnhanvien", {
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            });
            setEmployees(response.data);
        } catch (err) {
            console.error("Error fetching employees:", err);
            setError("Failed to load employee data. Please try again later.");
        }
    };

    // Delete an employee
    const deleteEmployee = async (msnv) => {
        try {
            const response = await axios.delete(`http://localhost:8080/NVCT/xoa?msnv=${msnv}`);
            if (response.status === 200) {
                alert("Nhân viên đã được xóa thành công!");
                fetchEmployees(); // Refresh the employee list after deletion
            } else {
                alert("Lỗi khi xóa nhân viên!");
            }
        } catch (err) {
            console.error("Error deleting employee:", err);
            alert("Lỗi khi xóa nhân viên!");
        }
    };

    // Open the edit form for a selected employee
    const openEditForm = (employee) => {
        setSelectedEmployee(employee);
        setShowEditForm(true);
    };

    // Update employee details
    const updateEmployee = async (updatedData) => {
        try {
            const { msnv, hoten } = updatedData;
            const response = await axios.put(
                `http://localhost:8080/NVCT/suaten`,
                null,
                {
                    params: { msnv, hoten },
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (response.status === 200) {
                alert("Nhân viên đã được cập nhật thành công!");
                fetchEmployees(); // Refresh the employee list after update
                setShowEditForm(false);
            } else {
                alert("Lỗi khi cập nhật nhân viên!");
            }
        } catch (err) {
            console.error("Error updating employee:", err);
            alert("Lỗi khi cập nhật nhân viên!");
        }
    };

    // Pagination: Get current records for the page
    const paginateEmployees = (employees) => {
        const indexOfLastEmployee = currentPage * recordsPerPage;
        const indexOfFirstEmployee = indexOfLastEmployee - recordsPerPage;
        return employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle page size change
    const handlePageSizeChange = (event) => {
        setRecordsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const totalPages = Math.ceil(employees.length / recordsPerPage);

    return (
        <div className="employee-list">
            <div className="header-row">
                <h2>Danh sách nhân viên</h2>
                <button
                    className="add-employee-button"
                    onClick={() => setShowAddForm(true)}
                >
                    + Thêm nhân viên
                </button>
                <div className="pagination-controls">
                    <select onChange={handlePageSizeChange} value={recordsPerPage}>
                        <option value={5}>5 Records per page</option>
                        <option value={10}>10 Records per page</option>
                        <option value={15}>15 Records per page</option>
                    </select>
                </div>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="employee-table-wrapper">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Mã NV</th>
                            <th>Họ và tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>CCCD</th>
                            <th>Loại NV</th>
                            <th>Mã PB</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            paginateEmployees(employees).map((employee) => (
                                <tr key={employee.msnv}>
                                    <td>{employee.msnv}</td>
                                    <td>{employee.hoten}</td>
                                    <td>{employee.ngaysinh}</td>
                                    <td>{employee.gioitinh}</td>
                                    <td>{employee.cccd}</td>
                                    <td>{employee.loainhanvien}</td>
                                    <td>{employee.mspb}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => openEditForm(employee)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteEmployee(employee.msnv)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-data">
                                    Không có dữ liệu nhân viên.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            {showAddForm && <AddEmployee onClose={() => setShowAddForm(false)} refreshEmployees={fetchEmployees} />}
            {showEditForm && (
                <EditEmployeeForm
                    employee={selectedEmployee}
                    onClose={() => setShowEditForm(false)}
                    onSave={updateEmployee}
                />
            )}
        </div>
    );
};

const EditEmployeeForm = ({ employee, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        msnv: employee.msnv,  // Unique ID, should not be changed
        hoten: employee.hoten,  // Editable field
        ngaysinh: employee.ngaysinh || "",
        gioitinh: employee.gioitinh || "",
        cccd: employee.cccd || "",
        loainhanvien: employee.loainhanvien || "",
        mspb: employee.mspb || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Only send the fields that can be updated (e.g., hoten)
        const updatedData = {
            msnv: formData.msnv,
            hoten: formData.hoten,
            ngaysinh: formData.ngaysinh,
            gioitinh: formData.gioitinh,
            cccd: formData.cccd,
            loainhanvien: formData.loainhanvien,
            mspb: formData.mspb,
        };
        onSave(updatedData); // Send the formData to the parent function for saving
    };

    return (
        <div className="edit-employee-modal">
            <div className="modal-content">
                <h3>Chỉnh sửa nhân viên</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Mã NV:</label>
                        <input
                            type="text"
                            name="msnv"
                            value={formData.msnv}
                            readOnly
                            className="readonly"
                        />
                    </div>
                    <div className="form-group">
                        <label>Họ và tên:</label>
                        <input
                            type="text"
                            name="hoten"
                            value={formData.hoten}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">
                            Lưu
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Employee;
// đkjksdjkfjksdl