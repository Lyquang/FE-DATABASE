import React, { useState } from 'react';

const Query5 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ nv:'' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [fetchedData, setFetchedData] = useState([]); // To store the fetched data

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    try {
      const url = `http://localhost:8080/query/viet3?nv=${encodeURIComponent(formData.nv)}`;
      console.log(`Fetching URL: ${url}`);  // Log URL to check
  
      const response = await fetch(url);
      console.log("Query response:", response); // Log the response object
  
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Data fetched from API:', data); // Log the actual data
  
      // Call onDataFetched callback with data
      onDataFetched(data);
      // setFetchedData(data); // Save the fetched data locally to display
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

//   const data = Array.isArray(onDataFetched) ? onDataFetched : [];
  
  return (
    <div className="query5-container">
      <h2>Form hiển thị lịch sử công việc của nhân viên</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="year">Mã số nhân viên:</label>
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

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error if any */}

      {/* Display fetched data if it exists */}
      {/* {data.length > 0 && (
        <div className="results">
          <h3>Results:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <p><strong>MSNV:</strong> {item.msnv}</p>
                <p><strong>Họ tên:</strong> {item.hoten}</p>
                <p><strong>Tổng giờ thiếu:</strong> {item.tong_gio_thieu}</p>
                <p><strong>Số tháng thiếu:</strong> {item.sothangthieu}</p>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Query5;
