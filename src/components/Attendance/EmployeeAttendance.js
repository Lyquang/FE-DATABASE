import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './EmployeeAttendance.scss';
import { getEmployeeAttendance, postEmployeeCheckin, postEmployeeCheckout } from '../services/apiService';
import { useSelector } from 'react-redux';

const EmployeeAttendance = () => {
    const [value, setValue] = useState(new Date());
    const [schedule, setSchedule] = useState({});
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isCheckInDisabled, setIsCheckInDisabled] = useState(false);
    const [isCheckedOut, setIsCheckedOut] = useState(false); 

    const [showOvertime, setShowOvertime] = useState(false);
    const [overtimeHours, setOvertimeHours] = useState(0);
    
    const [showRequestOff, setShowRequestOff] = useState(false);
    const [leaveReason, setLeaveReason] = useState("");
    const [leaveStartDate, setLeaveStartDate] = useState(null);
    const [leaveEndDate, setLeaveEndDate] = useState(null);

    const {personnel} = useSelector((state) => state);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            if(personnel?.data){
                const response = await getEmployeeAttendance(personnel.data.code);
                const attendanceData = response.data;

                const formattedSchedule = attendanceData.data.reduce((acc, record) => {
                    const dateKey = record.date;
                    acc[dateKey] = {
                        type: record.checkOut ? 'done' : 'work', 
                        overtime: 0, 
                    };
                    return acc;
                }, {});
                setSchedule(formattedSchedule);
            }
        }
        fetchAttendanceData();
        // console.log("personnel >>", personnel);
    }, [personnel]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const selectedDateKey = value.toISOString().split('T')[0];
        setIsCheckInDisabled(today === selectedDateKey && isCheckedOut);
    }, [value, isCheckedOut]);

    const handleDateChange = (date) => {
        setValue(date);
        const dateKey = date.toISOString().split('T')[0];
        setIsCheckedIn(schedule[dateKey]?.type === 'work');
        setIsCheckedOut(schedule[dateKey]?.type === 'done');
        setOvertimeHours(schedule[dateKey]?.overtime || 0);
    };

    const handleCheckIn = async () => {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

        if(personnel?.data){
            console.log("code >>>>", personnel.data.code);
            const response = await postEmployeeCheckin(personnel.data.code);
            console.log(response.data);
            setSchedule((prevSchedule) => ({
                ...prevSchedule,
                [dateKey]: {
                    ...prevSchedule[dateKey],
                    type: 'work', 
                },
            }));
            setIsCheckedIn(true);
            setIsCheckedOut(false);
        }
    };

    const handleCheckOut = async () => {
        if (!isCheckedIn) {
            alert('You must check in before checking out!');
            return;
        }
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0'); 
        const day = String(value.getDate()).padStart(2, '0');
        const dateKey = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

        if(personnel?.data){
            const response = await postEmployeeCheckout(personnel.data.code);
            console.log(response.data);
            console.log(response?.data?.data.timeWorking);
            setSchedule((prevSchedule) => ({
                ...prevSchedule,
                [dateKey]: {
                    ...prevSchedule[dateKey],
                    type: 'done', 
                },
            }));
            setIsCheckedIn(false);
            setIsCheckedOut(true);
            setIsCheckInDisabled(true);
        }
    };
    

    const handleOvertimeToggle = () => {
        setShowOvertime(!showOvertime);
    };

    const handleOvertimeSelect = (event) => {
        const hours = parseInt(event.target.value, 10);
        setOvertimeHours(hours);
        const dateKey = value.toISOString().split('T')[0];
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [dateKey]: {
                ...prevSchedule[dateKey],
                overtime: hours,
            },
        }));
    };

    const handleRequestOffToggle = () => {
        setShowRequestOff(!showRequestOff);
    };

    const handleLeaveReasonChange = (event) => {
        setLeaveReason(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setLeaveStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setLeaveEndDate(event.target.value);
    };

    const handleSubmitLeaveRequest = () => {
        if (!leaveStartDate || !leaveEndDate || !leaveReason) return;
    
        // Normalize the start and end dates to midnight
        const start = new Date(new Date(leaveStartDate).setHours(0, 0, 0, 0));
        const end = new Date(new Date(leaveEndDate).setHours(0, 0, 0, 0));
        const newSchedule = { ...schedule };
    
        // Iterate through each day in the range and mark as "off"
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
            newSchedule[dateKey] = {
                type: 'off',
                reason: leaveReason,
            };
        }
    
        console.log("Request submitted for leave days.");
    
        // Update state and reset inputs
        setSchedule(newSchedule);
        setLeaveReason("");
        setLeaveStartDate(null);
        setLeaveEndDate(null);
        setShowRequestOff(false);
    };
    

    const renderTileContent = ({ date, view }) => {
        if (view === 'month') {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const day = String(date.getDate()).padStart(2, '0');
            const dateKey = `${year}-${month}-${day}`;
            // const dayInfo = schedule[dateKey];

            return (
                <div className="tile-content">
                    {schedule[dateKey]?.type === 'work' && <div className="day-label work-day">Worked</div>}
                    {schedule[dateKey]?.type.overtime > 0 && (
                        <div className="day-label overtime-label">Overtime: {schedule[dateKey]?.type.overtime}h</div>
                    )}
                    {schedule[dateKey]?.type === 'off' && (
                        <div className="day-label off-day">
                            Off - {schedule[dateKey]?.type.reason}
                        </div>
                    )}
                    {schedule[dateKey]?.type === 'done' && (
                        <div className="day-label done-day">Done</div>
                    )}
                </div>
            );
        }
        return null;
    };
    

    return (
        <div className="attendance-container">
            <h2 className="attendance-title">Lịch làm việc của tôi</h2>
            <div className="calendar-and-controls">
                <div className="calendar-container">
                    <Calendar
                        onChange={handleDateChange}
                        value={value}
                        tileContent={renderTileContent}
                        tileDisabled={({ date }) => date > new Date()} // Disable future dates
                    />
                </div>
                <div className="controls-container">
                    <button 
                        className="check-in-button" 
                        onClick={handleCheckIn}
                        disabled={isCheckInDisabled}
                    >
                        Check In
                    </button>
                    <button className="check-out-button" onClick={handleCheckOut}>
                        Check Out
                    </button>

                    <button className="overtime-button" onClick={handleOvertimeToggle}>
                        Đăng ký OT
                    </button>
                    {showOvertime && (
                        <div className="overtime-dropdown">
                            <label htmlFor="overtime-hours">Số giờ OT</label>
                            <select id="overtime-hours" value={overtimeHours} onChange={handleOvertimeSelect}>
                                <option value="0">Chọn số giờ</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    )}
                    <button className="request-off-button" onClick={handleRequestOffToggle}>
                        Xin nghỉ phép
                    </button>
                    {showRequestOff && (
                        <div className="request-off-box">
                            <label htmlFor="leave-start">Từ</label>
                            <input
                                type="date"
                                id="leave-start"
                                value={leaveStartDate || ""}
                                onChange={handleStartDateChange}
                            />
                            <label htmlFor="leave-end">Đến</label>
                            <input
                                type="date"
                                id="leave-end"
                                value={leaveEndDate || ""}
                                onChange={handleEndDateChange}
                            />
                            <label htmlFor="leave-reason">Lý do nghỉ</label>
                            <textarea
                                id="leave-reason"
                                value={leaveReason}
                                onChange={handleLeaveReasonChange}
                                placeholder="Enter reason here..."
                            />
                            <button onClick={handleSubmitLeaveRequest}>Gửi yêu cầu</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeAttendance;
