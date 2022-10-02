import {createStackNavigator} from "@react-navigation/stack";
import React, {useContext} from "react";

import {AuthContext} from "../context/AuthContext";
import HomePage from "../screens/HomePage";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
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
          <Stack.Screen component={HomePage} name="Home" />
        </>
      )}
    </Stack.Navigator>
  );
};
