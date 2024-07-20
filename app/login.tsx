import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ILLStarted from "@/assets/images/started.svg";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Colors, fonts } from "@/constants";
import { configureGoogleSignIn } from "@/config";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { authSocial } from "@/store/reducers/authSlice";
import { AppDispatch } from "../store/index";
import { storageStoreData } from "@/utils";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const dispatch = useDispatch<AppDispatch>();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        let response = await dispatch(authSocial(userInfo.user)).unwrap();
        if (response) {
          storageStoreData("token", response.access_token);
          storageStoreData("user", response.data);
        }
        //console.log("user info", userInfo.user);
        //console.log(response);
        //console.log(response.access_token);
        router.replace("/home");
      }
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log(error);
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log(error);
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            console.log(error);
            break;
          default:
            // some other error happened
            console.log(error);
        }
      } else {
        console.log(error);
        // an error that's not related to google sign in occurred
      }
      console.log(error);
    }
  };

  const logout = async () => {
    console.log("logout");
    await GoogleSignin.signOut();
  };

  return (
    <View style={styles.pages}>
      <View style={styles.imageContainer}>
        <ILLStarted height={170} />
      </View>
      <Text style={styles.title}>
        Your Ultimate{" "}
        <Text style={{ color: Colors.PRIMARY }}>
          Community Business Directory
        </Text>{" "}
        App
      </Text>
      <Text style={styles.description}>
        Find your favorite business near you and post your own business to your
        community
      </Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: 20,
  },
  imageContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: fonts.primary.bold,
    marginBottom: 10,
    color: Colors.light.text,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: fonts.primary.regular,
    marginBottom: 15,
    color: Colors.light.text_muted,
  },
});
