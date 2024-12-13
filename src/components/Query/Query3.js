import React, { useState } from 'react';

const Query3 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({cuoi: '', dau: '',  nv: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

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
      const url = `http://localhost:8080/query/viet2?cuoi=${encodeURIComponent(formData.cuoi)}&dau=${encodeURIComponent(formData.dau)}&nv=${encodeURIComponent(formData.nv)}`
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
  // const data = Array.isArray(onDataFetched) ? onDataFetched : [];
  return (
    <div className="query3-container">
      <h2>Form hiện ngày làm việc từ ngày bắt đầu đến ngày kết thúc</h2>
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

export default Query3;

