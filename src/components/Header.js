import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthModal from '../Authentication/AuthModal';
import { CryptoState } from '../CryptoContext';
import UserSidebar from './UserSidebar';

const useStyle=makeStyles(()=> ({
    title:{
        flex:1,
        color: "#00897b ",
        fontFamily:"Montserrat",
        fontWeight:"bold",
        cursor: "pointer",

    }
}))
const Header = () => {
    const classes =useStyle();
    const history=useHistory();
    const {user,currency,setCurrency}=CryptoState();
    console.log(currency)
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:'#fff'
            },
            type:"dark",
        }
    })
  return <div>
    <ThemeProvider theme={darkTheme}>

     <AppBar color='transparent' position='static' >
         <Container>
             <Toolbar>
                 <Typography
                 onClick={()=>history.push("/")} 
                 className={classes.title} 
                 variant="h6">
                     CryptoManiac.</Typography>
                 <Select 
                 variant='outlined'
                 style={{
                     width: 100,
                     height:40,
                     marginRight:15,
                    }} 
                    value={currency}
                    onChange={(e)=>setCurrency(e.target.value)}
                    >
                     <MenuItem value={"USD"} >USD</MenuItem>
                     <MenuItem value={"INR"} >INR</MenuItem>
                 </Select>
                 {user ? <UserSidebar/>:<AuthModal/>}            </Toolbar>
         </Container>

     </AppBar>
     </ThemeProvider>
  </div>;
};

export default Header;
