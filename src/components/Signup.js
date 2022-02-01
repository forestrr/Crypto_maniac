import { Box, Button, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { CryptoState } from "../CryptoContext";
import { auth } from "./firebase";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = CryptoState();

  const handlesubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "password doesn't match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("data",result);
      setAlert({
        open: true,
        message: `sign Up sucessfull.Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
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
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        fullwidth
        onChange={(e) => setConfirmPassword(e.target.value)}
      ></TextField>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EBB81A" }}
        onClick={handlesubmit}
      >
        Signup
      </Button>
    </Box>
  );
};
export default Signup;
