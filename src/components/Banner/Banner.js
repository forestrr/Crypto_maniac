import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from './Carousel';

const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner2.jpg)",
    },
    bannercontent:{
        height:400,
        display:"flex",
        flexDirection:"column",
        paddingTop:25,
        JustifyContent:"space-around"
        
        
    },tagline:{
        display: "flex",
        height: "40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:'center',
    }
    
}))

const Banner = () => {
    const classes=useStyles()
    
          return  <div className={classes.banner} >
              <Container className={classes.bannercontent} >
        <div className={classes.tagline}>
            <Typography 
            variant="h2"
            style={{
                color:"white",
                fontWeight:"bold",
                marginBottom:15,
                fontFamily:"Montserrat"
            }}>
                CryptoManiac.
            </Typography>
            <Typography
            variant="subtitle2"
            style={{
                color:"darkgrey",
                textTransform:"capitalize",
                fontFamily:"Montserrat"
            }}>
                Get All information about your favourite Crypto 
            </Typography>

        </div>   
        <Carousel/>
      </Container>
  </div>
};

export default Banner;
