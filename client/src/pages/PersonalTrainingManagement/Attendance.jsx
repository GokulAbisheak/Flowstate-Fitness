import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Close';
import '../../styles/index.css'
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

    const onSubmitDeleteAttendance = async (attendance, name) => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/attendance/delete/${name}`);
            alert('Deleting Successful!');
            window.location.href = '/admin/attendance'
        } catch (err) {
            alert('Attendance deleting failed! ' + err)
        }
    };

    const theme = useTheme();

    const formatDate = (date) => {
        return date.substring(0, 10)
    }
    
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                    <TableHead sx={{ background: 'linear-gradient(to left, #07a7af, #01519a)' }}>
                        <TableRow>
                            <TableCell align="left" sx={{ color: '#FFFFFF' }}>Name</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Date</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Attendance</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allAttendance.map((attendance) => (
                            <TableRow
                                key={attendance.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {attendance.name}
                                </TableCell>
                                <TableCell align="center">{formatDate(attendance.date)}</TableCell>
                                <TableCell align="center">{attendance.present ? "Present" : "Absent"}</TableCell>
                            
                                <TableCell align="center" container spacing={1}
                                display="flex" alignItems="center" justifyContent="space-between"   direction={"row"} >
                                    
                                    <Button variant='contained' color='Primary' href="/admin/updateAttendance" style={{marginBottom:'10px', marginRight:'10px'}} sx={{ margin: '5px', color: '#FFFFFF' }} onClick={() => {}}>Update</Button>
                                        
                                    <Button variant='contained' color='Secondary' style={{marginBottom:'10px', marginLeft:'10px'}} sx={{ margin: '5px' }} onClick={(event) => onSubmitDeleteAttendance(event, attendance.name)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <Button size="small" color="#07a7af" variant='contained' href="/admin/addAttendance" style={{margintop:'200px', marginLeft:'1000px'}}> Add Attendance</Button> */}

        
    </>
        
    );
}

export default DisplayAttendance;




// import React, { useState, useEffect } from 'react';
// import { useTheme } from '@mui/material';
// import { Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import CancelIcon from '@mui/icons-material/Close';
// import '../../styles/index.css'
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const DisplayAttendance = () => {
//     const [allAttendance, setAllAttendance] = useState([]);
//     const [name, setName] = useState("");
//     const [date, setDate] = useState("");
//     const [present, setPresent] = useState("");
//     const [absent, setAbsent] = useState("");
//     const [open, setOpen] = useState(false);


//     useEffect(() => {
//         const getAllAttendance = () => {
//             axios.get('http://localhost:8090/attendance').then((res) => {
//                 setAllAttendance(res.data);
//                 setName(res.data);
//             }).catch((err) => {
//                 alert('Unable to get all Attendance ' + err.message);
//             })
//         }
//         getAllAttendance();
//     }, []);

//     const onSubmitDeleteAttendance = async (attendance, name) => {
//         attendance.preventDefault();

//         try {
//             axios.delete(`http://localhost:8090/attendance/delete/${name}`);
//             alert('Deleting Successful!');
//             window.location.href = '/admin/attendance'
//         } catch (err) {
//             alert('Attendance deleting failed! ' + err)
//         }
//     };

//     const getAttendance = (name) => {
//         axios.get(`http://localhost:8090/admin/${name}`).then((res) => {
//             setName(res.data.name);
//             setDate(res.data.date);
//             setPresent(res.data.present);
//             setAbsent(res.data.absent);
            
//         }).catch((err) => {
//             alert('Unable to get user ' + err.message);
//         })
//     }

//     const theme = useTheme();

//     const formatDate = (date) => {
//         return date.substring(0, 10)
//     }

//     const displayUpdateForm = () => {
//         document.getElementById('update-box').style.display = "block";
//     }

//     const hideUpdateForm = () => {
//         document.getElementById('update-box').style.display = "none";
//         setName('');
//         setDate('');
//         setPresent('');
//         setAbsent('');
//     }

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         console.log(name);
//         console.log(date);
//         console.log(present);
//         console.log(absent);
        

//         const updateDetails = {
//             name: name,
//             date: date,
//             present: present,
//             absent: absent,

