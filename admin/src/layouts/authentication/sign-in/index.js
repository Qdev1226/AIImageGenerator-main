import { useState, useEffect, useRef } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// react-redux
import { useSelector, useDispatch } from 'react-redux'

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import * as EmailValidator from 'email-validator';
import CustomSnackbar from "components/MDSnackbar/customSnackbar"

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// sign in action
import { signin } from "actions/authAction";

function Basic() {
  // use snackbar for notification
  const snapbarRef = useRef();

  // use navigate for link
  const navigate = useNavigate();

  // use redux
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  // set handles
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVaildEmail, setIsVaildEmail] = useState(true);
  const [isVaildPassword, setIsVaildPassword] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") 
      setIsVaildPassword(false);
    else 
      setIsVaildPassword(true);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (EmailValidator.validate(e.target.value)) 
      setIsVaildEmail(true);
    else 
      setIsVaildEmail(false);
  }

  const handleLogin = () =>  {
    if (email === "" || !EmailValidator.validate(email)) {
      setIsVaildEmail(false);
      return;
    }

    if (password === "" || password.length < 8) {
      setIsVaildPassword(false);
      return;
    }

    const formData = {
      email: email,
      password: password 
    };

    dispatch(signin(formData, snapbarRef)).then(() => {
      navigate('/dashboard');
    });
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth onChange={handleEmailChange} error={!isVaildEmail}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" fullWidth onChange={handlePasswordChange} error={!isVaildPassword}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <CustomSnackbar ref={snapbarRef} />
    </BasicLayout>
  );
}

export default Basic;
