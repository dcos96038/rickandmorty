import {DrawerScreenProps} from "@react-navigation/drawer";
import React, {useContext, useEffect, useState} from "react";
import {View, Text, Alert, TextInput, TouchableOpacity, Keyboard} from "react-native";
import Toast from "react-native-toast-message";

import loginApi from "../api/loginApi";
import DrawerButton from "../components/DrawerButton";
import {AuthContext} from "../context/AuthContext";
import {useForm} from "../hooks/useForm";
import {GetUserResponse, UserData, UserModificationResponse} from "../interfaces/authInterface";
import {DrawerParams} from "../navigators/DrawerNavigation";

import LoadingScreen from "./LoadingScreen";

interface Props extends DrawerScreenProps<DrawerParams, "Profile"> {}

const ProfileScreen = ({navigation}: Props) => {
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const {userId} = useContext(AuthContext);
  const {name, surname, phone, onChange, form, resetForm} = useForm({
    name: "",
    surname: "",
    phone: "",
  });

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const getUserData = async () => {
    try {
      const resp = await loginApi.get<GetUserResponse>(`/user/${userId}`);
      const {data} = resp;

      if (resp.status === 200) {
        setUserData(data.userData);
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener datos del perfil del usuario", [{text: "OK"}]);
    }
  };

  const onSubmit = async () => {
    try {
      const resp = await loginApi.put<UserModificationResponse>(`/user/${userId}`, form);

      if (resp.status === 200) {
        Toast.show({type: "success", text1: "Actualizado", text2: "Perfil actualizado con exito!"});
        setUserData({
          name: resp.data.newUserData.name,
          surname: resp.data.newUserData.surname,
          phone: resp.data.newUserData.phone,
          mail: resp.data.newUserData.mail,
        });
        resetForm();
        Keyboard.dismiss();
      }
    } catch (error: any) {
      Toast.show({type: "error", text1: "Error", text2: error.response.data.message});
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <View className="bg-[#212125] flex-1">
      <DrawerButton openDrawer={openDrawer} />
      <Text className="mt-5 text-3xl text-center text-white">Mi Perfil</Text>
      <View className="items-center mt-10">
        <Text className="self-start mx-10 mb-2 text-xl font-bold text-white">Nombre</Text>
        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          className="w-10/12 px-4 text-lg font-bold text-white border-2 border-[#02B0C9] rounded-md"
          placeholder={userData?.name}
          placeholderTextColor="gray"
          value={name}
          onChangeText={(value) => onChange(value, "name")}
        />
      </View>
      <View className="items-center mt-5">
        <Text className="self-start mx-10 mb-2 text-xl font-bold text-white">Apellido</Text>
        <TextInput
          autoCapitalize="words"
          autoCorrect={false}
          className="w-10/12 px-4 text-lg font-bold text-white border-2 border-[#02B0C9] rounded-md"
          placeholder={userData?.surname}
          placeholderTextColor="gray"
          value={surname}
          onChangeText={(value) => onChange(value, "surname")}
        />
      </View>
      <View className="items-center mt-5">
        <Text className="self-start mx-10 mb-2 text-xl font-bold text-white">Telefono</Text>
        <TextInput
          className="w-10/12 px-4 text-lg font-bold text-white border-2 border-[#02B0C9] rounded-md"
          keyboardType="phone-pad"
          placeholder={userData?.phone}
          placeholderTextColor="gray"
          value={phone}
          onChangeText={(value) => onChange(value, "phone")}
        />
      </View>
      <View className="items-center mt-5">
        <Text className="self-start mx-10 mb-2 text-xl font-bold text-white">Email</Text>
        <TextInput
          className="w-10/12 px-4 text-lg font-bold text-gray-500 border-2 border-[#02B0C9] rounded-md"
          editable={false}
          placeholder="ejemplo@ejemplo.com"
          placeholderTextColor="gray"
          value={userData?.mail}
        />
      </View>

      <View className="items-center mt-10">
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-[300] h-[40] items-center justify-center bg-[#02B0C9] border-2 border-gray-500 rounded-md"
          onPress={onSubmit}
        >
          <Text className="text-lg font-bold text-center text-white">Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

export default ProfileScreen;
