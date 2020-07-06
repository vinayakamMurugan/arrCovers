import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";


import "./login.css";
import Header from "../components/header.js";
import Footer from "../components/footer.js";
import { getAPIToken, allowedDomains } from "../components/utils";

const useStyles = makeStyles(theme => ({

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },

  google: {
    margin: theme.spacing(0, 0, 0,"60"),
    width: "60%",
    fontSize: "1.2rem !important",
  }
}));

export const signOut= ()=>{
  const auth2 = window.gapi.auth2.getAuthInstance()
  if (auth2 != null) {
    auth2.signOut().then(
      auth2.disconnect()
      .then(()=>{console.log("logout sucessfull")})
      .catc((e)=>{console.log("error",e);
      })
    )
  }
  else {
     this.props.onLogoutFailure()
  }
}
export default function LoginTab() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setlogin] = useState(false);
  const [type, settype] = useState("ks");
  const [message, setmessage] = useState("welocme to login");
  const [img, setimg] = useState("");
  const [userName, setuserName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const history = useHistory();
  useEffect(() => {
    // sessionStorage.setItem("isLogin",JSON.stringify(login));
    console.log("if runs login sucess", login, type, message);
    // validate();
  }, [login]);


  const successGoogle = res => {
        let token="";
        let userObject="";
             token = res.tokenObj.access_token;
            sessionStorage.setItem("isLogin", JSON.stringify(token));
            setEmail(res.profileObj.email);
            setuserName(res.profileObj.name);
            setimg(res.profileObj.imageUrl);
            userObject = {
                email: res.profileObj.email,
                name: res.profileObj.name,
                img: res.profileObj.imageUrl
            }
            sessionStorage.setItem("user", JSON.stringify(userObject))
            history.push('/search');
            
            
    };
    



  const failureGoogle = res => {
    console.log(res);
    history.push("/");
  };

  return (
    <div className="loginContainer">
      <Header style="loginMenu"></Header>

      <div className="login_main">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              
              <GoogleLogin
                clientId="773843622031-ag9090evuqqmapej0p1lqdg6t2gudnu6.apps.googleusercontent.com"
                buttonText="Login with Google"
                className={classes.google}
                onSuccess={successGoogle}
                onFailure={failureGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </form>
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}
