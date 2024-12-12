import React, { useState } from 'react';

const Query6 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ n: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Trạng thái lỗi

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Reset lỗi

    try {
      const fetchUrl = `http://localhost:8080/query/phuong1?n=${formData.n}`;
      console.log(`Fetching URL: ${fetchUrl}`); // Log URL kiểm tra

      const response = await fetch(fetchUrl, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      onDataFetched(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage(
        'Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="query6-container">
      <h2>Query Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="n">N (Năm):</label>
          <input
            type="number"
            id="n"
            name="n"
            value={formData.n}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Đang tải...' : 'Gửi'}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Hiển thị lỗi */}
    </div>
  );
};

export default Query6;
