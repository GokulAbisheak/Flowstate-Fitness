import React, {useState} from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';
import axios from 'axios';


const AddFinances = () => {

    const [salaryID, setSID] = useState("");
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [department, setDepartment] = useState("");
    const [lastUpdated, setLastUpdates] = useState("");
    const [salary, setSalary] = useState("");
    const [frequency, setFrequency] = useState("");
    const [url, setURL] = useState("");

    const theme = useTheme();

    const onSubmitAddFinances = (event) => {
        event.preventDefault();
    
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mernpro")
        data.append("cloud_name", "dloxej4xv")
    
        const checkUrlAndUpdateFinance = () => {
            if (url === '') { // check if the url state is empty
                setTimeout(checkUrlAndUpdateFinance, 500); // wait for 0.5 second before checking again
            } else {
                const newFinance = {
                    salaryID: salaryID,
                    firstName: firstName,
                    lastName: lastName,
                    department: department,
                    lastUpdated: lastUpdated,
                    salary: salary,
                    frequency: frequency,
                    url: url
                };
    
                axios.post('http://localhost:8090/finance/add', newFinance)
                .then(() => {
                    setSID('');
                    setFName('');
                    setLName('');
                    setDepartment('');
                    setLastUpdates('');
                    setSalary('');
                    setFrequency('');
                    setURL('');
                    alert('Adding Successful!');
                    /* window.location.href = '/finance' */
                })
                .catch(err => {
                    alert('Salary adding failed! ' + err);
                });
            }
        };
    
        fetch("https://api.cloudinary.com/v1_1/dloxej4xv/image/upload", {
            method: "POST",
            body: data
        })
        .then(response => response.json())
        .then(imageData => {
            setURL(imageData.url);
            checkUrlAndUpdateFinance(); // start the recursive function to check the url update
        })
        .catch(err => {
            alert('Image uploading failed! ' + err);
        });
    };

    return (

        <form onSubmit={onSubmitAddFinances}>

            <Grid

                display="flex"
                justifyContent="center"
                alignItems="center"
                container spacing={2}
                direction={"column"}

            >
                <Grid item>
                    <TextField

                        id="id-input"
                        name="salaryID"
                        label="Salary ID"
                        type="text"
                        margin="normal"
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setSID(e.target.value)
                        }}

                    />
                </Grid>

                <Grid item>
                    <TextField

                        id="first_name-input"
                        name="firstName"
                        label="First Name"
                        type="text"
                        margin="normal"
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setFName(e.target.value)
                        }}

                    />
                </Grid>

                <Grid item>
                    <TextField

                        id="last_name-input"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        margin="normal"
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setLName(e.target.value)
                        }}

                    />
                </Grid>

               

                <Grid item>
                    <TextField

                        id="department-input"
                        name="department"
                        label="Department"
                        type="text"
                        margin="normal"
                        multiline
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setDepartment(e.target.value)
                        }}

                    />
                </Grid>

                <Grid item>
                    <TextField

                        id="date-input"
                        name="lastUpdated"
                        helperText="Please select manufactured date"
                        type="date"
                        margin="normal"
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setLastUpdates(e.target.value)
                        }}

                    />
                </Grid>

                <Grid item>
                    <TextField

                        id="salary-input"
                        name="salary"
                        label="Salary"
                        type="text"
                        margin="normal"
                        startadornment={<InputAdornment position="start">Rs.</InputAdornment>}
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setSalary(e.target.value)
                        }}

                    />
                </Grid>

                <Grid item>
                    <TextField

                        id="frequency-input"
                        name="frequency"
                        label="Frequency"
                        type="text"
                        margin="normal"
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setFrequency(e.target.value)
                        }}

                    />
                </Grid>

               


                <Grid item>
                    <Button variant="contained" margin="normal" color="primary" type="submit">Add</Button>
                </Grid>

            </Grid>
        </form>

    )
}

export default AddFinances;