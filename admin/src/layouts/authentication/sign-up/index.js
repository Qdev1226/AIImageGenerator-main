// react components
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// Email validator
import * as EmailValidator from 'email-validator';

// Sign up action
import { signup } from "actions/authAction";

function Cover() {
  // use snackbar for notification
  const snapbarRef = useRef();

  // use navigate for link
  const navigate = useNavigate();

  // use redux
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // set handles
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVaildEmail, setIsVaildEmail] = useState(true);
  const [isVaildName, setIsVaildName] = useState(true);
  const [isVaildPassword, setIsVaildPassword] = useState(true);
  const [isVaildConfirmPassword, setIsVaildConfirmPassword] = useState(true);

  // handle events
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") 
      setIsVaildPassword(false);
    else 
      setIsVaildPassword(true);
  }

  const handlePasswordConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === "") 
      setIsVaildConfirmPassword(false);
    else 
      setIsVaildConfirmPassword(true);
  }
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (EmailValidator.validate(e.target.value)) 
      setIsVaildEmail(true);
    else 
      setIsVaildEmail(false);
  } 

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value === "") 
      setIsVaildName(false);
    else 
      setIsVaildName(true);
  }

  const handleSignUp = () =>  {
    if (name === "") {
      setIsVaildName(false);
      return;
    }

    if (email === "" || !EmailValidator.validate(email)) {
      setIsVaildEmail(false);
      return;
    }

    if (password === "" || confirmPassword === "" || password !== confirmPassword) {
      setIsVaildPassword(false);
      setIsVaildConfirmPassword(false);
      return;
    }

    const formData = {
      name: name, 
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };

    dispatch(signup(formData, snapbarRef)).then(() => {
      navigate('/dashboard');
    });
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin Sign Up
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={2} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth required onChange={handleNameChange} error={!isVaildName} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth required onChange={handleEmailChange} error={!isVaildEmail}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth required onChange={handlePasswordChange} error={!isVaildPassword} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Confirm Password" variant="standard" fullWidth required onChange={handlePasswordConfirmChange} error={!isVaildConfirmPassword} />
            </MDBox>
           
            <MDBox mt={2} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => handleSignUp()}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={2} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

      <CustomSnackbar ref={snapbarRef} />
    </CoverLayout>
  );
}

export default Cover;
