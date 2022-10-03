import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React, {useContext} from "react";
import {Image, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

import {AuthContext} from "../context/AuthContext";
import ProfileScreen from "../screens/ProfileScreen";

import {CharactersNavigator} from "./CharactersNavigator";

export type DrawerParams = {
  Characters: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParams>();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen component={CharactersNavigator} name="Characters" />
      <Drawer.Screen component={ProfileScreen} name="Profile" />
    </Drawer.Navigator>
  );
};

const MenuContent = ({navigation}: DrawerContentComponentProps) => {
  const {logout} = useContext(AuthContext);

  return (
    <DrawerContentScrollView style={{backgroundColor: "rgba(55,65,81, 0.9)"}}>
      <View className="items-center flex-1 m-3">
        <Image
          className="w-[120] h-[120] rounded-full"
          source={require("../assets/Portrait_Placeholder.png")}
        />
      </View>

      <View className="flex-1 mt-3">
        <TouchableOpacity
          activeOpacity={0.5}
          className="flex-row items-center px-5 py-4 border-b-2 border-[#02B0C9]"
          onPress={() => navigation.navigate("Characters")}
        >
          <Icon color="white" name="body" size={30} />
          <Text className="ml-5 text-xl font-semibold text-[#02B0C9]">Personajes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          className="flex-row items-center px-5 py-4 border-b-2 border-[#02B0C9]"
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon color="white" name="person-circle" size={30} />
          <Text className="ml-5 text-xl font-semibold text-[#02B0C9]">Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          className="flex-row items-center px-5 py-4 border-b-2 border-[#02B0C9]"
          onPress={() => logout()}
        >
          <Icon color="white" name="exit-outline" size={30} />
          <Text className="ml-5 text-xl font-semibold text-[#02B0C9]">Salir</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
