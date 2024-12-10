// AdminProject.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProject.css';
import AddProject from './AddProject';  // Import AddProject
import DeleteProject from './DeleteProject';  // Import DeleteProject
import EditProject from './EditProject';  // Import EditProject

const AdminProject = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/duan/getAllDuan')
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Danh sách Dự án</h1>
            <button onClick={handleOpenModal}>Thêm Dự Án</button>

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Mã Dự án</th>
                        <th>Vốn Đầu Tư</th>
                        <th>Ngày Bắt Đầu</th>
                        <th>Tên Dự án</th>
                        <th>Mô Tả</th>
                        <th>Mã Phòng Ban Quản Lý</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.maDA}</td>
                            <td>{project.vondautu}</td>
                            <td>{project.start_date}</td>
                            <td>{project.ten_da}</td>
                            <td>{project.mota}</td>
                            <td>{project.mspb_quanly}</td>
                            <td>
                            <EditProject mada={project.maDA} setProjects={setProjects} />
                            <DeleteProject mada={project.maDA} setProjects={setProjects} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <AddProject 
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                setProjects={setProjects} // Update project list when a new project is added
            />
        </div>
    );
};

export default AdminProject;
