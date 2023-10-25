import { useEffect, useState } from 'react';
import RevolutCheckout from '@revolut/checkout'
import { useLocation } from 'react-router-dom';
import { getData } from "country-list";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, InputAdornment, FormControl, InputLabel, Input, Container, MenuItem, TextField, Grid } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import revolutService from '../../services/revolutService';

const theme = createTheme();

const initAddr = { countryCode: '', region: '', city: '', postcode: '', streetLine1: '', streetLine2: '' };

const CheckoutPage = () => {
    // Use Location
    const location = useLocation();

    // States
    const [price, setPrice] = useState(0);
    const [billingAddr, setBillingAddr] = useState(initAddr);
    const [shippingAddr, setShippingAddr] = useState(initAddr);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setPrice(params.get("price"));
    }, []);

    const checkout = async () => {
        revolutService.createOrder({
            amount: price,
            currency: "GBP"
        }).then(res => {
            const publicId = res.data.public_id;
            RevolutCheckout(publicId).then((RC) => {
                RC.payWithPopup({
                    name: "",
                    email: "",
                    phone: "",
                    locale: "",
                    savePamentMethodFor: "",
                    billingAddress: billingAddr,
                    shippingAddress: shippingAddr,
                    onSuccess() {
                        window.alert("Thank you!");
                    },
                    onError(message) {
                        console.log(message);
                        window.alert("Oh no :(");
                    },
                    onCancel() {

                    },
                });
            });

        }).catch(err => {
            console.log("rev-err", err);
        });

    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" >
                    <Box sx={{ '& > :not(style)': { m: 2 } }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-name">Name</InputLabel>
                                    <Input
                                        id="input-name"
                                        startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-email">Email</InputLabel>
                                    <Input
                                        id="input-email"
                                        startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
                                    />
                                </FormControl>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-phone">Phone</InputLabel>
                                    <Input
                                        id="input-phone"
                                        startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
                                    />
                                </FormControl>

                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    name="countryCode"
                                    size='small'
                                    helperText="Please select your Country"
                                    value={billingAddr.countryCode}
                                    onChange={e => setBillingAddr({ ...billingAddr, [e.target.name]: e.target.value })}
                                >
                                    {
                                        getData().map((option, key) =>
                                            <MenuItem key={key} value={option.code}>
                                                {option.name}
                                            </MenuItem>
                                        )
                                    }
                                </TextField>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="input-postcode">Postcode</InputLabel>
                                    <Input
                                        id="input-postcode"
                                        startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
                                        name="postcode"
                                        value={billingAddr.postcode}
                                        onChange={e => setBillingAddr({ ...billingAddr, [e.target.name]: e.target.value })}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        </Grid>
                        <Box>
                            <Button variant="outlined" size='small' onClick={() => checkout()}>Checkout</Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

// export async function getServerSideProps({query, req}) {
//     const baseUrl = `http://${req.headers.host}`;

//     const response = await fetch(`${baseUrl}/api/orders/${query.order}`);
//     const order = response.ok ? await response.json() : null;

//     return {
//         props: {
//             order
//         }
//     };
// }

export default CheckoutPage;
