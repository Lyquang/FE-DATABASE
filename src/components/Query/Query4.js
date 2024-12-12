import React, { useState } from 'react';

const Query4 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ t: '2024-06-03', n: '2024-06-01', d: 'NV9900001' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation logic
    if (formData.n > formData.t) {
      setError('Ngày bắt đầu phải trước ngày kết thúc.');
      return;
    }

    if (!/^[A-Z0-9]{9}$/.test(formData.d)) {
      setError('Mã nhân viên không hợp lệ. Phải có 9 ký tự chữ hoặc số.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Gọi API
      const url = `http://localhost:8080/query/viet22?ketthuc=${encodeURIComponent(formData.t)}&batdau=${encodeURIComponent(formData.n)}&nv=${encodeURIComponent(formData.d)}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.text(); // API trả về chuỗi thay vì JSON
        onDataFetched(data); // Truyền dữ liệu chuỗi về parent component
      } else {
        setError(`Lỗi khi gọi API: ${response.status}`);
      }
    } catch (error) {
      setError('Không thể kết nối đến API. Vui lòng thử lại.');
      console.error('Lỗi khi gọi API:', error);
    }

    setLoading(false);
  };

  return (
    <div className="query4-container">
      <h2>Form Tính Giờ Làm Việc</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="t">Ngày Kết Thúc:</label>
          <input
            type="date"
            id="t"
            name="t"
            value={formData.t}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="n">Ngày Bắt Đầu:</label>
          <input
            type="date"
            id="n"
            name="n"
            value={formData.n}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="d">Mã Nhân Viên:</label>
          <input
            type="text"
            id="d"
            name="d"
            value={formData.d}
            onChange={handleInputChange}
            required
            maxLength="9"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Query4;
