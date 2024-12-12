import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeAttendance.scss';

const EmployeeAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    // Fetch attendance data from API
    const fetchAttendanceData = async (employeeId) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:8080/bangchamcong/nhanvien/all`, {
                params: { msnv: employeeId },
            });
            const data = response.data || [];
            setAttendanceRecords(data);
        } catch (err) {
            setError('Error fetching attendance data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (employeeId) {
            fetchAttendanceData(employeeId);
        }
    }, [employeeId]);

    // Filter attendance data
    const filteredAttendance = attendanceRecords.filter((record) => {
        const monthMatch = filterMonth ? record.thang === parseInt(filterMonth) : true;
        const yearMatch = filterYear ? record.nam === parseInt(filterYear) : true;
        return monthMatch && yearMatch;
    });

    const employeeInfo = attendanceRecords.length > 0 ? attendanceRecords[0] : null;

    return (
        <div className="employee-attendance">
            <h3 className="title">Bảng chấm công cá nhân</h3>

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
                        {[...new Set(attendanceRecords.map((r) => r.nam))].map((year) => (
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
                    <p><strong>Mã nhân viên:</strong> {employeeInfo.msnv}</p>
                    <p><strong>Tên nhân viên:</strong> {employeeInfo.hoten}</p>
                </div>
            )}

            {/* Attendance Table */}
            <div className="attendance-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Tháng</th>
                            <th>Năm</th>
                            <th>Số giờ hiện tại</th>
                            <th>Số giờ tối thiểu</th>
                            <th>Số giờ làm thêm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendance.map((record, index) => (
                            <tr key={index}>
                                <td>{record.thang}</td>
                                <td>{record.nam}</td>
                                <td>{record.sogioHienTai}</td>
                                <td>{record.sogioToiThieu}</td>
                                <td>{record.sogioLamThem}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeAttendance;
