import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
import axios from 'axios';

const DisplayAttendance = () => {
    const [allAttendance, setAllAttendance] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        const getAttendance = () => {
            axios.get('http://localhost:8090/attendance').then((res) => {
                setAllAttendance(res.data);
                setName(res.data);
            }).catch((err) => {
                alert('Unable to get all Attendance ' + err.message);
            })
        }
        getAttendance();
    }, []);

    const theme = useTheme();
    
    return (
        <>
            <Grid container spacing={2}>
                {allAttendance.map((attendance) => (
                    <Grid item key={attendance.name} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                        {attendance.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        {attendance.date.substring(0, 10)}
                                    </Typography>
                                    <Typography variant="h8" color="primary" gutterBottom>
                                        {attendance.present ? "Present" : "Absent"}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {attendance.absent ? "Absent" : "Present"}
                                    </Typography> */}
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button size="small" color="primary" href="/admin/updateAttendance">Update</Button>
                                <Button size="small" color="primary" >Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default DisplayAttendance;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function AttendanceList() {
//   const [attendance, setAttendance] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8090/attendance')
//       .then(response => {
//         setAttendance(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Attendance List</h1>
//       <ul>
//         {attendance.map(record => (
//           <li key={record._id}>
//             {record.date}: {record.present ? 'Present' : 'Absent'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AttendanceList;