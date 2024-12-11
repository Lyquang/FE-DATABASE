import React, { useState } from "react";
import axios from "axios";
import "./AddPhoneForm.css";

const DelPhoneForm = ({ onClose, refreshPhones }) => {
    const [msnv, setMsnv] = useState(""); // State for msnv
    const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleMsnvChange = (e) => {
        setMsnv(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams({
                p_msnv: msnv,
                p_sdt: phoneNumber,
            }).toString();

            console.log("param", queryParams);

            const response = await axios.delete(`http://localhost:8080/NVCT/xoasdt?${queryParams}`);

            console.log("API Response:", response);

            if (response.status === 200) {
                window.alert(`Xóa thành công! Response Data: ${JSON.stringify(response.data, null, 2)}`);
                setMessage(response.data || "Xóa thành công!");
                setError(null);
                refreshPhones();
            } else {
                alert(`Error: ${response.status} - ${response.statusText}\n${JSON.stringify(response.data, null, 2)}`);
                setError(`Error: ${response.status} - ${response.statusText}`);
                setMessage(null);
            }
        } catch (err) {
            console.error("Error Details:", err);

            if (err.response) {
                alert(`Error: ${err.response.status} - ${err.response.statusText}\n${JSON.stringify(err.response.data, null, 2)}`);
                setError(`Error: ${err.response.status} - ${err.response.statusText}`);
                console.log("API Error Response:", err.response.data);
            } else {
                alert("Đã xảy ra lỗi khi xóa số điện thoại.");
                setError("Đã xảy ra lỗi khi xóa số điện thoại.");
            }
            setMessage(null);
        }
    };

    return (
        <div className="add-phone-modal">
            <div className="modal-content">
                <h3>Xóa số điện thoại</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Mã nhân viên:</label>
                        <input 
                            type="text" 
                            value={msnv} 
                            onChange={handleMsnvChange} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại:</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">
                            Xóa
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Hủy
                        </button>
                    </div>
                </form>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default DelPhoneForm;
