import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const AddTrainer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qualification, setQualification] = useState("");
  const[description,setDescription] = useState("")
  const [loading, setLoading] = useState(false);

  const handleAddTrainer = async (event) => {
    event.preventDefault();
  
    const newTrainer = {
      firstName,
      lastName,
      email,
      nic,
      password,
      dateOfBirth,
      phoneNumber,
      qualification,
      description
    };
  
    setLoading(true);
  
    // Validate NIC format
    const nicRegex = /^[0-9]{9}[vVxX]$/;
    if (!nicRegex.test(nic)) {
      alert("Please enter a valid Sri Lankan NIC number.");
      setLoading(false);
      return;
    }
  
    // Validate phone number format
    const phoneRegex = /^(0|\+94)?[1-9][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid Sri Lankan phone number.");
      setLoading(false);
      return;
    }
  
    try {
      // Add new user to parent component state
      const response = await axios.post(
        "http://localhost:8090/trainer/add",
        newTrainer
      );
      alert("Registration Successful!");
      console.log(response.data);
  
      // Reset form inputs
      setFirstName("");
      setLastName("");
      setEmail("");
      setNic("");
      setPassword("");
      setDateOfBirth(new Date());
      setPhoneNumber("");
      setQualification("")
      setDescription("");
    } catch (error) {
      alert(`User registration failed! ${error.message}`);
    }
  
    setLoading(false);
  };
  

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="form"
        onSubmit={handleAddTrainer}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 2,
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
          py: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 8,
          fontSize: "1.2rem",
          height: "700px",
          width: "600px"
        }}
      >
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Email"
         
          fullWidth
          margin="normal"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="NIC"
          fullWidth
          margin="normal"
          value={nic}
          onChange={(event) => setNic(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Date of Birth"
          fullWidth
          margin="normal"
          type="date"
          defaultValue={dateOfBirth.toISOString().substr(0, 10)}
          onChange={(event) => setDateOfBirth(new Date(event.target.value))}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Qualification"
          fullWidth
          margin="normal"
          value={qualification}
          onChange={(event) => setQualification(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
                <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(event) => setQualification(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            margin: "20px auto",
            width: "100%",
            color: "#FFFFFF"
          }}
          size="small"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Trainer"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddTrainer;
