import React, { useState } from 'react';

const Query2 = ({ onDataFetched }) => {
  const [formData, setFormData] = useState({ t: 2, n: 2025});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:8080/query/caculate_salary_to_pay?t=${formData.t}&n=${formData.n}`);
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
    <div className="query2-container">
      <h2>Query Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="t">T (Tháng):</label>
          <input type="number" id="t" name="t" value={formData.t} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="n">N (Năm):</label>
          <input type="number" id="n" name="n" value={formData.n} onChange={handleInputChange} required />
        </div>
        {/* <div className="form-group">
          <label htmlFor="d">D (Lương thực tế):</label>
          <input type="number" id="d" name="d" value={formData.d} onChange={handleInputChange} required />
        </div> */}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Query2;
