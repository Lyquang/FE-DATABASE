import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NotePencil } from 'phosphor-react';
import './AdminSalary.scss';

const AdminSalary = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [Salary, setSalary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterEmployeeCode, setFilterEmployeeCode] = useState(''); // State for employee code filter

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of records per page

    // Fetch salary data from API
    useEffect(() => {
        const fetchSalaryData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(
                    'http://localhost:8080/bangchamcong-bangluong/allluong'
                );
                const data = response.data || [];
                setSalary(data);
            } catch (err) {
                setError('Error fetching salary data. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSalaryData();
    }, []);

    // Filter salary data based on month, year, and employee code
    const filteredSalary = Salary.filter((record) => {
        const monthMatch = filterMonth
            ? record.bangLuongKey.thang === parseInt(filterMonth)
            : true;
        const yearMatch = filterYear
            ? record.bangLuongKey.nam === parseInt(filterYear)
            : true;
        const employeeCodeMatch = filterEmployeeCode
            ? record.bangLuongKey.msnv.includes(filterEmployeeCode) // Check if employee code matches
            : true;
        return monthMatch && yearMatch && employeeCodeMatch;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredSalary.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleSalary = filteredSalary.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="admin-salary-container">
            <h3 className="title">Bảng lương nhân viên</h3>

            {/* Filters for Month, Year, and Employee Code */}
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
                        {[...new Set(Salary.map((r) => r.bangLuongKey.nam))].map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="employeeCode">Mã nhân viên:</label>
                    <input
                        type="text"
                        id="employeeCode"
                        value={filterEmployeeCode}
                        onChange={(e) => setFilterEmployeeCode(e.target.value)}
                        placeholder="Nhập mã nhân viên"
                    />
                </div>
            </div>

            {/* Error and Loading */}
            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}

            {/* Salary Table */}
            <div className="salary-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Mã nhân viên</th>
                            <th>Tháng</th>
                            <th>Năm</th>
                            <th>Lương cơ bản</th>
                            <th>Lương làm thêm</th>
                            <th>Xăng xe</th>
                            <th>Ăn trưa</th>
                            <th>Hỗ trợ khác</th>
                            <th>BHXH</th>
                            <th>BHYT</th>
                            <th>Thuế</th>
                            <th>Khấu trừ</th>
                            <th>Lương thực tế</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleSalary.map((record, index) => (
                            <tr key={index}>
                                <td>{record.bangLuongKey.msnv}</td>
                                <td>{record.bangLuongKey.thang}</td>
                                <td>{record.bangLuongKey.nam}</td>
                                <td>{record.luongcoban}Đ</td>
                                <td>{record.luonglamthem}Đ</td>
                                <td>{record.xangxe}Đ</td>
                                <td>{record.antrua}Đ</td>
                                <td>{record.hotrokhac}Đ</td>
                                <td>{record.bhxh}Đ</td>
                                <td>{record.bhyt}Đ</td>
                                <td>{record.thue}Đ</td>
                                <td>{record.khautru}Đ</td>
                                <td className="text-success">{record.luongthucte}Đ</td>
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

export default AdminSalary;
