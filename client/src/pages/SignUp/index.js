import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, FormHelperText } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { signup } from "../../actions/authAction"
import Copyright from '../../components/Copyright';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

export default function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    // States
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(signup(formData)).then(() => {
            setFormData(initialState);
            navigate("/create");
        });
    }

    return (
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                    autoFocus
                                    error={(auth.error && auth.error.firstName)}
                                />
                                {
                                    (auth.error && auth.error.firstName) &&
                                    <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{auth.error.firstName}</FormHelperText>
                                }

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                    error={(auth.error && auth.error.lastName)}
                                />
                                {
                                    (auth.error && auth.error.lastName) &&
                                    <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{auth.error.lastName}</FormHelperText>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    error={(auth.error && auth.error.email)}
                                />
                                {
                                    (auth.error && auth.error.email) &&
                                    <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{auth.error.email}</FormHelperText>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    error={(auth.error && auth.error.password)}
                                />
                                {
                                    (auth.error && auth.error.password) &&
                                    <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{auth.error.password}</FormHelperText>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="ConfirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                    error={(auth.error && auth.error.confirmPassword)}
                                />
                                {
                                    (auth.error && auth.error.confirmPassword) &&
                                    <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{auth.error.confirmPassword}</FormHelperText>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item color="deepPurple">
                                <Link to={"/signin"}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}