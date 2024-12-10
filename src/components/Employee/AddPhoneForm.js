import React, { useState } from "react";
import axios from "axios";
import "./AddPhoneForm.css";

const AddPhoneForm = ({ onClose, refreshPhones }) => {
    const [msnv, setMsnv] = useState("");  // State for msnv
    const [phoneNumber, setPhoneNumber] = useState("");
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
    
            const response = await axios.post(`http://localhost:8080/NVCT/themsdt?${queryParams}`);
            
            // Log the full response object for debugging
            console.log("API Response:", response);
    
            // Check if the response status is successful (200)
            if (response.status === 200) {
                // Alert the API response message and any additional information
                window.alert(`Thêm thành công! Response Data: ${JSON.stringify(response.data, null, 2)}`);
                setMessage(response.data || "Thêm thành công!");
                setError(null);
                refreshPhones();
            } else {
                // Handle non-200 status (error in response)
                alert(`Error: ${response.status} - ${response.statusText}\n${JSON.stringify(response.data, null, 2)}`);
                setError(`Error: ${response.status} - ${response.statusText}`);
                setMessage(null);
            }
        } catch (err) {
            // Handle errors (network issues, 4xx/5xx responses, etc.)
            console.error("Error Details:", err); // Log the error details for debugging
            
            if (err.response) {
                // When API responds with an error (status code 4xx or 5xx)
                alert(`Error: ${err.response.status} - ${err.response.statusText}\n${JSON.stringify(err.response.data, null, 2)}`);
                setError(`Error: ${err.response.status} - ${err.response.statusText}`);
                console.log("API Error Response:", err.response.data);
            } else {
                // Handle network errors or other issues
                alert("Đã xảy ra lỗi khi thêm số điện thoại.");
                setError("Đã xảy ra lỗi khi thêm số điện thoại.");
            }
            setMessage(null); // Reset success message on error
        }
    };
    

    return (
        <div className="add-phone-modal">
            <div className="modal-content">
                <h3>Thêm số điện thoại</h3>
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
                            Thêm
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

export default AddPhoneForm;
