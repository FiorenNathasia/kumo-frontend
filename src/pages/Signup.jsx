import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { Box, Link, Typography, TextField, Stack, Button } from "@mui/material";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSignup(true);
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        newUser
      );
      navigate("/login");
      return response;
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "lightblue",
          position: "relative",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(217, 217, 217, 0.5)",
            backdropFilter: "blur(10px)",
            height: "550px",
            width: "346px",
            borderStyle: "solid",
            border: "3px solid #4B51F4",
            gap: 2,
          }}
        >
          SIGNUP
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack direction="column" spacing={2}>
            <Button variant="contained" onClick={handleSubmit}>
              Signup
            </Button>
            <Typography variant="h3" sx={{ fontSize: "1rem", pb: 2 }}>
              Already a member yet?{" "}
              <Link href="/login" component="a" sx={{ color: "#353AA8" }}>
                Login Here
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Signup;
