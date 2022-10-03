import {StackScreenProps} from "@react-navigation/stack";
import axios, {AxiosResponse} from "axios";
import React, {useEffect, useState} from "react";
import {Text, View, ScrollView, Image, Dimensions, Alert, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import {EpisodeResponse} from "../interfaces/charactersInterface";
import {CharactersStackParams} from "../navigators/CharactersNavigator";

import LoadingScreen from "./LoadingScreen";

interface Props extends StackScreenProps<CharactersStackParams, "Detail"> {}

const DetailScreen = ({route, navigation}: Props) => {
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [episodes, setEpisodes] = useState<AxiosResponse<EpisodeResponse, any>[]>([]);
  const character = route.params.character;

  const getEpisodesData = async () => {
    try {
      if (character === null) return;
      const data = await axios.all(
        character.episode.map((endpoint) => axios.get<EpisodeResponse>(endpoint)),
      );

      setEpisodes(data);
      setLoadingDetails(false);
    } catch (error) {
      Alert.alert("Error", "Error desconocido", [{text: "Ok"}]);
    }
  };

  useEffect(() => {
    getEpisodesData();
  }, [character]);

  if (loadingDetails) return <LoadingScreen />;

  if (character === null)
    return (
      <View className="items-center justify-center min-h-screen">
        <Text className="text-3xl text-black">Error 404</Text>
      </View>
    );

  return (
    <>
      <View className="absolute z-50 p-1 bg-gray-700 border-2 border-gray-700 rounded-lg left-3 top-3 drop-shadow-3xl">
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.pop()}>
          <Icon color="#02B0C9" name="arrow-back-outline" size={30} />
        </TouchableOpacity>
      </View>
      <ScrollView className={`min-h-screen bg-[#212125]`}>
        <View className="items-center mt-5">
          <Image className="w-[250] h-[250] rounded-full" source={{uri: character.image}} />
        </View>
        <Text className="mt-5 text-2xl font-bold text-center text-white">{character?.name}</Text>
        <View className="p-2 m-4 bg-gray-600 rounded-lg drop-shadow-3xl">
          <View className="flex-row items-center gap-2">
            <Icon color="#02B0C9" name="alert-circle-outline" size={25} />
            <Text className="text-xl font-semibold w-[100] text-white">Estado: </Text>
            <Text
              className={`text-xl font-semibold ${
                character.status === "Alive" ? "text-green-700" : "text-red-700"
              }`}
            >
              {character.status}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon color="#02B0C9" name="body-outline" size={25} />

            <Text className="text-xl font-semibold w-[100] text-white">Especie: </Text>
            <Text className="text-xl font-semibold text-white">{character.species}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon
              color="#02B0C9"
              name={character.gender === "Male" ? "male-outline" : "female-outline"}
              size={25}
            />
            <Text className="text-xl font-semibold w-[100] text-white">Genero: </Text>
            <Text className="text-xl font-semibold text-white">{character.gender}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon color="#02B0C9" name="finger-print-outline" size={25} />
            <Text className="text-xl font-semibold w-[100] text-white">Origen: </Text>
            <Text className="text-xl font-semibold text-white">{character.origin.name}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Icon color="#02B0C9" name="location-outline" size={25} />
            <Text className="text-xl font-semibold w-[100] text-white">Location: </Text>
            <Text className="text-xl font-semibold text-white">{character.location.name}</Text>
          </View>
        </View>

        <View className="pb-4 m-4 bg-gray-600 rounded-lg drop-shadow-3xl">
          <View className="flex-row gap-2 px-6 mt-2">
            <Icon color="#02B0C9" name="map-outline" size={30} />
            <Text className="my-3 text-3xl font-semibold text-white">Episodios: </Text>
          </View>
          {episodes.map((episode) => (
            <View key={episode.data.id} className="flex-row items-center px-6 my-1">
              <Icon color="#02B0C9" name="chevron-forward-outline" size={20} />
              <Text className="text-xl font-semibold text-white">{episode.data.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="my-5" />
    </>
  );
};

export default DetailScreen;
