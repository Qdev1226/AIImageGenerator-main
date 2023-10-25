import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.css';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from './pages/Homepage'
import PricingPage from './pages/PricingPage'
import StudioPage from "./pages/StudioPage";

import Navbar from './components/Navbar';

import store from './store';
import { SIGNOUT } from "./actions/config";
import { loadUser } from "./actions/authAction";
import setAuthToken from "./utils/setAuthToken";

export default function App() {
    useEffect(() => {
        const token = localStorage.getItem('token');

        // Check for token in local storage when app first runs.
        if (token) {
            // If there is a token et axios header for all requests.
            setAuthToken(token)
        }

        // Try to fetch a user, if no token or invalid token we will get a 401 response from our API.
        store.dispatch(loadUser());

        // Log out from all tabs if they log out in one tab.
        window.addEventListener('storage', () => {
            if (!localStorage.token)
                store.dispatch({ type: SIGNOUT });
        })
    }, [])

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div className='App' style={{ backgroundColor: '#1c1c27' }}>
                <Navbar />
                <div className='router'>
                    <Routes>
                        <Route exact path="/" element={<HomePage />}></Route>
                        <Route exact path="/search/:q" element={<HomePage />}></Route>
                        <Route exact path="/signin" element={<SignIn />}></Route>
                        <Route exact path="/signup" element={<SignUp />}></Route>
                        <Route exact path="/create" element={<StudioPage />}></Route>
                        <Route exact path="/pricing" element={<PricingPage />}></Route>
                        {/* <Route exact path="/checkout" element={<CheckoutPage />}></Route> */}
                    </Routes>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}
