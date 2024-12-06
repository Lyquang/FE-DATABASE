import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskModal.scss';

const TaskModal = ({ project, employees, onClose }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [...project.tasks];
    });

    const [editingIndex, setEditingIndex] = useState(null);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [newTask, setNewTask] = useState({
        taskname: '',
        employee_codes: [''], // Ensure employee_codes is an array
        description: '',
        deadline: '',
        status: 'not_started',
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (index, field, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[index][field] = value;
        setTasks(updatedTasks);
    };

    const toggleEditMode = (index) => {
        setEditingIndex((prev) => (prev === index ? null : index));
    };

    const getAvatarUrl = (index) => `https://randomuser.me/api/portraits/men/${index % 100}.jpg`;

    const handleAddTask = () => {
        setTasks([...tasks, newTask]);
        setShowAddTaskModal(false);
        setNewTask({
            taskname: '',
            employee_codes: [''], // Reset employee selection
            description: '',
            deadline: '',
            status: 'not_started',
        });
    };

    const handleNewTaskInputChange = (field, value) => {
        setNewTask((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Tasks have been saved.');
        onClose();
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg task-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nhiệm vụ cho dự án: {project.name}</h5>
                        <button type="button" className="btn-close btn-primary" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <div className="task-list">
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <div key={index} className="task-item border rounded p-3 mb-3 d-flex flex-column position-relative">
                                        <div className="d-flex position-absolute top-0 end-0 m-2 gap-2">
                                            <button className="btn btn-sm btn-primary btn-outline-danger small-btn d-flex align-items-center justify-content-center" onClick={() => handleDeleteTask(index)}>
                                                Xóa
                                            </button>
                                            <button className="btn btn-sm btn-primary btn-outline-primary small-btn d-flex align-items-center justify-content-center" onClick={() => toggleEditMode(index)}>
                                                {editingIndex === index ? 'Xong' : 'Chỉnh sửa'}
                                            </button>
                                        </div>
                                        <div className="d-flex align-items-center mb-2">
                                            <div className="me-3 text-center">
                                                <img src={getAvatarUrl(index)} alt={`Avatar ${task.employee_codes[0]}`} className="rounded-circle" width="50" height="50" />
                                            </div>
                                            <div className="d-flex flex-grow-1 gap-3 align-items-center">
                                                <div className="w-50">
                                                    <label className="form-label">Nhân viên</label>
                                                    {editingIndex === index ? (
                                                        <select className="form-select" style={{ height: '38px' }} value={task.employee_codes[0]} onChange={(e) => handleInputChange(index, 'employee_codes', [e.target.value])}>
                                                            {employees.map((employee) => (
                                                                <option key={employee.code} value={employee.code}>
                                                                    {employee.name} ({employee.code})
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <p className="form-control bg-light" style={{ height: '38px', display: 'flex', alignItems: 'center', margin: 0 }}>
                                                            {task.employee_codes[0]}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="w-50">
                                                    <label className="form-label">Tên task</label>
                                                    {editingIndex === index ? (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            style={{ height: '38px' }}
                                                            value={task.taskname}
                                                            onChange={(e) => handleInputChange(index, 'taskname', e.target.value)}
                                                            placeholder="Task Name"
                                                        />
                                                    ) : (
                                                        <div className="form-control bg-light" style={{ height: '38px', display: 'flex', alignItems: 'center' }}>
                                                            {task.taskname}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="me-2 flex-grow-1">
                                                <label className="form-label">Mô tả</label>
                                                {editingIndex === index ? (
                                                    <input type="text" className="form-control" value={task.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} placeholder="Description" />
                                                ) : (
                                                    <div className="form-control bg-light">{task.description}</div>
                                                )}
                                            </div>
                                            <div className="me-2">
                                                <label className="form-label">Hạn nộp</label>
                                                {editingIndex === index ? (
                                                    <input type="date" className="form-control" value={task.deadline} onChange={(e) => handleInputChange(index, 'deadline', e.target.value)} />
                                                ) : (
                                                    <div className="form-control bg-light">{task.deadline || 'N/A'}</div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="form-label">Trạng thái</label>
                                                {editingIndex === index ? (
                                                    <select className="form-select" value={task.status || 'not_started'} onChange={(e) => handleInputChange(index, 'status', e.target.value)}>
                                                        <option value="completed">Đã hoàn thành</option>
                                                        <option value="in_progress">Qúa hạn</option>
                                                        <option value="not_started">Hủy</option>
                                                    </select>
                                                ) : (
                                                    <div className="form-control bg-light">
                                                        {task.status === 'completed' ? 'Đã hoàn thành' : task.status === 'in_progress' ? 'Qúa hạn' : 'Hủy'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No tasks available for this project.</p>
                            )}
                        </div>
                        <button className="btn btn-primary btn-success mt-3" onClick={() => setShowAddTaskModal(true)}>
                            Thêm Task
                        </button>
                        {showAddTaskModal && (
                            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Thêm Task Mới</h5>
                                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddTaskModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div>
                                                <label className="form-label">Nhân viên</label>
                                                <select className="form-select" value={newTask.employee_codes[0]} onChange={(e) => handleNewTaskInputChange('employee_codes', [e.target.value])}>
                                                    <option value="">Chọn nhân viên</option>
                                                    {employees.map((employee) => (
                                                        <option key={employee.id} value={employee.code}>
                                                            {employee.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="form-label">Tên Task</label>
                                                <input type="text" className="form-control" value={newTask.taskname} onChange={(e) => handleNewTaskInputChange('taskname', e.target.value)} placeholder="Tên Task" />
                                            </div>
                                            <div>
                                                <label className="form-label">Mô tả</label>
                                                <input type="text" className="form-control" value={newTask.description} onChange={(e) => handleNewTaskInputChange('description', e.target.value)} placeholder="Mô tả" />
                                            </div>
                                            <div>
                                                <label className="form-label">Hạn Nộp</label>
                                                <input type="date" className="form-control" value={newTask.deadline} onChange={(e) => handleNewTaskInputChange('deadline', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="form-label">Trạng thái</label>
                                                <select className="form-select" value={newTask.status} onChange={(e) => handleNewTaskInputChange('status', e.target.value)}>
                                                    <option value="not_started">Chưa bắt đầu</option>
                                                    <option value="in_progress">Đang làm</option>
                                                    <option value="completed">Hoàn thành</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            {/* <button type="button" className="btn btn-secondary" onClick={() => setShowAddTaskModal(false)}>
                                                Đóng
                                            </button>
                                           */}
                                            <button type="button" className="btn btn-primary" onClick={handleAddTask}>
                                                Thêm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                         */}
                        <button type="button" className="btn btn-primary" onClick={handleSaveTasks}>Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
