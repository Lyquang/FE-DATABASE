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

    if (formData.n > formData.t) {
      setError('Start date must be before the end date.');
      return;
    }

    if (!/^[A-Z0-9]{9}$/.test(formData.d)) {
      setError('Invalid employee code. It must be 9 alphanumeric characters.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `http://localhost:8080/query/viet22?ketthuc=${encodeURIComponent(formData.t)}&batdau=${encodeURIComponent(formData.n)}&nv=${encodeURIComponent(formData.d)}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        onDataFetched(data);
      } else {
        setError(`Error fetching data: ${response.status}`);
      }
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  return (
    <div className="query4-container">
      <h2>Query Form</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="t">T (Ngày kết thúc):</label>
          <input type="date" id="t" name="t" value={formData.t} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="n">N (Ngày bắt đầu):</label>
          <input type="date" id="n" name="n" value={formData.n} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="d">D (Mã nhân viên):</label>
          <input type="text" id="d" name="d" value={formData.d} onChange={handleInputChange} required maxLength="9" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Query4;
