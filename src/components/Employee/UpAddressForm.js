import React, { useState } from "react";
import axios from "axios";
import "./AddPhoneForm.css";

const UpAddressForm = ({ onClose, refreshAddresses }) => {
    const [msnv, setMsnv] = useState("");
    const [oldSonha, setOldSonha] = useState("");
    const [oldTenduong, setOldTenduong] = useState("");
    const [oldPhuong, setOldPhuong] = useState("");
    const [oldTinhthanhpho, setOldTinhthanhpho] = useState("");
    const [newSonha, setNewSonha] = useState("");
    const [newTenduong, setNewTenduong] = useState("");
    const [newPhuong, setNewPhuong] = useState("");
    const [newTinhthanhpho, setNewTinhthanhpho] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = new URLSearchParams({
                p_msnv: msnv,
                p_old_sonha: oldSonha,
                p_old_tenduong: oldTenduong,
                p_old_phuong: oldPhuong,
                p_old_tinhthanhpho: oldTinhthanhpho,
                p_new_sonha: newSonha,
                p_new_tenduong: newTenduong,
                p_new_phuong: newPhuong,
                p_new_tinhthanhpho: newTinhthanhpho,
            }).toString();

            const response = await axios.put(`http://localhost:8080/NVCT/doidiachi?${queryParams}`);

            if (response.status === 200) {
                window.alert(`Response Data: ${JSON.stringify(response.data, null, 2)}`);
                alert(`Cập nhật địa chỉ thành công!`);
                setMessage("Cập nhật địa chỉ thành công!");
                setError(null);
                refreshAddresses();
            } else {
                alert(`Error: ${response.status} - ${response.statusText}`);
                setError(`Error: ${response.status} - ${response.statusText}`);
                setMessage(null);
            }
        } catch (err) {
            console.error("Error Details:", err);

            if (err.response) {
                alert(`Error: ${err.response.status} - ${err.response.statusText}`);
                setError(`Error: ${err.response.status} - ${err.response.statusText}`);
            } else {
                alert("Đã xảy ra lỗi khi cập nhật địa chỉ.");
                setError("Đã xảy ra lỗi khi cập nhật địa chỉ.");
            }
            setMessage(null);
        }
    };

    return (
        <div className="add-phone-modal">
            <div className="modal-content">
                <h3>Cập nhật địa chỉ</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Mã nhân viên:</label>
                        <input type="text" value={msnv} onChange={(e) => setMsnv(e.target.value)} required />
                    </div>
                    <h4>Địa chỉ cũ</h4>
                    <div className="form-group">
                        <label>Số nhà:</label>
                        <input type="text" value={oldSonha} onChange={(e) => setOldSonha(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Tên đường:</label>
                        <input type="text" value={oldTenduong} onChange={(e) => setOldTenduong(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Phường:</label>
                        <input type="text" value={oldPhuong} onChange={(e) => setOldPhuong(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Tỉnh/Thành phố:</label>
                        <input type="text" value={oldTinhthanhpho} onChange={(e) => setOldTinhthanhpho(e.target.value)} required />
                    </div>
                    <h4>Địa chỉ mới</h4>
                    <div className="form-group">
                        <label>Số nhà:</label>
                        <input type="text" value={newSonha} onChange={(e) => setNewSonha(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Tên đường:</label>
                        <input type="text" value={newTenduong} onChange={(e) => setNewTenduong(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Phường:</label>
                        <input type="text" value={newPhuong} onChange={(e) => setNewPhuong(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Tỉnh/Thành phố:</label>
                        <input type="text" value={newTinhthanhpho} onChange={(e) => setNewTinhthanhpho(e.target.value)} required />
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

export default UpAddressForm;
