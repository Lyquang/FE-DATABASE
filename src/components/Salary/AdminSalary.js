import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSalary.scss';

const AdminSalary = () => {
    const [showModal, setShowModal] = useState(false);
    const [salaryData, setSalaryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Filters
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterEmployeeCode, setFilterEmployeeCode] = useState('');

    // Form state for adding salary details
    const [formData, setFormData] = useState({
        msnv: '',
        thang: '',
        nam: '',
        xangxe: '',
        antrua: '',
        hotrokhac: '',
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchSalaryData = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(
                    'http://localhost:8080/bangchamcong-bangluong/allluong'
                );
                setSalaryData(response.data || []);
            } catch (err) {
                setError('Error fetching salary data. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchSalaryData();
    }, []);

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        if (id === 'month') setFilterMonth(value);
        if (id === 'year') setFilterYear(value);
        if (id === 'employeeCode') setFilterEmployeeCode(value);
    };

    const filteredSalary = salaryData.filter((record) => {
        const monthMatch = filterMonth ? record.bangLuongKey.thang === parseInt(filterMonth) : true;
        const yearMatch = filterYear ? record.bangLuongKey.nam === parseInt(filterYear) : true;
        const employeeCodeMatch = filterEmployeeCode
            ? record.bangLuongKey.msnv.includes(filterEmployeeCode)
            : true;
        return monthMatch && yearMatch && employeeCodeMatch;
    });

    const totalPages = Math.ceil(filteredSalary.length / itemsPerPage);
    const currentRecords = filteredSalary.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { msnv, thang, nam, xangxe, antrua, hotrokhac } = formData;
        const apiUrl = `http://localhost:8080/tinh_luong?msnv=${msnv}&thang=${thang}&nam=${nam}&xangxe=${xangxe}&antrua=${antrua}&hotrokhac=${hotrokhac}`;

        try {
            const response = await axios.get(apiUrl);
            window.alert(`Response: ${JSON.stringify(response.data, null, 2)}`);
            setShowModal(false);
            setFormData({ msnv: '', thang: '', nam: '', xangxe: '', antrua: '', hotrokhac: '' });
        } catch (error) {
            window.alert('Error submitting salary details. Please try again.');
        }
    };

    const renderTableRows = () => {
        if (currentRecords.length === 0) {
            return (
                <tr>
                    <td colSpan="13">No records found.</td>
                </tr>
            );
        }

        return currentRecords.map((record, index) => (
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
        ));
    };

    return (
        <div className="admin-salary-container">
            <h3 className="title">Bảng lương nhân viên</h3>

            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="month">Tháng:</label>
                    <select id="month" value={filterMonth} onChange={handleFilterChange}>
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
                    <select id="year" value={filterYear} onChange={handleFilterChange}>
                        <option value="">Tất cả</option>
                        {[...new Set(salaryData.map((r) => r.bangLuongKey.nam))].map((year) => (
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
                        onChange={handleFilterChange}
                        placeholder="Nhập mã nhân viên"
                    />
                </div>
            </div>

            <button className="add-salary-btn" onClick={() => setShowModal(true)}>
                Tính lương cho nhân viên
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Tính Lương cho nhân viên</h4>
                        <form onSubmit={handleFormSubmit}>
                            <label>Mã nhân viên:</label>
                            <input
                                type="text"
                                name="msnv"
                                value={formData.msnv}
                                onChange={handleFormChange}
                                required
                            />
                            <label>Tháng:</label>
                            <input
                                type="number"
                                name="thang"
                                value={formData.thang}
                                onChange={handleFormChange}
                                required
                            />
                            <label>Năm:</label>
                            <input
                                type="number"
                                name="nam"
                                value={formData.nam}
                                onChange={handleFormChange}
                                required
                            />
                            <label>Xăng xe:</label>
                            <input
                                type="number"
                                name="xangxe"
                                value={formData.xangxe}
                                onChange={handleFormChange}
                                required
                            />
                            <label>Ăn trưa:</label>
                            <input
                                type="number"
                                name="antrua"
                                value={formData.antrua}
                                onChange={handleFormChange}
                                required
                            />
                            <label>Hỗ trợ khác:</label>
                            <input
                                type="number"
                                name="hotrokhac"
                                value={formData.hotrokhac}
                                onChange={handleFormChange}
                                required
                            />
                            <div className="modal-actions">
                                <button type="submit">Tính</button>
                                <button type="button" onClick={() => setShowModal(false)}>
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="error">{error}</p>}

            <div className="salary-table">
                <table>
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
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminSalary;
