import {StackScreenProps} from "@react-navigation/stack";
import React, {useContext, useEffect} from "react";
import {Alert, Keyboard, Text, TouchableOpacity, View} from "react-native";
import {ScrollView, TextInput} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import Logo from "../components/Logo";
import {AuthContext} from "../context/AuthContext";
import {useForm} from "../hooks/useForm";
import {RootStackParams} from "../navigators/StackNavigator";

interface Props extends StackScreenProps<RootStackParams, "Login"> {}

const LoginScreen = ({}: Props) => {
  const {email, password, onChange} = useForm({
    email: "",
    password: "",
  });
  const {signIn, errorMsg, removeError} = useContext(AuthContext);

  useEffect(() => {
    if (errorMsg.length === 0) return;
    Toast.show({type: "error", text1: "Login incorrecto", text2: errorMsg});
  }, [errorMsg, removeError]);

  const onLogin = () => {
    signIn({email, password});
    Keyboard.dismiss();
  };

  return (
    <ScrollView className="flex-1 bg-[#212125]">
      <View className="items-center justify-center min-h-screen">
        <Logo />

        <View>
          <Text className="text-xl font-semibold text-white">Email</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            className="px-2 text-lg text-black border-2 bg-gray-100 border-[#02B0C9] rounded-xl w-[250] my-2"
            keyboardType="email-address"
            placeholder="Ingresar email"
            placeholderTextColor="black"
            value={email}
            onChangeText={(value) => onChange(value, "email")}
          />

          <Text className="text-xl font-semibold text-white">Contraseña</Text>

          <TextInput
            secureTextEntry
            className="px-2 text-lg text-black border-2 bg-gray-100 border-[#02B0C9] rounded-xl w-[250] my-2"
            placeholder="Ingresar contraseña"
            placeholderTextColor="black"
            value={password}
            onChangeText={(value) => onChange(value, "password")}
            onSubmitEditing={onLogin}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-6 bg-[#02B0C9] rounded-3xl h-[50] items-center justify-center"
            onPress={onLogin}
          >
            <Text className="text-xl font-bold text-white">Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default LoginScreen;
