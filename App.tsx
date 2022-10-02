import "react-native-gesture-handler";

import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";

import {StackNavigator} from "./src/navigators/StackNavigator";
import {AuthProvider} from "./src/context/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
