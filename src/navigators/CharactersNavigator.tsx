import {createStackNavigator} from "@react-navigation/stack";
import React from "react";

import {Character} from "../interfaces/charactersInterface";
import DetailScreen from "../screens/DetailScreen";
import HomePage from "../screens/HomePage";

export type CharactersStackParams = {
  Home: undefined;
  Detail: {character: Character};
};

const Stack = createStackNavigator<CharactersStackParams>();

export const CharactersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={HomePage} name="Home" />
      <Stack.Screen component={DetailScreen} name="Detail" />
    </Stack.Navigator>
  );
};
