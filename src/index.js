import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
// import '@fortawe some/fontawesome-free/css/all.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Employee from './components/Employee/Employee';

import Attendance from './components/Attendance/EmployeeAttendance';

// import AdminAttendance from './components/Attendance/AdminAttendance';

import store from './store';


// import Salary from './components/Salary/Salary';

import { Provider } from 'react-redux';

import Training from './components/Training/Training';
import Statistic from './components/Statistic/Statistic';


import Home from './components/Authentication/Home';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';


//import admin
import AdminPage from './Page/AdminPage/AdminPage';
import AdminSalary from './components/Salary/AdminSalary';
import AdminTraining from './components/Training/AdminTraining';

import ADashboard from './Page/AdminPage/ADashboard';
import Department from './components/Department/Department';
import AdminAttendance from './components/Attendance/AdminAttendance';


//import manager
import ManagerPage from './Page/ManagerPage/ManagerPage';
import ManagerDevideTask from './components/Project/Manager/ManagerDivideTask';
import AdminProject from './components/Project/Admin/AdminProject';


// import employee
import EmployeePage from './Page/EmployeePage/EmployeePage';
import Employee from './components/Employee/Employee';
import EDashboard from './Page/EmployeePage/EDashboard';
import SubmitTask from './components/Project/Employee/SubmitTask';
import EmployeeInfor from './components/Information/EmployeeInfor';
import EmployeeAttendance from './components/Attendance/EmployeeAttendance';
import EmployeeTraining from './components/Training/EmployeeTraining';
import EmployeeChat from './components/Chat/EmployeeChat';
import Participation from './components/Project/Employee/Participation';
import Query from './components/Query/Query';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route exact path="/login/admin" element={<AdminPage />}>
          <Route index element={<ADashboard />}></Route>
          <Route path="employee" element={<Employee/>} />
          <Route path="admin-attendance" element={<AdminAttendance />} />
          <Route path="admin-salary" element={<AdminSalary />} />
          <Route path="department" element={<Department />} />
          <Route path="project" element={<AdminProject />} />

          <Route path="admin-training" element={<AdminTraining />} />
          <Route path="statistic" element={<Statistic />} />
          <Route path="chat" element={<EmployeeChat />} />
          <Route path ="query" element={<Query />}></Route>
        </Route>

        <Route exact path="/login/employee" element={<EmployeePage />}>

          <Route index element={<EDashboard />}></Route>
          <Route path="infor" element={<EmployeeInfor />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          {/* <Route path="salary" element={<Salary />}/>
                    <Route path="department" element={<Department />}/> */}
          {/* <Route path="project" element={<Project />} /> */}
          <Route path="participation" element={<Participation />} />
          <Route path="submittask" element={<SubmitTask />} />
          <Route path="training" element={<EmployeeTraining />} />
          <Route path="chat" element={<EmployeeChat />} />
        </Route>

        <Route exact path="/login/manager" element={<ManagerPage />}>

          {/* <Route index element={<Dashboard />}></Route> */}
          <Route path="infor" element={<EmployeeInfor />} />
          <Route path="attendance" element={<EmployeeAttendance />} />

          {/* <Route path="salary" element={<Salary />} /> */}

          <Route path="department" element={<Department />} />
        
          <Route path="training" element={<EmployeeTraining />} />
          <Route path="chat" element={<EmployeeChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>

);

reportWebVitals();