//         }

//         await axios.patch(`http://localhost:8090/admin/update/${name}`, updateDetails).then(() => {
//             handleOpen();
//             hideUpdateForm();

//         }).catch((err) => {
//             alert('Update Failed ' + err.message);
//         })

//     }

//     const handleOpen = () => {
//         setOpen(true);
//     }

//     const handleClose = () => {
//         setOpen(false);
//         location.reload();
//     }
    
//     return (
//         <>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="sticky table">
//                     <TableHead sx={{ background: 'linear-gradient(to left, #07a7af, #01519a)' }}>
//                         <TableRow>
//                             <TableCell align="left" sx={{ color: '#FFFFFF' }}>Name</TableCell>
//                             <TableCell align="center" sx={{ color: '#FFFFFF' }}>Date</TableCell>
//                             <TableCell align="center" sx={{ color: '#FFFFFF' }}>Attendance</TableCell>
//                             <TableCell align="right"></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {allAttendance.map((attendance) => (
//                             <TableRow
//                                 key={attendance.name}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                             >
//                                 <TableCell component="th" scope="row">
//                                     {attendance.name}
//                                 </TableCell>
//                                 <TableCell align="center">{formatDate(attendance.date)}</TableCell>
//                                 <TableCell align="center">{attendance.present ? "Present" : "Absent"}</TableCell>
                            
//                                 <TableCell align="center" container spacing={1}
//                                 display="flex" alignItems="center" justifyContent="space-between"   direction={"row"} >
                                    
//                                     <Button variant='contained' color='Primary' href="/admin/updateAttendance" style={{marginBottom:'10px', marginRight:'10px'}} sx={{ margin: '5px', color: '#FFFFFF' }} onClick={() => {
//                                         getAttendance(attendance.name);
//                                         displayUpdateForm();
//                                     }}>Update</Button>
                                    
//                                     <Button variant='contained' color='Secondary' style={{marginBottom:'10px', marginLeft:'10px'}} sx={{ margin: '5px' }} onClick={(event) => onSubmitDeleteAttendance(event, attendance.name)}>Delete</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <Box id="update-box" sx={{ backgroundColor: "rgba(0,0,0,0.3)", width: "100%", height: "100%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
//                 <Box maxWidth="500px" height="520px" sx={{ backgroundColor: theme.palette.background.alt, position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0px 0px 10px rgba(0,0,0,0.5)", borderRadius: "5px" }}>
//                     <IconButton sx={{ float: "right", margin: "5px" }}>
//                         <CancelIcon onClick={() => { hideUpdateForm() }} />
//                     </IconButton>
//                     { }
//                     <form onSubmit={handleSubmit}>
//                         <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
//                             label="Name"
//                             value={name}
//                             InputLabelProps={{ shrink: true }}
//                             onChange={(e) => {
//                                 setName(e.target.value);
//                             }} />

//                         <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
//                             label="Date"
//                             value={date.substring(0, 10)}
//                             InputLabelProps={{ shrink: true }}
//                             onChange={(e) => {
//                                 setDate(e.target.value);
//                             }} />

//                         <FormControlLabel
//                         control={
//                             <Checkbox
//                                 checked={present}
//                                 onChange={(e) => setPresent(e.target.checked)}
//                                 name="present"
//                                 // required={true}
//                             />
//                         }
//                         label="Present"
                        
//                     />

//                     <FormControlLabel
//                         control={
//                             <Checkbox
//                                 checked={present}
//                                 onChange={(e) => setAbsent(e.target.checked)}
//                                 name="absent"
//                                 // required={true}
//                             />
//                         }
//                         label="Absent"
                        
//                     />
                        

//                         <Button type="submit" color="success" variant='contained' sx={{ margin: "10px 40px", width: "calc(100% - 80px)" }}>
//                             Confirm Update
//                         </Button>
//                     </form>
//                 </Box>
//             </Box>

//             <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'right',
//             }}>
//                 <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//                     Update Success!
//                 </Alert>
//             </Snackbar>
        
//     </>
        
//     );
// }

// export default DisplayAttendance;







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