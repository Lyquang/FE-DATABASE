import React, { useState } from 'react';

const Query7 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ year: '', solan: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    try {
      const url = `http://localhost:8080/query/kohoanthanh?namm=${encodeURIComponent(formData.year)}&solan=${encodeURIComponent(formData.solan)}`;
      console.log(`Fetching URL: ${url}`);  // Log URL để kiểm tra
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Data fetched from API:', data);  // Log dữ liệu API
      onDataFetched(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="query7-container">
      <h2>Query 7 Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="year">Năm:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="solan">Số lần:</label>
          <input
            type="number"
            id="solan"
            name="solan"
            value={formData.solan}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Đang tải...' : 'Gửi'}
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Hiển thị lỗi nếu có */}
    </div>
  );
};

export default Query7;
