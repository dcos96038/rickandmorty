import React from "react";
import {ActivityIndicator, View} from "react-native";

const LoadingScreen = () => {
  return (
    <View className="items-center justify-center flex-1">
      <ActivityIndicator color="black" size={50} />
    </View>
  );
};

export default LoadingScreen;
