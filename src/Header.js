import React ,{ useState, useEffect} from 'react';
import './Header.css';
import { auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import Card from './Card';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  

function Header() {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged((authUser) => {
          if (authUser){
            // User has logged in..
            console.log(authUser);
            setUser(authUser);
          }
          else{
            // Logged out
            setUser(null);
          }
        })
        return () => {
          // perform unsubscribe...
          unsubscribe();
        }
      }, [user]);

    const signUp = (event) =>{
        event.preventDefault();
    
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) =>{
          return authUser.user.updateProfile({
         
          })
        })
        .catch((error) => alert(error.message));
    
      setOpen(false);
      };
    
      const signIn = (event) => {
        event.preventDefault();
    
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error) => alert(error.message))
    
        setOpenSignIn(false);
      };
    
    
      return (
        <div className='header'>
         
           <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
               <center>
                 <h2 className='header__signup'>SIGNUP PAGE</h2>
               </center>
                <Input placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}></Input>
    
                <Input placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Input>
    
                <Input placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Input>
    
                <Button type="submit" onClick={signUp}>Sign Up</Button>
          
          
            </form>
              
            </div>
          </Modal>
    
          <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
            
            <form className="app__signup">
                <center>
                    <h2>LOGIN PAGE</h2>
                </center>
              
               
                <Input placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Input>
    
                <Input placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Input>
    
                <Button type="submit" onClick={signIn}>Sign In</Button>
          
          
            </form>
              
            </div>
          </Modal>
    
          <div className="app__header">
           
    
            {user ? ( <Button onClick={() => auth.signOut()}>Log Out</Button>):
                  (
                    <div className="app__loginContainer">
                      <Button className='header__signup' onClick={() => setOpen(true)}>Sign Up</Button>
                      <Button className='header__login' onClick={() => setOpenSignIn(true)}>Sign In</Button>
                  </div>
                  )}
          </div>
           
        </div>
    )
}

export default Header;
