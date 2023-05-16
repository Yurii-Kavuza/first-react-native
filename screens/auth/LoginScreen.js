import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = (props) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPassActive, setIsPassActive] = useState(false);
  const [state, setState] = useState(initialState);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const hideKeyboard = () => Keyboard.dismiss();
  const onFocus = (value) => {
    setIsKeyboardShown(true);
    value(true);
  };
  const onBlur = (value) => {
    setIsKeyboardShown(false);
    value(false);
  };
  const onPress = () => {
    hideKeyboard();
    console.log(state);
    setState(initialState);
  };

  const changeInputColor = (value) => {
    return { ...styles.input, borderColor: value ? "#ff6c00" : "#e8e8e8" };
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBG}
          source={require("../../assets/images/PhotoBG-min.png")}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.formContainer,
                marginBottom: isKeyboardShown ? -142 : 0,
              }}
              onLayout={onLayoutRootView}
            >
              <Text style={styles.text}>Увійти</Text>
              <View style={styles.form}>
                <View>
                  <TextInput
                    onFocus={() => onFocus(setIsEmailActive)}
                    onBlur={() => onBlur(setIsEmailActive)}
                    style={changeInputColor(isEmailActive)}
                    placeholder="Адреса електронної пошти"
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    onFocus={() => onFocus(setIsPassActive)}
                    onBlur={() => onBlur(setIsPassActive)}
                    style={changeInputColor(isPassActive)}
                    secureTextEntry={true}
                    placeholder="Пароль"
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={onPress}
                >
                  <Text style={styles.buttonTitle}>Увійти</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.textRedirect}>
                Не маєте акаунта? Зареєструватися
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        {/* <StatusBar style="auto" /> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBG: {
    flex: 1,
    flexDirection: "column",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  text: {
    alignSelf: "center",
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 1,
    color: "#212121",
  },
  form: {
    marginHorizontal: 32,
    marginBottom: 16,
    gap: 16,
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f6f6f6",
    color: "#bdbdbd",
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
  },
  buttonTitle: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  textRedirect: {
    marginBottom: 45,
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
