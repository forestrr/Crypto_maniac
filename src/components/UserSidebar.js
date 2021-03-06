import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Avatar, Button } from "@material-ui/core";
import { CryptoState } from "../CryptoContext";
import { signOut} from "@firebase/auth"
import { auth, db } from "./firebase";
import { numberWithCommas } from "./Coinstable";
import {AiFillDelete} from "react-icons/ai"
import { doc, setDoc } from "firebase/firestore";

const useStyles = makeStyles({
  container: {
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#EBB81A",
    objectFit: "contain",
  },
  logout: {
      height: "8%",
      width: "100%",
      backgroundColor: "#EBB81A",
      marginTop:20,
  },
  watchlist: {
      flex: 1,
      width: "100%",
      backgroundColor:"grey",
      borderRadius:10,
      padding:15,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      overflowY: "scroll",
      paddingTop:10,
  },
  coin: {
    padding: 10,
    borderRadius:5,
    color: "black",
    width:"100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EBB81A",
    boxShadow: "0 0 3px black",
  }
});

export default function UserSidebar() {
  const classes = useStyles();
  const { user,setAlert,watchlist,coins,symbol} = CryptoState();
  const [state, setState] = React.useState({
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchList=async (coin)=>{
    const coinRef = await doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch)=>watch!==coin?.id),
      },{merge:"true"} );
      setAlert({
        open: true,
        message: `${coin.name} removed from the watchlist`,
        type: "error",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }
  const Logout=()=>{
    signOut(auth);
    setAlert({
        open: true,
        message:"Logged Out Successfully", 
        type:"success"});
        toggleDrawer();
  }

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#EBB81A",
            }}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    fontSize: 20,
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist} >
                    <span style={{fontSize:15 ,textShadow:"0 0 5px black" }} >
                        Watchlist
                    </span>
                    {
                      coins.map((coin)=>{
                        if(watchlist.includes(coin.id))
                        return (
                           <div className={classes.coin} >
                          <span>{coin.name}</span>
                          <span style={{display:"flex",gap:8}} >
                             {symbol}
                             {numberWithCommas(coin.current_price.toFixed(2) )} 
                              <AiFillDelete 
                              style={{cursor:"pointer",color:"red"}}
                              fontsize="20"
                               onClick={()=>removeFromWatchList(coin)}
                              /> 
                               </span>
                        </div>)
                      })
                    }

                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={Logout}
              >Logout</Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
