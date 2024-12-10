import React, { useState } from "react";
import axios from "axios";
import "./AddEmployee.css"; // Update the CSS file name if needed

const ChangtoOfficial = ({ onClose, refreshEmployees }) => {
    const [formData, setFormData] = useState({
        nv: "",
        bhxh: "",
        luong: "",
        toithieu: "",
        hanthuviec: "",
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
                bhxh: formData.bhxh,
                luong: formData.luong,
                toithieu: formData.toithieu,
                hanthuviec: formData.hanthuviec,
            }).toString();
    
            const response = await axios.post(`http://localhost:8080/NVTV/lenchinhthuc?${queryParams}`);
            
            if (response.status === 200) {
                alert(`Chuyển nhân viên lên chính thức thành công! Response: ${JSON.stringify(response.data)}`);
       
                refreshEmployees();
                onClose();
            } else {
                setMessage(response.data.message || "Lỗi khi chuyển nhân viên!");
            }
        } catch (err) {
            if (err.response) {
                // If there is a response error (e.g., status 400)
                console.error("Error Response:", err.response.data);
                // Alert all available messages from the API response
                alert(`Lỗi: ${JSON.stringify(err.response.data)}`);
            } else {
                // If there is no response (e.g., network issue)
                console.error("Error transitioning employee:", err);
                alert("Đã xảy ra lỗi khi chuyển nhân viên.");
            }
        }
    };
    

    return (
        <div className="add-employee-modal">
            <div className="modal-content">
                <h3>Chuyển nhân viên lên chính thức</h3>
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
                            <label>Số BHXH:</label>
                            <input
                                type="text"
                                name="bhxh"
                                value={formData.bhxh}
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
                                name="luong"
                                value={formData.luong}
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
                            <label>Hạn thử việc:</label>
                            <input
                                type="date"
                                name="hanthuviec"
                                value={formData.hanthuviec}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">
                            Chuyển đổi
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

export default ChangtoOfficial;
