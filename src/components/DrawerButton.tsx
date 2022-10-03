import React from "react";
import {View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  openDrawer: () => void;
}

const DrawerButton = ({openDrawer}: Props) => {
  return (
    <View className="absolute z-50 p-1 bg-gray-700 border-2 border-gray-700 rounded-lg left-3 top-3 drop-shadow-2xl">
      <TouchableOpacity activeOpacity={0.8} className="items-center" onPress={() => openDrawer()}>
        <Icon color="#02B0C9" name="menu-outline" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerButton;
