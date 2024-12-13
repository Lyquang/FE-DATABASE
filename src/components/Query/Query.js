import React, { useState } from 'react';
import Query1 from './Query1';
import Query2 from './Query2';
import Query3 from './Query3';
import Query4 from './Query4';
import Query5 from './Query5';
import Query6 from './Query6';
import Query7 from './Query7';
import Query8 from './Query8';
import './Query.scss';


const Query = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [apiData, setApiData] = useState(null);

  const endpoints = [
    { value: 'manhcuong1', label: 'Tìm tên, lương thực tế của nhân viên có lương thực tế cao nhất trong tháng a và năm b của phòng ban c có lương thực tế bé hơn d' },
    { value: 'caculate_salary_to_pay', label: 'Tính tổng số tiền phải trả cho toàn bộ nhân viên trong tháng năm nào đó' },
    { value: 'viet2', label: 'Form hiện ngày làm việc từ ngày bắt đầu đến ngày kết thúc' },
    { value: 'viet22', label: 'Form Tính Giờ Làm Việc' },
    { value: 'viet3', label: 'Form hiển thị lịch sử công việc của nhân viên' },
    { value: 'phuong1', label: 'Form tính tổng lương làm thêm các tháng của tất cả nhân viên trong năm' },
    { value: 'kohoanthanh', label: 'Form tính số giờ thiếu và số tháng thiếu của các nhân viên trong năm' },
    { value: 'chitietkht', label: 'Form hiển thị chi tiết các tháng thiếu của nhân viên trong năm' }
  ];

  const handleSelectChange = (event) => {
    setSelectedEndpoint(event.target.value);
    setApiData(null);  // Reset apiData when a new endpoint is selected
  };

  const handleDataFetched = (data) => {
    console.log('API Data:', data);  // Log the data fetched from API
    if (data) {
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        setApiData(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch {
        setApiData([data]);
      }
    } else {
      setApiData([]);  // If no data is fetched, set it as an empty array
    }
  };

  return (
    <div className="query-container">
      <h2>Query</h2>
      <div className="form-group">
        <label htmlFor="endpoint">Hãy chọn câu truy vấn</label>
        <select id="endpoint" onChange={handleSelectChange} value={selectedEndpoint}>
          <option value="">Hãy chọn một phương án</option>
          {endpoints.map((endpoint) => (
            <option key={endpoint.value} value={endpoint.value}>
              {endpoint.label}
            </option>
          ))}
        </select>
      </div>

      {/* Conditional rendering for different queries */}
      {selectedEndpoint === 'manhcuong1' && (
        <>
          <Query1 onDataFetched={handleDataFetched} />
          {apiData && apiData.length > 0 ? (
            <div className="result-container">
              <h3>Kết quả truy vấn</h3>
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
          ) : (
            <p></p>
          )}
        </>
      )}

      {selectedEndpoint === 'caculate_salary_to_pay' && (
        <>
          <Query2 onDataFetched={handleDataFetched} />
          {apiData && apiData.length > 0 ? (
            <div className="result-container">
              <h3>Kết quả truy vấn</h3>
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
          ) : (
            <p></p>
          )}
        </>
      )}

      {selectedEndpoint === 'viet22' && (
        <>
          <Query4 onDataFetched={handleDataFetched} />
          {apiData && apiData.length > 0 ? (
            <div className="result-container">
              <h3>Kết quả truy vấn</h3>
              <table>
                <thead>
                  <tr>
                    <th>Thời gian làm việc</th>
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
            <p></p>
          )}
        </>
      )}

      {selectedEndpoint === 'viet2' && (
        <>
          <Query3 onDataFetched={handleDataFetched} />
          {apiData && apiData.length > 0 ? (
            <div className="result-container">
              <h3>Kết quả truy vấn</h3>
              <table>
                <thead>
                  <tr>
                    <th>Mã Nhân Viên</th>
                    <th>Họ Tên</th>
                    <th>Ngày Làm Việc</th>
                    <th>Giờ Vào</th>
                    <th>Giờ Ra</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nhanVien.msnv}</td>
                      <td>{item.nhanVien.hoten}</td>
                      <td>{`${item.ngayLamViecKey.ngay}/${item.ngayLamViecKey.thang}/${item.ngayLamViecKey.nam}`}</td>
                      <td>{item.giovao}</td>
                      <td>{item.giora}</td>
                      <td>{item.trangthai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}

      {selectedEndpoint === 'viet3' && (
        <>
          <Query5 onDataFetched={handleDataFetched} />
          {apiData && apiData.length > 0 ? (
            <div className="result-container">
              <h3>Kết quả truy vấn</h3>
              <table>
                <thead>
                  <tr>
                    <th>Mã Nhân Viên</th>
                    <th>Họ Tên</th>
                    <th>Ngày Sinh</th>
                    <th>Giới Tính</th>
                    <th>CCCD</th>
                    <th>Loại Nhân Viên</th>
                    <th>Phòng Ban</th>
                    <th>Chức Vụ</th>
                    <th>Loại NV</th>
                    <th>Lương Cơ Bản</th>
                    <th>Tên Phòng Ban</th>
                    <th>Start Date</th>
                    <th>STT</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nhanVien.msnv}</td>
                      <td>{item.nhanVien.hoten}</td>
                      <td>{item.nhanVien.ngaysinh}</td>
                      <td>{item.nhanVien.gioitinh}</td>
                      <td>{item.nhanVien.cccd}</td>
                      <td>{item.nhanVien.loainhanvien}</td>
                      <td>{item.nhanVien.mspb}</td>
                      <td>{item.chucvu}</td>
                      <td>{item.loainv}</td>
                      <td>{item.luongcoban.toLocaleString()}</td>
                      <td>{item.tenphongban}</td>
                      <td>{item.startdate}</td>
                      <td>{item.lichSuCVKey.stt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}

      {selectedEndpoint === 'phuong1' && (
        <>
          <Query6 onDataFetched={handleDataFetched} />
          {apiData && apiData.length > 0 ? (
            <div className="result-container">
              <h3>Kết quả truy vấn</h3>
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
                      <td>{item.month}</td>
                      <td>{item.tong_luong_lam_them.toLocaleString()}VNĐ</td>
                      <td>{item.tong_gio_lam_them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}

      {selectedEndpoint === 'kohoanthanh' && (
        <>
          <Query7 onDataFetched={handleDataFetched} />
          {apiData && apiData.length > 0 ? (
            <div className="result-container">
              <h3>Kết quả truy vấn</h3>
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
                      <td>{item.msnv}</td>
                      <td>{item.hoten}</td>
                      <td>{item.tong_gio_thieu}</td>
                      <td>{item.sothangthieu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}

      {selectedEndpoint === 'chitietkht' && (
        <>
          <Query8 onDataFetched={handleDataFetched} />
          {apiData && apiData.length > 0 ? (
            <div className="result-container">
              <h3>Kết quả truy vấn</h3>
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
                      <td>{item.msnv}</td>
                      <td>{item.thang}</td>
                      <td>{item.toithieu}</td>
                      <td>{item.thucte}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </>
      )}
    </div>
  );
};

export default Query;
