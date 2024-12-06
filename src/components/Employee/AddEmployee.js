import React, { useState } from 'react';
import './AddEmployee.css';

const AddEmployee = ({ onAddEmployee }) => {
  const [role, setRole] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    lastName: '',
    firstName: '',
    gender: 'MALE', // default gender
    email: '',
    city: '',
    street: '',
    phoneNumber: '',
    avatar: '',
  });

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setNewEmployee({
      ...newEmployee,
      role: selectedRole,
      // task_complete: '',
      // project: '',
      // manage_date: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEmployee({ ...newEmployee, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClick = () => {
    // console.log(">>>> ", newEmployee);
    onAddEmployee(newEmployee);
  };

  return (
    <div className="add-employee-container">
      {!role ? (
        <div className="role-selection">
          <button
            className="btn btn-primary"
            onClick={() => handleRoleSelect('Employee')}
          >
            Thêm Nhân viên
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleRoleSelect('Manager')}
          >
            Thêm Quản lý
          </button>
        </div>
      ) : (
        <form className="add-employee-form">
          {/* Avatar Preview */}
          <div className="avatar-upload-container">
            <label htmlFor="avatar-input">
              <div className="avatar-wrapper">
                {newEmployee.avatar ? (
                  <img
                    src={newEmployee.avatar}
                    alt="Avatar preview"
                    className="avatar-preview-circle"
                  />
                ) : (
                  <div className="avatar-placeholder">+</div>
                )}
              </div>
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Form Inputs */}

          <div className="row g-3 mb-0">

            <div className="col-sm-6">

              <input
                type="text"
                name="lastName"
                placeholder="Họ"
                value={newEmployee.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                name="firstName"
                placeholder="Tên"
                value={newEmployee.firstName}
                onChange={handleChange}
              />
            </div>
          </div>

          <select
            name="gender"
            value={newEmployee.gender}
            onChange={handleChange}
            className="form-control"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Tên tài khoản"
            value={newEmployee.username}
            onChange={handleChange}
          />

          <input
            type="text"
            name="password"
            placeholder="Mật khẩu"
            value={newEmployee.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="Thành phố"
            value={newEmployee.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Đường"
            value={newEmployee.street}
            onChange={handleChange}
          />


          <input
            type="text"
            name="phoneNumber"
            placeholder="Số điện thoại"
            value={newEmployee.phoneNumber}
            onChange={handleChange}
          />


          <input
            type="text"
            name="department"
            placeholder="Phòng ban"
            value={newEmployee.department}
            onChange={handleChange}
          />


          <input
            type="text"
            name="deptId"
            placeholder="Mã phòng ban"
            value={newEmployee.deptId}
            onChange={handleChange}
          />
          {role === 'Employee' && (
            <>

              {/* <input
                type="text"
                name="project"
                placeholder="Số dự án hiện tại"
                value={newEmployee.project}
                onChange={handleChange}
              /> */}


            </>
          )}
          {role === 'Manager' && (
            <input
              type="date"
              name="manage_date"
              placeholder="Ngày quản lý"
              value={newEmployee.manageDate}
              onChange={handleChange}
            />


          )}
          {/* <input
            type="text"
            name="job"
            placeholder="Mô tả công việc"
            value={newEmployee.job}
            onChange={handleChange}
          /> */}

          <button type="button" onClick={handleAddClick}>
            {role === 'Employee' ? 'Thêm Nhân viên' : 'Thêm Quản lý'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddEmployee;
