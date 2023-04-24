// import { Box, Grid } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { QrCodeScanner } from "react-simple-qr-code-scanner";
// import axios from 'axios';
// import { useTheme } from '@mui/material'
// import '../../styles/index.css'

// const ScanMembership = () => {

//     const [scannedResult, setScannedResult] = useState('');
//     const [membershipId, setMemebershipId] = useState('');
//     const [memberEmail, setMemeberEmail] = useState('');
//     const [membershipExpiration, setMemebershipExpiration] = useState('');
//     const [membershipType, setMemebershipType] = useState('');
//     const [invalid, setInvalid] = useState('');
//     const [access, setAccess] = useState('');

//     const theme = useTheme();

//     let prevID;

//     useEffect(() => {

//     })

//     const executeScan = (result) => {
//         if (result != null && result.text != prevID) {
//             prevID = result.text;
//             console.log(result)
//             setScannedResult(result.text);

//             axios.get(`http://localhost:8090/membership/${result.text}`).then((res) => {
//                 if (res.data._id != undefined) {
//                     setMemebershipId(res.data._id)
//                     setMemeberEmail(res.data.email)
//                     setMemebershipExpiration(res.data.expirationDate)
//                     setMemebershipType(res.data.membershipType)
//                     setInvalid('')

//                     if ((new Date(res.data.expirationDate)) > (new Date())) {
//                         setAccess('Access Granted')
//                     } else {
//                         setAccess('Access Denied')
//                         setInvalid('Membership Expired')
//                     }

//                 } else {
//                     setInvalid('Invalid Membership QR Code')
//                     setAccess('Access Denied')
//                     setMemebershipId('')
//                     setMemeberEmail('')
//                     setMemebershipExpiration('')
//                     setMemebershipType('')
//                 }
//             }).catch((err) => {
//                 setInvalid('Invalid Membership QR Code')
//                 setAccess('Access Denied')
//                 setMemebershipId('')
//                 setMemeberEmail('')
//                 setMemebershipExpiration('')
//                 setMemebershipType('')
//             })
//         }
//     }

//     const formatDate = (date) => {
//         return (date.substring(0, 10));
//     };

//     const scanError = (err) => {
//         console.log(err);
//     }

//     return (
//         <>
//             <Grid container spacing={0} align="center">
//                 <Grid item xs={6} xl={6}>
//                     <QrCodeScanner
//                         onResult={executeScan}
//                         Errors={scanError}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                     <Box position="relative" sx={{ backgroundColor: theme.palette.background.alt }} className="scanner-display">
//                         <h1 style={{ color: (access === 'Access Granted') ? '#4BB543' : '#FF0000' }}>{access}</h1>
//                         <h3 style={{ color: '#FF0000' }}>{invalid}</h3>
//                         <Box align='left' sx={{ display: (membershipId != '') ? 'block' : 'none' }} >
//                             <h4> Membership ID - {membershipId} </h4>
//                             <h4> Member Email - {memberEmail} </h4>
//                             <h4> Membership Expiration Date - {formatDate(membershipExpiration)} </h4>
//                             <h4> Membership Type - {membershipType} </h4>
//                         </Box>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </>
//     );
// }

// export default ScanMembership;
