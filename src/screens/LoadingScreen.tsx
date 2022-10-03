import React from "react";
import {ActivityIndicator, View} from "react-native";

const LoadingScreen = () => {
  return (
    <View className="items-center bg-[#212125] justify-center flex-1">
      <ActivityIndicator color="green" size={50} />
    </View>
  );
};

export default LoadingScreen;
