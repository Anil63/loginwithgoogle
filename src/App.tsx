
import { useEffect, useRef, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import Facebo from './Facebo';



interface usertype {
  name:string,
  picture:any | string
}
const defaultdata:usertype  = {
  name:"",
 picture:""
  
}
declare global {
  const google: typeof import('google-one-tap');
}


function App() {
 
  const [ user , setUser] = useState(defaultdata)
 const {name , picture} = user
  const googleButton:any = useRef(null);
  
  useEffect(()=>{
    const elemScript = document.createElement('script'); 
    elemScript.src = "https://accounts.google.com/gsi/client";
    elemScript.async = true;
    elemScript.defer = true;
    document.body.append(elemScript);

    window.onload = function () {
      /*global google*/
      console.log(google)
      google.accounts.id.initialize({
        client_id: "457908389260-easfp40vqjrglp5p7cmphv2ijnaokq15.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        googleButton.current, //this is a ref hook to the div in the official example
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt();
    }

    return () => {
      //I get ride of the <scripts> when the elements is unmounted
      document.body.removeChild(elemScript);
    }
    
  },[])
 
  function handleCredentialResponse(response:any) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject:any = jwt_decode(response.credential);
    setUser(userObject);
    googleButton.current.hidden = true;
  }

  // function handleSignOut(){
  //   setUser(defaultdata);
  //   googleButton.current.hidden= false;
  // }
  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    setUser(defaultdata);
   googleButton.current.hidden= false;
  }

  const responseFacebook = (response:any) => {
    console.log(response);
  }
  return (
    <div className="App">
     <div ref={googleButton}></div>
   <Facebo/>

    
     {Object.keys(user.name).length != 0  && <button onClick={handleSignOut}>Sign out</button> }
     
     {user && <div>
      <img src={picture} ></img>
      <h3>{name}</h3>
      </div>}
    </div>
  );
}

export default App;
