import {createStackNavigator} from "@react-navigation/stack";
import React, {useContext} from "react";

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
