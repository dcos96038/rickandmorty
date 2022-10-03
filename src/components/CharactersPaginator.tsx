import React from "react";
import {View, Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  page: string;
  lastPage: boolean;
  firstPage: boolean;
  onClick: (type: string) => void;
}

const CharactersPaginator = ({page = "1", lastPage = false, firstPage = false, onClick}: Props) => {
  return (
    <View className="absolute border-[#02B0C9] bg-[#141924] flex-row items-center justify-around w-8/12 border-2 rounded-lg h-14 bottom-8">
      <View className="w-10">
        <TouchableOpacity
          activeOpacity={0.5}
          className={`${firstPage ? "hidden" : null}`}
          onPress={() => onClick("prev")}
        >
          <Icon color="#02B0C9" name="arrow-back-circle-outline" size={40} />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-semibold text-white">Pagina: {page}</Text>
      <View className="w-10">
        <TouchableOpacity
          activeOpacity={0.5}
          className={`${lastPage ? "hidden" : null}`}
          onPress={() => onClick("next")}
        >
          <Icon color="#02B0C9" name="arrow-forward-circle-outline" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CharactersPaginator;
