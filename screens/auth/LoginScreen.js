import React, { useState } from "react";
import {
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
import { styles } from "./AuthStyles";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPassActive, setIsPassActive] = useState(false);
  const [state, setState] = useState(initialState);

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
            >
              <Text style={styles.headerLogin}>Увійти</Text>
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.textRedirect}>
                  Не маєте акаунта? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        {/* <StatusBar style="auto" /> */}
      </View>
    </TouchableWithoutFeedback>
  );
};
