import React from 'react';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import Button from "@mui/material/Button";

const SignInButton = () => {
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('User signed in:', result.user);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <Button color="inherit" onClick={handleSignIn}>
            Sign in with Google
        </Button>
    );
};

export default SignInButton;
