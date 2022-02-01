import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import Signup from '../components/Signup';
import Login from '../components/Login';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../CryptoContext';
import { auth } from '../components/firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:400,
    backgroundColor: theme.palette.background.paper,
    borderRadius:10,
    color:"white"
  },
  google:{
     padding:24,
     paddingTop:0,
     display:"flex",
     flexDirection:"column",
     textAlign:"center",
     gap:20,
     fontSize:20,
  }
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] =React.useState(0);
  const { setAlert } = CryptoState(); 
  console.log(value)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res)=>{
     setAlert({
        open: true,
        message: `sign is sucessfull.Welcome ${res.user.email}`,
        type: "success",
     }) 
    }).catch((err)=>{
      setAlert({
        open: true,
        message: err.message,
        type: "error",
      })
    })
  }
  return (
    <div>
      <Button variant="contained"
      style={{
        width:85,
        height:40,
        marginLeft:15,
        backgroundColor:"#00897b"
      }} type="button" onClick={handleOpen}>
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static"
            style={{backgroundColor:"transparent" ,color:"white" }} >
              <Tabs 
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{borderWidth:10}} >
              <Tab label ="Login" />
              <Tab label ="Signup" />
              </Tabs>
            </AppBar>
            {value===0 && <Login handleClose={handleClose}/>}
            {value===1 && <Signup  handleClose={handleClose} />}
            <Box className={classes.google} >
              <span>OR</span>
              <GoogleButton 
                style={{width:"100%",outline:"none"}}
                onClick={signInWithGoogle}
                />

            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}