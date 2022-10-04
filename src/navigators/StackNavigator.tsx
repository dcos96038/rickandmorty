import {createStackNavigator} from "@react-navigation/stack";
import React, {useContext, useEffect} from "react";
import SplashScreen from "react-native-splash-screen";

import {AuthContext} from "../context/AuthContext";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";

import {DrawerNavigation} from "./DrawerNavigation";

export type RootStackParams = {
  Login: undefined;
  DrawerNavigation: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const {status} = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (status === "checking") return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {status !== "authenticated" ? (
        <>
          <Stack.Screen component={LoginScreen} name="Login" />
        </>
      ) : (
        <>
          <Stack.Screen component={DrawerNavigation} name="DrawerNavigation" />
        </>
      )}
    </Stack.Navigator>
  );
};
