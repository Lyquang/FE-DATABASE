import React, { useState } from 'react';
import './EditMemberModal.scss';

const EditMemberModal = ({ members, onClose, employees, onSave }) => {
    const [newMemberId, setNewMemberId] = useState('');
    const [currentMembers, setCurrentMembers] = useState(members);
    const [message, setMessage] = useState('');

    const handleAddMember = () => {
        const newMember = employees.find((emp) => emp.code === newMemberId);

        if (newMember) {
            // Kiểm tra xem thành viên đã có trong danh sách chưa
            if (currentMembers.some((member) => member.code === newMemberId)) {
                setMessage('Member already exists.');
            } else {
                // Thêm thành viên và lọc lại để đảm bảo không có trùng lặp
                setCurrentMembers((prevMembers) => {
                    const updatedMembers = [...prevMembers, newMember];
                    // Lọc lại để đảm bảo không có thành viên trùng lặp
                    return updatedMembers.filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.code === value.code
                        ))
                    );
                });
                setMessage('Member added successfully!');
            }
        } else {
            setMessage('Member not found.');
        }
        setNewMemberId('');
    };

    const handleSave = () => {
        // Gọi onSave với danh sách thành viên đã được lọc
        onSave(currentMembers);
    };

    return (
        <>
            {/* Nền mờ khi modal hiển thị */}
            <div className="overlay" onClick={onClose}></div>
            <div className="member-modal">
                <div className="modal-content">
                    <h3>Danh sách nhân viên</h3>
                    <button className="close-btn btn-primary" onClick={onClose}>x</button>

                    <ul className="member-list">
                        {currentMembers.map((member, index) => (
                            <li key={index} className="member-item">
                                <span className="member-code">{member.code}</span> - {member.name}
                            </li>
                        ))}
                    </ul>

                    <div className="add-member-section">
                        <input
                            type="text"
                            value={newMemberId}
                            onChange={(e) => setNewMemberId(e.target.value)}
                            placeholder="Nhập ID của nhân viên"
                            className="add-member-input"
                        />
                        <button onClick={handleAddMember} className="add-member-btn btn-primary">Thêm nhân viên</button>
                    </div>
                    {message && <p className="message">{message}</p>}

                    <div className="modal-footer">
                        <button onClick={handleSave} className="save-btn btn-primary">Lưu</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditMemberModal;
