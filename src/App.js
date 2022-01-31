import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Alert from './components/Alert';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';

function App() {
  const useStyle=makeStyles(()=>({
    App:{
      backgroundColor:'#14161a',
      color:'white',
      minHeight:'100vh'
    }
  }))
  const classes =useStyle()
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={Coinpage} />
      </div>
      <Alert/>
    </BrowserRouter>
  );
}

export default App;
