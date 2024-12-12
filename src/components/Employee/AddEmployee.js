import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css";

const AddEmployee = ({ onClose, refreshEmployees }) => {
    const [formData, setFormData] = useState({
        msnv: "",
        hovaten: "",
        ngaysinh: "",
        gioitinh: "",
        cccd: "",
        masophongban: "",
        bhxh: "",
        nguoiquanly: "",
        startdate: "",
        chucvu: "",
        lcb: "",
        sogiotoithieu: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams(formData).toString();
            const response = await axios.post(`http://localhost:8080/NVCT/them?${queryParams}`);
            if (response.status === 200) {
                window.alert(` Response Data: ${JSON.stringify(response.data, null, 2)}`);
                refreshEmployees();
                onClose();
            } else {
                alert("Lỗi khi thêm nhân viên!");
            }
        } catch (err) {
            console.error("Error adding employee:", err);
            alert("Lỗi khi thêm nhân viên!");
        }
    };

    return (
        <div className="add-employee-modal">
            <div className="modal-content">
                <h3>Thêm nhân viên chính thức </h3>
                <form onSubmit={handleSubmit} className="employee-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Mã NV:</label>
                            <input
                                type="text"
                                name="msnv"
                                value={formData.msnv}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Họ và tên:</label>
                            <input
                                type="text"
                                name="hovaten"
                                value={formData.hovaten}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Ngày sinh:</label>
                            <input
                                type="text"
                                name="ngaysinh"
                                value={formData.ngaysinh}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Giới tính:</label>
                            <input
                                type="text"
                                name="gioitinh"
                                value={formData.gioitinh}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>CCCD:</label>
                            <input
                                type="text"
                                name="cccd"
                                value={formData.cccd}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mã phòng ban:</label>
                            <input
                                type="text"
                                name="masophongban"
                                value={formData.masophongban}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>BHXH:</label>
                            <input
                                type="text"
                                name="bhxh"
                                value={formData.bhxh}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Người quản lý:</label>
                            <input
                                type="text"
                                name="nguoiquanly"
                                value={formData.nguoiquanly}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Ngày bắt đầu:</label>
                            <input
                                type="text"
                                name="startdate"
                                value={formData.startdate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Chức vụ:</label>
                            <input
                                type="text"
                                name="chucvu"
                                value={formData.chucvu}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Lương cơ bản:</label>
                            <input
                                type="text"
                                name="lcb"
                                value={formData.lcb}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Số giờ tối thiểu:</label>
                            <input
                                type="text"
                                name="sogiotoithieu"
                                value={formData.sogiotoithieu}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">
                            Thêm mới
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

export default AddEmployee;
