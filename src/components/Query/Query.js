import React, { useState } from 'react';
import Query1 from './Query1';
import Query2 from './Query2';
import Query4 from './Query4';
import './Query.scss';

const Query = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [apiData, setApiData] = useState(null);

  const endpoints = [
    { value: 'manhcuong1', label: 'Tìm tên, lương thực tế của nhân viên...' },
    { value: 'caculate_salary_to_pay', label: 'GET 124 tinhluong+lamthem' },
    { value: '3', label: 'GET 1.2.4listngay(gọi chung cái n...)' },
    { value: 'viet22', label: 'GET 124tinhgiolam' },
    { value: '5', label: 'GET thuviec' },
    { value: '6', label: 'GET 123lscongviec' },
    { value: '7', label: 'GET 1.2.3SumLamthem' },
    { value: '8', label: 'GET kht' },
    { value: '9', label: 'GET chitiet(gọi chung kht)' }
  ];

  const handleSelectChange = (event) => {
    setSelectedEndpoint(event.target.value);
    setApiData(null);
  };

  const handleDataFetched = (data) => {
    setApiData(data);
  };

  return (
    <div className="query-container">
      <h2>Query API</h2>
      <div className="form-group">
        <label htmlFor="endpoint">Select an endpoint:</label>
        <select id="endpoint" onChange={handleSelectChange} value={selectedEndpoint}>
          <option value="">Choose an option</option>
          {endpoints.map((endpoint) => (
            <option key={endpoint.value} value={endpoint.value}>
              {endpoint.label}
            </option>
          ))}
        </select>
      </div>

      {selectedEndpoint === 'manhcuong1' && (
        <>
          <Query1 onDataFetched={handleDataFetched} />
          {apiData && (
            <div className="result-container">
              <h3>API Result</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Salary</th>
                    <th>Department ID</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((item, index) => (
                    <tr key={index}>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {selectedEndpoint === 'caculate_salary_to_pay' && (
        <>
          <Query2 onDataFetched={handleDataFetched} />
          {apiData && (
            <div className="result-container">
              <h3>API Result</h3>
              <table>
                <thead>
                  <tr>
                    <th>Salary_to_pay</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((item, index) => (
                    <tr key={index}>
                      <td>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {selectedEndpoint === 'viet22' && (
        <>
          <Query4 onDataFetched={handleDataFetched} />
          {apiData && (
            <div className="result-container">
              <h3>API Result</h3>
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    {/* <th>ID</th>
                    <th>Salary</th>
                    <th>Department ID</th> */}
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((item, index) => (
                    <tr key={index}>
                      <td>{item}</td>
                      {/* <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Query;
