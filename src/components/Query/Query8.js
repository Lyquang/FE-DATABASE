import React, { useState } from 'react';

const Query8 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ year: '', solan: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Error state
  // const [fetchedData, setFetchedData] = useState([]); // To store the fetched data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Reset error state when a new fetch is initiated

    try {
      const url = `http://localhost:8080/query/chitietkht?input_year=${encodeURIComponent(formData.year)}&solan=${encodeURIComponent(formData.solan)}`;
      console.log(`Fetching URL: ${url}`);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data fetched from API:', data);
      onDataFetched(data); // Pass the fetched data to the parent component
      // setFetchedData(data); // Save the fetched data locally to display
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Ensure onDataFetched is an array
  const data = Array.isArray(onDataFetched) ? onDataFetched : [];

  return (
    <div className="query8-container">
      <h2>Form hiển thị chi tiết các tháng thiếu của nhân viên trong năm</h2>
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
          <label htmlFor="solan">Số lần tối thiểu:</label>
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
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error if any */}

      {/* Display fetched data if available */}
      {data.length > 0 && (
        <div className="results">
          <h3>Details:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <p><strong>Employee ID:</strong> {item.msnv}</p>
                <p><strong>Month:</strong> {item.thang}</p>
                <p><strong>Minimum Time:</strong> {item.toithieu}</p>
                <p><strong>Actual Time:</strong> {item.thucte}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Query8;
