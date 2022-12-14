import React from "react";
import {Image, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import {Character} from "../interfaces/charactersInterface";
import {CharactersStackParams} from "../navigators/CharactersNavigator";

interface Props {
  character: Character;
}

const CharacterCard = ({character}: Props) => {
  const navigation = useNavigation<StackNavigationProp<CharactersStackParams, "Detail">>();

  const hex2rgba = (hex: any, alpha = 0.8) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x: any) => parseInt(x, 16));

    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <View
      className="h-[250] w-[150] p-1 m-4 rounded-lg border-1 drop-shadow-xl"
      style={{backgroundColor: hex2rgba("#02B0C9")}}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{height: "100%"}}
        onPress={() => navigation.navigate("Detail", {character: character})}
      >
        <Image className="min-w-full rounded-t-lg h-28" source={{uri: character.image}} />
        <Text className="text-lg font-semibold text-white">{character.name}</Text>
        <View className="justify-end flex-1 p-1">
          <View className="flex-row items-center mt-4">
            <Icon
              color={
                character.status === "Alive"
                  ? "green"
                  : character.status === "Dead"
                  ? "red"
                  : "white"
              }
              name="circle"
              size={15}
            />
            <Text className="font-semibold text-white text-md">
              {" "}
              {character.status.toUpperCase()}
            </Text>
          </View>
          <View className="flex-row items-center mt-1">
            <Icon color="black" name="person" size={15} />
            <Text className="font-semibold text-white text-md">
              {" "}
              {character.species.toUpperCase()}
            </Text>
          </View>
          <View className="flex-row items-center mt-1">
            <IonIcons
              color="black"
              name={
                character.gender === "Male"
                  ? "male"
                  : character.gender === "Female"
                  ? "female"
                  : "help"
              }
              size={15}
            />
            <Text className="font-semibold text-white text-md">
              {" "}
              {character.gender.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CharacterCard;
