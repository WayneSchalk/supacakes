import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import Input from "../../components/common/Input";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import * as authActions from "../../store/actions/authActions";
import { useDispatch } from "react-redux";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("Oops... something went wrong.", error.message, [
        { text: "Okay" },
      ]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Shop");
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={["#ffffff", "#e9e9e9"]} style={styles.gradient}>
        <View style={styles.authContainer}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={require("../../assets/sc6.png")}
              style={styles.image}
            />
          </View>
          <ScrollView>
            <View style={styles.formContainer}>
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="large" color={Colors.Primary} />
                ) : (
                  <Button
                    title={isSignUp ? "Sign Up" : "Login"}
                    color={Colors.Primary}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={`Switch to ${isSignUp ? "Login" : "Sign up"}`}
                  color={Colors.Secondary}
                  onPress={() => {
                    setIsSignUp(!isSignUp);
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerShown: false,
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  gradient: {
    flex: 1,
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    height: "100%",
    paddingHorizontal: 10,
  },
  imageContainer: {
    marginTop: 20,
    height: "40%",
    width: "100%",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },
  formContainer: { height: "60%" },

  buttonContainer: { marginTop: 15 },
});
