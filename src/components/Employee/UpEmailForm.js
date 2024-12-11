import React, { useState } from "react";
import axios from "axios";
import "./AddPhoneForm.css";

const UpEmailForm = ({ onClose, refreshEmails }) => {
    const [msnv, setMsnv] = useState(""); // State for msnv
    const [oldEmail, setOldEmail] = useState(""); // State for old email
    const [newEmail, setNewEmail] = useState(""); // State for new email
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleMsnvChange = (e) => {
        setMsnv(e.target.value);
    };

    const handleOldEmailChange = (e) => {
        setOldEmail(e.target.value);
    };

    const handleNewEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams({
                p_msnv: msnv,
                p_old_email: oldEmail,
                p_new_email: newEmail,
            }).toString();

            console.log("param", queryParams);

            const response = await axios.put(`http://localhost:8080/NVCT/suaemail?${queryParams}`);

            console.log("API Response:", response);

            if (response.status === 200) {
                window.alert(`Response Data: ${JSON.stringify(response.data, null, 2)}`);
                setMessage(response.data || "Cập nhật thành công!");
                setError(null);
                refreshEmails();
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
                alert("Đã xảy ra lỗi khi cập nhật email.");
                setError("Đã xảy ra lỗi khi cập nhật email.");
            }
            setMessage(null);
        }
    };

    return (
        <div className="add-phone-modal">
            <div className="modal-content">
                <h3>Cập nhật email</h3>
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
                        <label>Email cũ:</label>
                        <input
                            type="email"
                            value={oldEmail}
                            onChange={handleOldEmailChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email mới:</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={handleNewEmailChange}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">
                            Cập nhật
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

export default UpEmailForm;