import React, { useState } from 'react';
import Query1 from './Query1';
import Query2 from './Query2';
import Query3 from './Query3';
import Query4 from './Query4';
import Query6 from './Query6';
import Query7 from './Query7';
import './Query.scss';
import Query8 from './Query8';

const Query = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [apiData, setApiData] = useState(null);

  const endpoints = [
    { value: 'manhcuong1', label: 'Tìm tên, lương thực tế của nhân viên...' },
    { value: 'caculate_salary_to_pay', label: 'GET 124 tinhluong+lamthem' },
    { value: 'viet2', label: 'GET 1.2.4listngay(gọi chung cái n...)' },
    { value: 'viet22', label: 'GET 124tinhgiolam' },
    { value: '5', label: 'GET thuviec' },
    { value: '6', label: 'GET 123lscongviec' },
    { value: 'phuong1', label: 'GET 1.2.3SumLamthem' },
    { value: 'kohoanthanh', label: 'GET kht' },
    { value: 'chitietkht', label: 'GET chitiet(gọi chung kht)' }
  ];

  const handleSelectChange = (event) => {
    setSelectedEndpoint(event.target.value);
    setApiData(null);
  };

  const handleDataFetched = (data) => {
    console.log('API Data:', data);  // Kiểm tra dữ liệu nhận được
    if (data) {
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        setApiData(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch {
        setApiData([data]);
      }
    } else {
      setApiData([]);  // Nếu không có dữ liệu
    }
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
          {apiData ? (
            Array.isArray(apiData) ? (
              <div className="result-container">
                <h3>API Result</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
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
            ) : (
              <p>Dữ liệu không hợp lệ. Vui lòng kiểm tra định dạng từ API.</p>
            )
          ) : (
            <p></p>
          )}
        </>
      )}
      {selectedEndpoint === 'viet2' && (
        <>
          <Query3 onDataFetched={handleDataFetched} />
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

      {selectedEndpoint === 'phuong1' && (
        <>
          <Query6 onDataFetched={handleDataFetched} />
          {apiData && (
            <div className="result-container">
              <h3>API Result</h3>
              <table>
                <thead>
                  <tr>
                    <th>Tháng</th>
                    <th>Tổng lương làm thêm</th>
                    <th>Tổng giờ làm thêm</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((item, index) => (
                    <tr key={index}>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {selectedEndpoint === 'kohoanthanh' && (
        <>
          <Query7 onDataFetched={handleDataFetched} />
          {apiData ? (
            Array.isArray(apiData) && apiData.length > 0 ? (
              <div className="result-container">
                <h3>API Result</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Mã số nhân viên</th>
                      <th>Họ và tên</th>
                      <th>Tổng giờ thiếu</th>
                      <th>Số tháng thiếu</th>
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
            ) : (
              <p>Dữ liệu không hợp lệ hoặc không có dữ liệu. Vui lòng kiểm tra định dạng từ API.</p>
            )
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </>
      )}

      {selectedEndpoint === 'chitietkht' && (
        <>
          <Query8 onDataFetched={handleDataFetched} />
          {apiData && (
            <div className="result-container">
              <h3>API Result</h3>
              <table>
                <thead>
                  <tr>
                    <th>Mã số nhân viên</th>
                    <th>Tháng</th>
                    <th>Tối thiểu</th>
                    <th>Thực tế</th>
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



    </div>
  );
};

export default Query;
