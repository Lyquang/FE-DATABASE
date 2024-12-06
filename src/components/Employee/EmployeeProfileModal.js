import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './EmployeeProfileModal.css';

const EmployeeProfileModal = ({ show, handleClose, employee, handleSave }) => {
    const [editEmployee, setEditEmployee] = React.useState(employee);

    useEffect(() => {
        setEditEmployee(employee);
        //console.log(employee);
    }, [employee]);  // Chỉ cập nhật lại editEmployee khi employee thay đổi


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSave = () => {
        handleSave(editEmployee);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="employee-profile-modal">
            <Modal.Header closeButton>
                <Modal.Title>Thông tin nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="employee-profile-form">
                    <Form.Group controlId="formPosition" className="mt-2">
                        <Form.Label>Chức vụ</Form.Label>
                        <Form.Control
                            as="select"
                            name="role"
                            value={editEmployee.position}
                            onChange={handleChange}
                            disabled
                        >
                            <option value="Manager">Manager</option>
                            <option value="Employee">Employee</option>
                        </Form.Control>
                    </Form.Group>

                    <div className="row g-3 mb-0">
                        <div className="col-sm-6">
                            <Form.Group controlId="formFirstName">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={editEmployee.firstName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-sm-6">
                            <Form.Group controlId="formLastName">
                                <Form.Label>Họ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={editEmployee.lastName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group controlId="formGender" className="mt-2">
                        <Form.Label>Giới tính</Form.Label>
                        <Form.Control
                            as="select"
                            name="sex"
                            value={editEmployee.sex}
                            onChange={handleChange}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId="formEmail" className="mt-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={editEmployee.email}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group controlId="formUsername" className="mt-2">
                        <Form.Label>Tên tài khoản</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={editEmployee.username}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mt-2">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control
                            type="text"
                            name="password"
                            value={editEmployee.password}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="row g-3 mb-0">
                        <div className="col-sm-6">
                            <Form.Group controlId="formCity">
                                <Form.Label>Thành phố</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={editEmployee.city}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>

                        <div className="col-sm-6">
                            <Form.Group controlId="formstreet">
                                <Form.Label>Đường</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="street"
                                    value={editEmployee.street}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group controlId="formPhoneNumber" className="mt-2">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={editEmployee.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    {editEmployee.role === 'Manager' && (
                        <Form.Group controlId="formManagerDate" className="mt-2">
                            <Form.Label>Ngày bắt đầu quản lý</Form.Label>
                            <Form.Control
                                type="date"
                                name="manageDate"
                                value={editEmployee.manageDate || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    )}

                    
                    <Form.Group controlId="formDepartment" className="mt-2">
                        <Form.Label>Phòng ban</Form.Label>
                        <Form.Control
                            type="text"
                            name="department"
                            value={editEmployee.deptName || ''}
                            onChange={handleChange}
                            disabled
                        />
                    </Form.Group>

                    {/* Nếu là Manager thì có trường manageDate */}


                    {/* Nếu là Employee thì có các trường taskComplete và project */}
                    {editEmployee.position === 'Employee' && (
                        <>
                            {/* 
                            <Form.Group controlId="formProject" className="mt-2">
                                <Form.Label>Dự án hiện tại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="project"
                                    value={editEmployee.project}
                                    onChange={handleChange}
                                />
                            </Form.Group> */}
                        </>
                    )}

                    <Form.Group controlId="formDeptId" className="mt-2">
                        <Form.Label>Mã phòng ban</Form.Label>
                        <Form.Control
                            type="text"
                            name="deptId"
                            value={editEmployee.deptId || ''}
                            onChange={handleChange}
                            disabled
                        />
                    </Form.Group>

                    {/* 
                    <Form.Group controlId="formJob" className="mt-2">
                        <Form.Label>Mô tả công việc</Form.Label>
                        <Form.Control
                            type="text"
                            name="job"
                            value={editEmployee.job}
                            onChange={handleChange}
                        />
                    </Form.Group> */}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EmployeeProfileModal;
