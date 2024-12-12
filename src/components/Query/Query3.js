import React, { useState } from 'react';

const Query3 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ dau: '', cuoi: '', nv: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Reset error message

    const { dau, cuoi, nv } = formData;

    // Kiểm tra nếu ngày bắt đầu > ngày kết thúc
    if (new Date(dau) > new Date(cuoi)) {
      setError('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
      setLoading(false);
      return;
    }

    // Kiểm tra nếu mã nhân viên rỗng
    if (!nv) {
      setError('Mã nhân viên không thể để trống.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/query/viet2?cuoi=${cuoi}&dau=${dau}&nv=${nv}`
      );

      if (response.ok) {
        const data = await response.json();
        onDataFetched(data);
      } else {
        setError('Lỗi khi lấy dữ liệu: ' + response.status);
      }
    } catch (error) {
      setError('Lỗi kết nối: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="query3-container">
      <h2>Form Tính Giờ Làm Việc</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="cuoi">Ngày Kết Thúc:</label>
          <input
            type="date"
            id="cuoi"
            name="cuoi"
            value={formData.cuoi}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dau">Ngày Bắt Đầu:</label>
          <input
            type="date"
            id="dau"
            name="dau"
            value={formData.dau}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nv">Mã Nhân Viên:</label>
          <input
            type="text"
            id="nv"
            name="nv"
            value={formData.nv}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Đang tải...' : 'Gửi'}
        </button>
      </form>
    </div>
  );
};

export default Query3;
