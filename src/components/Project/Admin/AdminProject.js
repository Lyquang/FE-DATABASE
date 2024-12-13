import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProject.css';
import AddProject from './AddProject';
import DeleteProject from './DeleteProject';
import EditProject from './EditProject';

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
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="admin-project-container">
            <header>
                <h1>Danh sách Dự án</h1>
                <button className="add-project-btn" onClick={handleOpenModal}>Thêm Dự Án</button>
            </header>

            <div className="table-container">
                <table className="project-table">
                    <thead>
                        <tr>
                            <th>Mã Dự án</th>
                            <th>Vốn Đầu Tư</th>
                            <th>Ngày Bắt Đầu</th>
                            <th>Tên Dự án</th>
                            <th>Mô Tả</th>
                            <th>Mã Phòng Ban Quản Lý</th>
                            <th>Hành động</th>
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
                                <td className="actions">
                                    <DeleteProject mada={project.maDA} setProjects={setProjects} />
                                    <EditProject mada={project.maDA} setProjects={setProjects} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddProject 
                isModalOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                setProjects={setProjects}
            />
        </div>
    );
};

export default AdminProject;
