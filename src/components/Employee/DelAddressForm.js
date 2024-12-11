import React, { useState } from "react";
import axios from "axios";
import "./AddPhoneForm.css";

const DelAddressForm = ({ onClose, refreshAddresses }) => {
    const [msnv, setMsnv] = useState(""); // State for msnv
    const [sonha, setSonha] = useState(""); // State for số nhà
    const [tenduong, setTenduong] = useState(""); // State for tên đường
    const [phuong, setPhuong] = useState(""); // State for phường
    const [tinhthanhpho, setTinhthanhpho] = useState(""); // State for tỉnh/thành phố
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams({
                p_msnv: msnv,
                p_sonha: sonha,
                p_tenduong: tenduong,
                p_phuong: phuong,
                p_tinhthanhpho: tinhthanhpho,
            }).toString();

            console.log("param", queryParams);

            const response = await axios.delete(`http://localhost:8080/NVCT/xoadiachi?${queryParams}`);

            console.log("API Response:", response);

            if (response.status === 200) {
                window.alert(`Xóa thành công! Response Data: ${JSON.stringify(response.data, null, 2)}`);
                setMessage(response.data || "Xóa thành công!");
                setError(null);
                refreshAddresses();
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
                alert("Đã xảy ra lỗi khi xóa địa chỉ.");
                setError("Đã xảy ra lỗi khi xóa địa chỉ.");
            }
            setMessage(null);
        }
    };

    return (
        <div className="add-phone-modal">
            <div className="modal-content">
                <h3>Xóa địa chỉ</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Mã nhân viên:</label>
                        <input
                            type="text"
                            value={msnv}
                            onChange={(e) => setMsnv(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Số nhà:</label>
                        <input
                            type="text"
                            value={sonha}
                            onChange={(e) => setSonha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tên đường:</label>
                        <input
                            type="text"
                            value={tenduong}
                            onChange={(e) => setTenduong(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phường:</label>
                        <input
                            type="text"
                            value={phuong}
                            onChange={(e) => setPhuong(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tỉnh/Thành phố:</label>
                        <input
                            type="text"
                            value={tinhthanhpho}
                            onChange={(e) => setTinhthanhpho(e.target.value)}
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

export default DelAddressForm;
