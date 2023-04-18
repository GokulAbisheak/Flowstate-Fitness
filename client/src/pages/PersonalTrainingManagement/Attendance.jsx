import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceList() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios.get('/api/attendance')
      .then(response => {
        setAttendance(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Attendance List</h1>
      <ul>
        {attendance.map(record => (
          <li key={record._id}>
            {record.date}: {record.present ? 'Present' : 'Absent'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceList;