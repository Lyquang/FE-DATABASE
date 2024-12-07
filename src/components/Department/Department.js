import React, { useEffect, useState } from "react";
import "./Department.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { postCreateNewDepartment } from "../services/apiService";
import axios from "../utils/axiosCustomize";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    mspb: "",
    ten: "",
    mota: "",
    nvquanly: "",
  });

  const [editData, setEditData] = useState({
    mspb: "",
    ten: "",
  });

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/phongban/getAllPhongban");
      if (response && response.data) {
        const transformedData = response.data.map((dept) => ({
          departmentId: dept.mspb,
          departmentName: dept.tenphongban,
          employeeNumber: dept.soluongnhanvien,
          managerId: dept.nv_quanly,
        }));
        setDepartments(transformedData);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching departments:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openCreateForm = () => {
    setShowCreateForm(true);
    setFormData({
      name: "",
      managerId: "",
    });
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
    setFormData({
      name: "",
      managerId: "",
    });
  };


  const openEditForm = (department) => {
    setFormData({
      mspb: department.departmentId, // Gán đúng trường
      ten: department.departmentName,
    });
    setShowEditForm(true);
  };

  
  const closeEditForm = () => {
        setShowEditForm(false);
    };



  //api thêm phong ban
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct the payload from formData
      const { mspb, mota, ten, nvquanly } = formData;
  
      // Make the API request
      const response = await axios.post(
        "http://localhost:8080/phongban/themphongban",
        null,
        {
          params: { mspb, mota, ten, nvquanly },
        }
      );
  
      if (response && response.data) {
        alert(response.data.message || "Thêm phòng ban mới thành công!");
  
        // Update the department list with the new entry
        const newDepartment = {
          departmentId: mspb,
          departmentName: ten,
          description: mota,
          managerId: nvquanly || "Chưa có",
          employeeNumber: 0, // Default value as it's not provided
        };
  
        setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
      }
    } catch (err) {
      console.error("Error creating department:", err);
      alert("Lỗi khi thêm phòng ban mới!");
    }
    closeCreateForm();
  };
  
//api xoa phong ban
  const deleteDepartment = async (mspb) => {
    if (window.confirm("Bạn có chắc chắn là xóa phòng ban này không?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/phongban/xoaphongban`, {
          params: { mspb },
        });
  
        if (response.status === 200) {
          const message = response.data.message || "Xóa thành công";
          alert(message);
  
          // Remove the department from the local state
          setDepartments((prevDepartments) =>
            prevDepartments.filter((dept) => dept.departmentId !== mspb)
          );
        } else {
          alert("Bị lỗi khi xóa phòng ban");
        }
      } catch (error) {
        console.error("Error deleting the department:", error);
        alert("An error occurred while deleting the department.");
      }
    }
  };


  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { mspb, ten } = formData; // Sử dụng formData để gửi API
  
      // Gửi API PUT
      const response = await axios.put(
        "http://localhost:8080/phongban/suaphongban",
        null,
        {
          params: { mspb, ten },
        }
      );
  
      if (response && response.data) {
        alert(response.data.message || "Sửa tên phòng ban thành công!");
  
        // Cập nhật danh sách phòng ban
        setDepartments((prevDepartments) =>
          prevDepartments.map((dept) =>
            dept.departmentId === mspb
              ? { ...dept, departmentName: ten } // Cập nhật tên mới
              : dept
          )
        );
      }
    } catch (err) {
      console.error("Lỗi khi sửa phòng ban:", err);
      alert("Lỗi khi sửa phòng ban!");
    }
    closeEditForm();
  };

  return (
    <div className="departments-container">
      <h2 className="departments-title">Danh sách phòng ban</h2>
      <div className="departments-grid">
        {departments.map((department) => (
          <div
            key={department.departmentId}
            className={`department-card department-${department.departmentId}`}
          >
            <div className="department-card-header">
              <h3 className="department-name">{department.departmentName}</h3>
              <div className="department-actions">
                <FaEdit
                  className="action-icon edit-icon"
                  onClick={() => openEditForm(department)}
                />
                <FaTrashAlt
                  className="action-icon delete-icon"
                  onClick={() => deleteDepartment(department.departmentId)}
                />

              </div>
            </div>
            <div className="department-card-body">
              <p><strong>Mã phòng ban:</strong> {department.departmentId}</p>
              <p><strong>Số lượng nhân viên:</strong> {department.employeeNumber}</p>
              <p>
                <strong>Mã quản lý:</strong> {department.managerId || "Chưa có"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="create-department-button" onClick={openCreateForm}>
        + Tạo phòng ban mới
      </button>

      {showCreateForm && (
  <div className="modal">
    <div className="modal-content">
      <h3>Tạo phòng ban mới</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label style={{ textAlign: "left", display: "block" }}>Mã phòng ban (mspb):</label>
          <input
            type="text"
            name="mspb"
            value={formData.mspb}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ textAlign: "left", display: "block" }}>Tên phòng ban (ten):</label>
          <input
            type="text"
            name="ten"
            value={formData.ten}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ textAlign: "left", display: "block" }}>Mô tả (mota):</label>
          <textarea
            name="mota"
            value={formData.mota}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ textAlign: "left", display: "block" }}>Mã quản lý (nvquanly):</label>
          <input
            type="text"
            name="nvquanly"
            value={formData.nvquanly}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Tạo mới
          </button>
          <button type="button" className="cancel-button" onClick={closeCreateForm}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{showEditForm && (
  <div className="modal">
    <div className="modal-content">
      <h3>Sửa ban mới</h3>
      <form onSubmit={handleEditFormSubmit}>
        <div className="form-group">
          <label style={{ textAlign: "left", display: "block" }}>Mã phòng ban (mspb):</label>
          <input
            type="text"
            name="mspb"
            value={formData.mspb}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{ textAlign: "left", display: "block" }}>Tên phòng ban (ten):</label>
          <input
            type="text"
            name="ten"
            value={formData.ten}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Lưu
          </button>
          <button type="button" className="cancel-button" onClick={closeEditForm}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Department;
