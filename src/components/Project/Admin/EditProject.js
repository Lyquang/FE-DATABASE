import React, { useState } from 'react';
import axios from 'axios';

const EditProject = ({ mada, setProjects }) => {
    // State để lưu tên mới và trạng thái modal
    const [newName, setNewName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = () => {
        // Mở modal khi nhấn sửa tên
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        // Đóng modal
        setIsModalOpen(false);
    };

    const handleSave = () => {
        if (newName) {
            // Gửi PUT request để sửa tên dự án
            axios.put(`http://localhost:8080/duan/suatenduan?mada=${mada}&tenduan=${newName}`)
                .then(response => {
                    alert(response.data || 'Sửa tên dự án thành công');
                    // Cập nhật danh sách dự án sau khi sửa
                    setProjects(prevProjects =>
                        prevProjects.map(project =>
                            project.maDA === mada ? { ...project, ten_da: newName } : project
                        )
                    );
                    // Đóng modal
                    setIsModalOpen(false);
                })
                .catch(error => {
                    const errorMessage = error.response?.data || 'Không thể sửa tên dự án';
                    alert(`Error: ${errorMessage}`);
                });
        }
    };

    return (
        <div>
            {/* Nút mở modal */}
            <button onClick={handleEdit}>Sửa Tên</button>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Sửa Tên Dự Án</h2>
                        <label>
                            Tên Dự Án Mới:
                            <input 
                                type="text" 
                                value={newName} 
                                onChange={(e) => setNewName(e.target.value)} 
                                placeholder="Nhập tên mới"
                            />
                        </label>
                        <div className="modal-actions">
                            <button onClick={handleSave}>Lưu</button>
                            <button onClick={handleCloseModal}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProject;
