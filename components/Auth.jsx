import React from "react";
// cakra
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";


const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth() || {}

  const handleAuth = async () => {

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <Box position={"fixed"} top="5%" mt={10} right="5%">
      <Button onClick={() => toggleColorMode()}>
        {colorMode == "dark" ? <FaSun /> : <FaMoon />}
      </Button>{" "}

      {isLoggedIn && (
        <>
          <Text color="#DD6B20" fontSize={30}>{user.email}</Text>
          <Link color="#975A16" fontSize={25} onClick={() => auth.signOut()}>
            Logout
          </Link>
        </>
      )}

      {!isLoggedIn && (
        <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
          Login with Google
        </Button>
      )}
    </Box>
  );
};

export default Auth;