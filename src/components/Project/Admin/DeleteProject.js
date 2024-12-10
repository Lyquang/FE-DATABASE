import React from 'react';
import axios from 'axios';

const DeleteProject = ({ mada, setProjects }) => {
    const handleDelete = () => {
        axios.delete(`http://localhost:8080/duan/xoaduan?mada=${mada}`)
            .then(response => {
                alert(response.data || 'Xóa dự án thành công');
                // Cập nhật lại danh sách dự án sau khi xóa
                setProjects(prevProjects => prevProjects.filter(project => project.maDA !== mada));
            })
            .catch(error => {
                const errorMessage = error.response?.data || 'Không thể xóa dự án';
                alert(`Error: ${errorMessage}`);
            });
    };

    return <button onClick={handleDelete}>Xóa</button>;
};

export default DeleteProject;  // Đảm bảo xuất khẩu mặc định ở đây
