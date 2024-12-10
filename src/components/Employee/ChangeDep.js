import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css"; // Update the CSS file name if needed

const ChangeDep = ({ onClose, refreshEmployees }) => {
    const [formData, setFormData] = useState({
        nv: "",
        luong: "",
        chuc: "",
        pban: "",
        loai: "",
        toithieu: "",
        sta: "",
    });

    const [message, setMessage] = useState("");

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
            const queryParams = new URLSearchParams({
                nv: formData.nv,
                luong: formData.luong,
                chuc: formData.chuc,
                pban: formData.pban,
                loai: formData.loai,
                toithieu: formData.toithieu,
                sta: formData.sta,
            }).toString();
    
            const response = await axios.post(`http://localhost:8080/NVTV/chuyenviec?${queryParams}`);
            
            // Alert the response message regardless of the status code
            alert(`Response: ${JSON.stringify(response.data)}`);
            
            if (response.status === 200) {
                setMessage(response.data.message || "Thao tác thành công!");
                refreshEmployees();
                onClose();
            } else {
                setMessage(response.data.message || "Lỗi khi chuyển nhân viên!");
            }
        } catch (err) {
            if (err.response) {
                // If there's a response error (e.g., status 400), alert the error message
                alert(`Error: ${JSON.stringify(err.response.data)}`);
            } else {
                // If no response (e.g., network issue)
                console.error("Error changing department:", err);
                alert("Đã xảy ra lỗi khi chuyển nhân viên.");
            }
        }
    };
    

    return (
        <div className="add-employee-modal">
            <div className="modal-content">
                <h3>Chuyển Phòng ban cho nhân viên</h3>
                <form onSubmit={handleSubmit} className="employee-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Mã nhân viên:</label>
                            <input
                                type="text"
                                name="nv"
                                value={formData.nv}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Lương cơ bản:</label>
                            <input
                                type="text"
                                name="luong"
                                value={formData.luong}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Chức vụ:</label>
                            <input
                                type="text"
                                name="chuc"
                                value={formData.chuc}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mã phòng ban:</label>
                            <input
                                type="text"
                                name="pban"
                                value={formData.pban}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Loại công việc:</label>
                            <input
                                type="text"
                                name="loai"
                                value={formData.loai}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Số giờ tối thiểu:</label>
                            <input
                                type="text"
                                name="toithieu"
                                value={formData.toithieu}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Ngày bắt đầu:</label>
                            <input
                                type="date"
                                name="sta"
                                value={formData.sta}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">
                            Chuyển công việc
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Hủy
                        </button>
                    </div>
                </form>
                {message && <p className="api-message">{message}</p>}
            </div>
        </div>
    );
};

export default ChangeDep;
