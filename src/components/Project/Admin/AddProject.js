// AddProject.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProject = ({ isModalOpen, handleCloseModal, setProjects }) => {
    const [formData, setFormData] = useState({
        mada: '',
        vondautu: '',
        startdate: '',
        tenduan: '',
        mota: '',
        maphongbanquanly: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const url = `http://localhost:8080/duan/themduan?mada=${formData.mada}&vondautu=${formData.vondautu}&startdate=${formData.startdate}&tenduan=${formData.tenduan}&mota=${formData.mota}&maphongbanquanly=${formData.maphongbanquanly}`;
    
        axios
            .post(url)
            .then((response) => {
                // Show success message with window.alert
                window.alert(response.data || 'Thành công');
                setFormData({
                    mada: '',
                    vondautu: '',
                    startdate: '',
                    tenduan: '',
                    mota: '',
                    maphongbanquanly: '',
                });
                // Fetch the updated list of projects
                axios.get('http://localhost:8080/duan/getAllDuan')
                    .then((res) => setProjects(res.data))
                    .catch(() => window.alert('Lỗi khi cập nhật danh sách dự án'));
            })
            .catch((error) => {
                // Show error message with window.alert
                const errorMessage = error.response?.data || 'Không thể thêm dự án';
                window.alert(`Error: ${errorMessage}`);
            });
    };
    

    return (
        isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close-button" onClick={handleCloseModal}>&times;</span>
                    <h2>Thêm Dự Án</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Mã Dự Án:
                            <input type="text" name="mada" value={formData.mada} onChange={handleChange} required />
                        </label>
                        <br />
                        <label>
                            Vốn Đầu Tư:
                            <input type="number" name="vondautu" value={formData.vondautu} onChange={handleChange} required />
                        </label>
                        <br />
                        <label>
                            Ngày Bắt Đầu:
                            <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} required />
                        </label>
                        <br />
                        <label>
                            Tên Dự Án:
                            <input type="text" name="tenduan" value={formData.tenduan} onChange={handleChange} required />
                        </label>
                        <br />
                        <label>
                            Mô Tả:
                            <textarea name="mota" value={formData.mota} onChange={handleChange} required />
                        </label>
                        <br />
                        <label>
                            Mã Phòng Ban Quản Lý:
                            <input type="text" name="maphongbanquanly" value={formData.maphongbanquanly} onChange={handleChange} required />
                        </label>
                        <br />
                        <button type="submit">Lưu Dự Án</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        )
    );
};

export default AddProject;
