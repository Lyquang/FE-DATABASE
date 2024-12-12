import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployee from "./AddEmployee.js";
import AddEmployee1 from "./AddEmployee1.js";
import ChangetoOfficial from "./ChangetoOfficial.js";
import ChangeDep from "./ChangeDep.js";
import AddPhoneForm from "./AddPhoneForm.js";
import AddEmailForm from "./AddEmailForm.js";
import AddAddressForm from "./AddAddressForm.js";

import DelPhoneForm from "./DelPhoneForm.js";
import DelEmailForm from "./DelEmailForm.js";
import DelAddressForm from "./DelAddressForm.js";

import UpPhoneForm from "./UpPhoneForm.js";
import UpEmailForm from "./UpEmailForm.js";
import UpAddressForm from "./UpAddressForm.js";
import "./Employee.css";


const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
   
    const [showEditForm, setShowEditForm] = useState(false);
    const [showEditForm1, setShowEditForm1] = useState(false);
   
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddForm1, setShowAddForm1] = useState(false);
    const [showAddForm2, setShowAddForm2] = useState(false);
    const [showAddForm3, setShowAddForm3] = useState(false);
//add
    const [showAddPhoneForm, setShowAddPhoneForm] = useState(false);
    const [showAddEmailForm, setShowAddEmailForm] = useState(false); // State to control popup visibility
    const [showAddressForm, setShowAddressForm] = useState(false);
//update
const [showUpPhoneForm, setShowUpPhoneForm] = useState(false);
const [showUpEmailForm, setShowUpEmailForm] = useState(false);
const [showUpAddressForm, setShowUpAddressForm] = useState(false);


