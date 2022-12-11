import React, { Component, useEffect } from 'react'

import jwt_decode from 'jwt-decode';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
  

interface mystate {
  showLoginButton :boolean;
  user:{
    name:string,
    picture:any,
  }
  response:any
}

interface myProps {
 
}



export default class Facebo extends Component<myProps, mystate> {

  constructor(props:myProps , state:mystate){
    super(props)
    

    this.state ={
      showLoginButton:false,
      response:[],
      user:{
        name:"",
        picture:"",
      }
     
    }
  }
 

  render() {
 
 
   const failureHandler = (res: any) => {
    console.log("login failed", res);

  };
    const responseFacebook = (response: any) => {
      console.log("Encoded JWT ID token: " + response.data);
      console.log(response);
      var userObject:any = jwt_decode(response)
      console.log("data",response.data)
      this.setState(response.data)
      // console.log("userobj",userObject)
    };

   
    return  (
      <div>   <FacebookLogin
        appId="700528534730355"
        callback={responseFacebook}
        onFailure={failureHandler}
        render={(renderProps) => (
          <button
            className="btn button btn-outline"
            onClick={renderProps.onClick}
          >  
                 Sign up with Facebook
          </button>
          
          )}
          />
       {this.state.user && <div>
    <h3>{this.state.user.name}</h3>
      </div>}
          {
            this.state.response.map((data:any)=>{
              <h1></h1>
            })
          }
      </div>
    )
  }
}
