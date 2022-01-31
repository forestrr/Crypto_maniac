import { Box, Button, TextField } from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { CryptoState } from "../CryptoContext";
import { auth } from "./firebase";
const Login = ({handleClose}) => {
  const { setAlert } = CryptoState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlesubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "please fill all the fields ",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("data", result);
      setAlert({
        open: true,
        message: `sign is sucessfull.Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: error,
      });
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        fullwidth
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        fullwidth
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#00897b" }}
        onClick={handlesubmit}
      >
        Signup
      </Button>
    </Box>
  );
};

export default Login;
