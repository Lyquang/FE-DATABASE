import React, { useState, useEffect } from 'react';
import './ManagerProject.scss';
import TaskModal from './TaskModal';
import MemberModal from './EditMemberModal';
import EditProject from './EditProject';
import axios from 'axios'; // Import axios for making API requests

const ManagerProject = () => {
    const [projects, setProjects] = useState([]);
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [currentMembers, setCurrentMembers] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);

    // Fetch projects from the API when the component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/projects/all');
                if (response.data && response.data.code === 1000) {
                    // Map API response to match the structure of your state
                    const fetchedProjects = response.data.result.map((project) => ({
                        id: project.projectId,
                        name: project.projectName,
                        company: project.departmentName,
                        attachments: project.attachments || 0, // Default if not available
                        members: project.participants || 0, // Count number of participants
                        project_description: project.projectDescription,
                        duration: project.duration || "N/A", // Default if not available
                        comments: project.comments || 0, // Default if not available
                        daysLeft: project.daysLeft || 0, // Default if not available
                        progress: project.progress || 0, // Default if not available
                        icon: project.icon || "default-icon", // Default if not available
                        tasks: project.tasks || [], // Default if not available
                    }));
                    setProjects(fetchedProjects);
                } else {
                    console.error('Error fetching projects:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleCreateProjectClick = () => {
        setIsCreateProjectModalOpen(true);
    };

    const closeCreateProjectModal = () => {
        setIsCreateProjectModalOpen(false);
    };

    const handleDeleteProject = (projectId) => {
        setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
    };

    const handleMemberClick = (project) => {
        if (!project || !Array.isArray(project.tasks)) {
            setCurrentMembers([]);
            setIsMemberModalOpen(true);
            return;
        }

        // Get members from project tasks
        const members = project.tasks.flatMap((task) =>
            task.employee_codes.map((code) => employees.find((emp) => emp.code === code))
        );
        const uniqueMembers = Array.from(new Set(members.map((member) => member.code)))
            .map((code) => members.find((member) => member.code === code));

        setCurrentMembers(uniqueMembers);
        setCurrentProjectId(project.id);
        setIsMemberModalOpen(true);
    };

    const handleSaveMembers = (updatedMembers) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) => {
                if (project.id === currentProjectId) {
                    const newEmployeeCodes = updatedMembers.map((member) => member.code);
                    const updatedTasks = project.tasks.map((task) => ({
                        ...task,
                        employee_codes: [...new Set([...task.employee_codes, ...newEmployeeCodes])],
                    }));
                    return { ...project, tasks: updatedTasks };
                }
                return project;
            })
        );
        setIsMemberModalOpen(false);
    };

    const employees = [
        { code: 'E001', name: 'Nguyen Van A' },
        { code: 'E002', name: 'Nguyen Van T' },
        { code: 'E003', name: 'Le Van C' },
        { code: 'E004', name: 'Vo Le' }
    ];

    return (
        <div className="manager-projects">
            <div className="header d-flex align-items-center justify-content-between">
                <h2>Quản lý dự án khacwcs tllllllllí</h2>
                <div className="action-buttons">
                    <button onClick={handleCreateProjectClick} className="btn btn-primary">
                        Tạo project
                    </button>
                </div>
            </div>
            <hr />

            <div className="row g-3 gy-5 py-3 row-deck">
                {projects.map((project, index) => (
                    <div key={index} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                        <div className="card">
                            <div className="card-header">
                                {/* <img src={`/path/to/icons/${project.icon}.png`} alt={`${project.name} icon`} className="project-icon" /> */}
                                <p className="company-name">{project.name}</p>
                            </div>
                            <button className="btn-delete" onClick={() => handleDeleteProject(project.id)}>
                                &#10005;
                            </button>
                            <div className="card-body">
                                <div className="avatars">
                                    {Array(project.members).fill('').map((_, i) => (
                                        <img key={i} src="https://randomuser.me/api/portraits/men/9.jpg" alt="Avatar" className="avatar" />
                                    ))}
                                </div>
                                <div className="row g-2 pt-4">
                                    <div
                                        className="col-6 d-flex align-items-center attachment-link"
                                    >
                                        <span className="logo">📎</span>
                                        <span className="info">{project.tasks.length} Nhiệm vụ</span>
                                    </div>
                                    <div
                                        className="col-6 d-flex align-items-center"
                                        onClick={() => handleMemberClick(project)}
                                    >
                                        <span className="logo">👥</span>
                                        <span className="info">
                                            {project.members} Thành viên
                                        </span>
                                    </div>

                                </div>
                                <hr />
                                <div className="project-description-section">
                                    <span className="description-text">Mô tả</span>
                                    <p className="project-description">{project.project_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProject && (
                <TaskModal
                    project={selectedProject}
                    employees={employees}
                    onClose={() => setSelectedProject(null)}
                />
            )}

            {isMemberModalOpen && (
                <MemberModal
                    members={currentMembers}
                    employees={employees}
                    onClose={() => setIsMemberModalOpen(false)}
                    onSave={handleSaveMembers}
                />
            )}

            {isCreateProjectModalOpen && (
                <EditProject
                    onClose={() => setIsCreateProjectModalOpen(false)}
                    onSave={(newProject) => {
                        setProjects((prevProjects) => [...prevProjects, newProject]);
                        setIsCreateProjectModalOpen(false);
                    }}
                    employees={employees}
                />
            )}
        </div>
    );
};

export default ManagerProject;