//delete
const [showDelPhoneForm, setShowDelPhoneForm] = useState(false);
const [showDelEmailForm, setShowDelEmailForm] = useState(false);
const [showDelAddressForm, setShowDelAddressForm] = useState(false);



    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Keep track of current page
    const [recordsPerPage, setRecordsPerPage] = useState(10); // Records per page
    const [showModal, setShowModal] = useState(false); // State to toggle popup visibility
 

    // Fetch employees from the API
    const fetchEmployees = async () => {
        console.log("pass");
        try {
            const response = await axios.get("http://localhost:8080/NVCT/getallnhanvien", {
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            });
            setEmployees(response.data);
            console.log("pass",response);
        } catch (err) {
            console.error("Error fetching employees:", err);
            setError("Failed to load employee data. Please try again later.");
        }
    };

    const handleOpenAddEmailForm = () => {
        setShowAddEmailForm(true); // Show the popup
    };

    const handleCloseAddEmailForm = () => {
        setShowAddEmailForm(false); // Close the popup
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
<div className="button-group">
    {/* Thêm Nhân viên Dropdown */}
    <div className="dropdown">
        <button className="add-employee-button">
            Thêm Nhân viên
        </button>
        <div className="dropdown-content">
            <button onClick={() => setShowAddForm(true)}>Thêm nhân viên chính thức</button>
            <button onClick={() => setShowAddForm1(true)}>Thêm nhân viên thử việc</button>
        </div>
    </div>

    {/* Chuyển Đổi Dropdown */}
    <div className="dropdown">
        <button className="add-employee-button">
            Chuyển Đổi
        </button>
        <div className="dropdown-content">
            <button onClick={() => setShowAddForm2(true)}>Chuyển lên chính thức</button>
            <button onClick={() => setShowAddForm3(true)}>Chuyển phòng</button>
        </div>
    </div>

    <div className="dropdown">
        <button className="add-employee-button">
            Thêm Thông tin
        </button>
        <div className="dropdown-content">
            <button onClick={() => setShowAddPhoneForm(true)}>Thêm Số điện thoại</button>
            <button onClick={() => setShowAddEmailForm(true)}>Thêm Email</button>
            <button onClick={() => setShowAddressForm(true)}>Thêm Địa Chỉ </button>
        </div>
    </div>

    <div className="dropdown">
        <button className="add-employee-button">
           Cập nhật Thông tin
        </button>
        <div className="dropdown-content">
            <button onClick={() => setShowUpPhoneForm(true)}>Cập nhật Số điện thoại</button>
            <button onClick={() => setShowUpEmailForm(true)}>Cập nhật Email</button>
            <button onClick={() => setShowUpAddressForm(true)}>Cập nhật Địa Chỉ </button>
        </div>
    </div>


    <div className="dropdown">
        <button className="add-employee-button">
            Xóa Thông tin
        </button>
        <div className="dropdown-content">
            <button onClick={() => setShowDelPhoneForm(true)}>Xóa Số điện thoại</button>
            <button onClick={() => setShowDelEmailForm(true)}>Xóa Email</button>
            <button onClick={() => setShowDelAddressForm(true)}>Xóa Địa Chỉ </button>
        </div>
    </div>

</div>

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
                                            Chi tiết
                                        </button>
                                        
                                        
                                        <button
                                            className="delete-button"
                                            onClick={() => deleteEmployee(employee.msnv)}
                                        >
                                            Xóa NV
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
            {showAddForm1 && <AddEmployee1 onClose={() => setShowAddForm1(false)} refreshEmployees={fetchEmployees} />}
            {showAddForm2 && <ChangetoOfficial onClose={() => setShowAddForm2(false)} refreshEmployees={fetchEmployees} />}
            {showAddForm3 && <ChangeDep onClose={() => setShowAddForm3(false)} refreshEmployees={fetchEmployees} />}

            {showAddPhoneForm && <AddPhoneForm onClose={() => setShowAddPhoneForm(false)} refreshEmployees={fetchEmployees} />}
            {showAddEmailForm &&  <AddEmailForm onClose={() => setShowAddEmailForm(false)} refreshEmployees={fetchEmployees}/> }
            {showAddressForm && <AddAddressForm onClose={() => setShowAddressForm(false)} refreshEmployees={fetchEmployees} />}

            
            {showDelPhoneForm && <DelPhoneForm onClose={() => setShowDelPhoneForm(false)} refreshEmployees={fetchEmployees} />}
            {showDelEmailForm && <DelEmailForm onClose={() => setShowDelEmailForm(false)} refreshEmployees={fetchEmployees} />}
            {showDelAddressForm && <DelAddressForm onClose={() => setShowDelAddressForm(false)} refreshEmployees={fetchEmployees} />}

            {showUpPhoneForm && <UpPhoneForm onClose={() => setShowUpPhoneForm(false)} refreshEmployees={fetchEmployees} />}
            {showUpEmailForm && <UpEmailForm onClose={() => setShowUpEmailForm(false)} refreshEmployees={fetchEmployees} />}
            {showUpAddressForm && <UpAddressForm onClose={() => setShowUpAddressForm(false)} refreshEmployees={fetchEmployees} />}

            
            {/* {showAddPhoneForm && selectedEmployee && (
            <AddPhoneForm
                msnv={selectedEmployee.msnv} // Pass the msnv of the selected employee
                onClose={() => setShowAddPhoneForm(false)} // Close the form
                refreshPhones={fetchEmployees} // Refresh the employee data
            />
        )} */}

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
        msnv: employee.msnv,
        hoten: employee.hoten,
        ngaysinh: employee.ngaysinh || "",
        gioitinh: employee.gioitinh || "",
        cccd: employee.cccd || "",
        loainhanvien: employee.loainhanvien || "",
        mspb: employee.mspb || "",
    });
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [emails, setEmails] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState(null);

    // Fetch phone numbers, emails, and addresses when the form opens
    useEffect(() => {
        const fetchData = async () => {
            try {
                const phoneResponse = await axios.get(`http://localhost:8080/NVCT/all/sdt`, {
                    params: { msnv: formData.msnv },
                });
                if (phoneResponse.status === 200) {
                    setPhoneNumbers(phoneResponse.data);
                }

                const emailResponse = await axios.get(`http://localhost:8080/NVCT/all/email`, {
                    params: { msnv: formData.msnv },
                });
                if (emailResponse.status === 200) {
                    setEmails(emailResponse.data);
                }

                const addressResponse = await axios.get(`http://localhost:8080/NVCT/all/diachi`, {
                    params: { msnv: formData.msnv },
                });
                if (addressResponse.status === 200) {
                    setAddresses(addressResponse.data);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Lỗi khi tải dữ liệu.");
            }
        };

        fetchData();
    }, [formData.msnv]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            phoneNumbers,
            emails,
            addresses,
        };
        onSave(updatedData);
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
                    <div className="form-group">
                        <label>Số điện thoại:</label>
                        {phoneNumbers.length > 0 ? (
                            <ul className="phone-list">
                                {phoneNumbers.map((phone, index) => (
                                    <li key={index} className="phone-item">
                                        {phone}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Không có số điện thoại nào.</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Gmail:</label>
                        {emails.length > 0 ? (
                            <ul className="email-list">
                                {emails.map((email, index) => (
                                    <li key={index} className="email-item">
                                        {email}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Không có email nào.</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ:</label>
                        {addresses.length > 0 ? (
                            <ul className="address-list">
                                {addresses.map((address, index) => (
                                    <li key={index} className="address-item">
                                        {`${address.sonha}, ${address.tenduong}, ${address.phuong}, ${address.tinhthanhpho}`}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Không có địa chỉ nào.</p>
                        )}
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
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};





export default Employee;