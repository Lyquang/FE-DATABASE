import React, { useState } from 'react';

const Query6 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ year: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Error state

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Reset error
  
    try {
      const url = `http://localhost:8080/query/phuong1?year=${encodeURIComponent(formData.year)}`;
      console.log(`Fetching URL: ${url}`);
  
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

  const data = Array.isArray(onDataFetched) ? onDataFetched : [];

  return (
    <div className="query6-container">
      <h2>Query 6 Form</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Đang tải...' : 'Gửi'}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error if any */}

      {/* Display fetched data if it exists */}
      {data.length > 0 && (
        <div className="results">
          <h3>Results:</h3>
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <p><strong>Month:</strong> {item.month}</p>
                <p><strong>Total Salary for Overtime:</strong> {item.tong_luong_lam_them} VND</p>
                <p><strong>Total Overtime Hours:</strong> {item.tong_gio_lam_them}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Query6;
