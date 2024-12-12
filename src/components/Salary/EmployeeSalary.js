import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeSalary.scss';

// Modal component
const Modal = ({ show, onClose, onSubmit, formData, handleInputChange }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <h3>Tính Lương</h3>
                <div>
                    <label>Mã nhân viên:</label>
                    <input
                        type="text"
                        name="msnv"
                        value={formData.msnv}
                        onChange={handleInputChange}
                        placeholder="Mã nhân viên"
                    />
                </div>
                <div>
                    <label>Tháng:</label>
                    <input
                        type="number"
                        name="thang"
                        value={formData.thang}
                        onChange={handleInputChange}
                        placeholder="Tháng"
                    />
                </div>
                <div>
                    <label>Năm:</label>
                    <input
                        type="number"
                        name="nam"
                        value={formData.nam}
                        onChange={handleInputChange}
                        placeholder="Năm"
                    />
                </div>
                <div>
                    <label>Xăng xe:</label>
                    <input
                        type="number"
                        name="xangxe"
                        value={formData.xangxe}
                        onChange={handleInputChange}
                        placeholder="Xăng xe"
                    />
                </div>
                <div>
                    <label>Ăn trưa:</label>
                    <input
                        type="number"
                        name="antrua"
                        value={formData.antrua}
                        onChange={handleInputChange}
                        placeholder="Ăn trưa"
                    />
                </div>
                <div>
                    <label>Hỗ trợ khác:</label>
                    <input
                        type="number"
                        name="hotrokhac"
                        value={formData.hotrokhac}
                        onChange={handleInputChange}
                        placeholder="Hỗ trợ khác"
                    />
                </div>
                <div className="modal-actions">
                    <button onClick={onSubmit} className="submit-btn">Tính lương</button>
                    <button onClick={onClose} className="cancel-btn">Hủy</button>
                </div>
            </div>
        </div>
    );
};

const EmployeeSalary = () => {
    const [salaryRecords, setSalaryRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [calculateResponse, setCalculateResponse] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [formData, setFormData] = useState({
        msnv: '',
        thang: '',
        nam: '',
        xangxe: '',
        antrua: '',
        hotrokhac: ''
    });

    // Fetch salary data from API
    const fetchSalaryData = async (employeeId) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:8080/bangluong/nhanvien/all`, {
                params: { msnv: employeeId },
            });
            const data = response.data || [];
            setSalaryRecords(data);
        } catch (err) {
            setError('Error fetching salary data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (employeeId) {
            fetchSalaryData(employeeId);
        }
    }, [employeeId]);

    // Filter salary data
    const filteredSalary = salaryRecords.filter((record) => {
        const monthMatch = filterMonth ? record.thang === parseInt(filterMonth) : true;
        const yearMatch = filterYear ? record.nam === parseInt(filterYear) : true;
        return monthMatch && yearMatch;
    });

    const employeeInfo = salaryRecords.length > 0 ? salaryRecords[0] : null;

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Calculate salary
    const calculateSalary = async () => {
        if (!formData.msnv || !formData.thang || !formData.nam || !formData.xangxe || !formData.antrua || !formData.hotrokhac) {
            setError('Please enter all the required fields to calculate salary.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/tinh_luong', {
                params: {
                    msnv: formData.msnv,
                    thang: formData.thang,
                    nam: formData.nam,
                    xangxe: formData.xangxe,
                    antrua: formData.antrua,
                    hotrokhac: formData.hotrokhac
                }
            });
            setCalculateResponse(response.data.message || 'Salary calculated successfully');
            setShowModal(false); // Close the modal on successful calculation
        } catch (err) {
            setError('Error calculating salary. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="employee-salary">
            <h3 className="title">Bảng lương cá nhân</h3>

            {/* Employee ID Input */}
            <div className="employee-id-input">
                <label htmlFor="employeeId">Mã nhân viên:</label>
                <input
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Nhập mã nhân viên"
                />
            </div>

            {/* Filters */}
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="month">Tháng:</label>
                    <select
                        id="month"
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {[...Array(12).keys()].map((m) => (
                            <option key={m + 1} value={m + 1}>
                                {m + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="year">Năm:</label>
                    <select
                        id="year"
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {[...new Set(salaryRecords.map((r) => r.nam))].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}

            {/* Employee Info */}
            {employeeInfo && (
                <div className="employee-info">
                    <div className="info-item">
                        <strong>Mã nhân viên:</strong> {employeeInfo.msnv}
                    </div>
                    <div className="info-item">
                        <strong>Tên nhân viên:</strong> {employeeInfo.hoten}
                    </div>
                    <div className="info-item">
                        <strong>Mã phòng ban:</strong> {employeeInfo.mspb}
                    </div>
                </div>
            )}

            {/* Calculate Salary Button */}
            <button onClick={() => setShowModal(true)} className="calculate-btn">Tính lương</button>

            {/* Modal for Salary Calculation */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={calculateSalary}
                formData={formData}
                handleInputChange={handleInputChange}
            />

            {/* Calculation Response */}
            {calculateResponse && <p className="calculate-response">{calculateResponse}</p>}

            {/* Salary Table */}
            <div className="salary-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Tháng</th>
                            <th>Năm</th>
                            <th>Lương cơ bản</th>
                            <th>Lương làm thêm</th>
                            <th>Ăn trưa</th>
                            <th>Xăng xe</th>
                            <th>Hỗ trợ khác</th>
                            <th>Bảo hiểm xã hội</th>
                            <th>Bảo hiểm y tế</th>
                            <th>Thuế</th>
                            <th>Khấu trừ</th>
                            <th>Lương thực tế</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalary.length === 0 ? (
                            <tr><td colSpan="12">Không có dữ liệu</td></tr>
                        ) : (
                            filteredSalary.map((record) => (
                                <tr key={record.id}>
                                    <td>{record.thang}</td>
                                    <td>{record.nam}</td>
                                    <td>{record.luongcb}</td>
                                    <td>{record.luonglt}</td>
                                    <td>{record.antrua}</td>
                                    <td>{record.xangxe}</td>
                                    <td>{record.hotrokhac}</td>
                                    <td>{record.bhxh}</td>
                                    <td>{record.bhyt}</td>
                                    <td>{record.thue}</td>
                                    <td>{record.khoultru}</td>
                                    <td>{record.luongtt}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeSalary;
