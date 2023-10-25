import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useGoogleLogin } from "@react-oauth/google";
// import FacebookLogin from 'react-facebook-login';

import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, FormHelperText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import googleService from '../../services/googleService';
import { signin, signinGoogle } from "../../actions/authAction"
import Copyright from '../../components/Copyright';
import './signin.scss';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function SignIn() {
    // Use Navigate
    const navigate = useNavigate()

    // Use Google Login

    // Use Redux
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    // States
    const initialState = { email: '', password: '' };
    const [formData, setFormData] = useState(initialState);

    // Form update by user
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Do login action by user.
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signin(formData)).then(() => {
            setFormData(initialState);
            navigate("/create");
        });
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            googleService.getUserInfo(tokenResponse.access_token).then((res) => {
                const data = res.data;

                dispatch(signinGoogle(data)).then((res) => {
                    console.log("signinGoogle-then", res);
                    navigate("/create");
                }).catch(err => {
                    console.log("signinGoogle-catch", err)
                });
            }).catch((err) => {
                console.log(err);
            })
        },
    });

    return (
        // <div className="login-form">
        //     <div className="login">
        //         <h1>Login</h1>
        //         <form method="post">
        //             <input type="text" name="u" placeholder="Username" required="required" />
        //             <input type="password" name="p" placeholder="Password" required="required" />
        //             <button type="submit" className="btn btn-primary btn-block btn-large">Let me in.</button>
        //         </form>
        //     </div>
        // </div>
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            value={formData.email}
                            error={(auth.error && auth.error?.email)}
                            autoFocus
                        />
                        {
                            (auth.error && auth.error?.email) &&
                            <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{auth.error.email}</FormHelperText>
                        }
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            value={formData.password}
                            error={(auth.error && auth.error.password)}
                        />
                        {
                            (auth.error && auth.error.password) &&
                            <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{auth.error.password}</FormHelperText>
                        }
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to={``}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                &nbsp;
                            </Grid>
                            <Grid item>
                                <Link to={`/signup`}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                    variant="outlined"
                                    color="secondary"
                                    endIcon={<GoogleIcon />}
                                    onClick={() => loginWithGoogle()}
                                >
                                    Continue with Google
                                </Button >
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    sx={{ mt: 3, mb: 2 }}
                                    variant="outlined"
                                    color="error"
                                    endIcon={<FacebookIcon />}
                                >
                                    Continue with Facebook
                                </Button >
                            </Grid> */}
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}