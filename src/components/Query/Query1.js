import React, { useState } from 'react';

const Query1 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ t: 2, n: 2025, d: 50000000 });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/query/manhcuong1?t=${formData.t}&n=${formData.n}&d=${formData.d}`);
      if (response.ok) {
        const data = await response.json();
        onDataFetched(data);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  return (
    <div className="query1-container">
      <h2>Tìm tên, lương thực tế của nhân viên có lương thực tế cao nhất trong tháng a và năm b của phòng ban c có lương thực tế bé hơn d</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="t">T (Tháng):</label>
          <input type="number" id="t" name="t" value={formData.t} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="n">N (Năm):</label>
          <input type="number" id="n" name="n" value={formData.n} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="d">D (Lương thực tế):</label>
          <input type="number" id="d" name="d" value={formData.d} onChange={handleInputChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Query1;
