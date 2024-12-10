import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminAttendance.scss';

const AdminAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterEmployeeId, setFilterEmployeeId] = useState(''); // New state for employee ID filter

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of records per page

    // Fetch attendance data from API
    useEffect(() => {
        const fetchAttendanceData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(
                    'http://localhost:8080/bangchamcong-bangluong/getAll'
                );
                const data = response.data || [];
                setAttendanceRecords(data);
            } catch (err) {
                setError('Error fetching attendance data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendanceData();
    }, []);

    // Filter attendance data based on month, year, and employee ID
    const filteredAttendance = attendanceRecords.filter((record) => {
        const monthMatch = filterMonth ? record.bangChamCongKey.thang === parseInt(filterMonth) : true;
        const yearMatch = filterYear ? record.bangChamCongKey.nam === parseInt(filterYear) : true;
        const employeeIdMatch = filterEmployeeId ? record.bangChamCongKey.msnv.includes(filterEmployeeId) : true;
        return monthMatch && yearMatch && employeeIdMatch;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleAttendance = filteredAttendance.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="admin-attendance">
            <h3 className="title">Bảng chấm công của nhân viên</h3>

            {/* Filters for Month, Year, and Employee ID */}
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
                            {[...new Set(attendanceRecords.map((r) => r.bangChamCongKey.nam))].map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label htmlFor="employeeId">Mã nhân viên:</label>
                        <input
                            id="employeeId"
                            type="text"
                            value={filterEmployeeId}
                            onChange={(e) => setFilterEmployeeId(e.target.value)}
                            placeholder="Nhập mã nhân viên"
                        />
                    </div>
            </div>


            {/* Error and Loading */}
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}

            {/* Attendance Table */}
            <div className="attendance-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Tên nhân viên</th>
                            <th>Tháng</th>
                            <th>Năm</th>
                            <th>Số giờ hiện tại</th>
                            <th>Số giờ tối thiểu</th>
                            <th>Số giờ làm thêm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleAttendance.map((record, index) => (
                            <tr key={index}>
                                <td>{record.bangChamCongKey.msnv}</td>
                                <td>{record.nhanVien.hoten}</td>
                                <td>{record.bangChamCongKey.thang}</td>
                                <td>{record.bangChamCongKey.nam}</td>
                                <td>{record.sogioHienTai}</td>
                                <td>{record.sogioToiThieu}</td>
                                <td>{record.sogioLamThem}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminAttendance;
