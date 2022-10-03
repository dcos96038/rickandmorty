import {StackScreenProps} from "@react-navigation/stack";
import axios, {AxiosResponse} from "axios";
import React, {useEffect, useState} from "react";
import {Text, View, ScrollView, Image, Dimensions, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import {EpisodeResponse} from "../interfaces/charactersInterface";
import {CharactersStackParams} from "../navigators/CharactersNavigator";

import LoadingScreen from "./LoadingScreen";

interface Props extends StackScreenProps<CharactersStackParams, "Detail"> {}

const width = Dimensions.get("screen").width;

const DetailScreen = ({route}: Props) => {
  const [loadingDetails, setLoadingDetails] = useState(true);
  const character = route.params.character;
  const [episodes, setEpisodes] = useState<AxiosResponse<EpisodeResponse, any>[]>([]);

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
      <ScrollView className={`min-h-screen w-[${width}] bg-[#212125]`}>
        <Text className="mt-5 text-2xl font-bold text-center text-white">{character?.name}</Text>
        <View className="items-center mt-5">
          <Image
            className="w-[250] h-[250] rounded-full bottom-[8] right-2"
            source={{uri: character.image}}
          />
        </View>
        <View className="p-2 m-4 bg-gray-600 rounded-lg shadow-2xl drop-shadow-3xl ">
          <View className="flex-row">
            <Text className="text-md font-semibold w-[100] text-white">Estado: </Text>
            <Text
              className={`text-md font-semibold ${
                character.status === "Alive" ? "text-green-700" : "text-red-700"
              }`}
            >
              {character.status}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="text-md font-semibold w-[100] text-white">Especie: </Text>
            <Text className="font-semibold text-white text-md">{character.species}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-md font-semibold w-[100] text-white">Genero: </Text>
            <Text className="font-semibold text-white text-md">{character.gender}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-md font-semibold w-[100] text-white">Origen: </Text>
            <Text className="font-semibold text-white text-md">{character.origin.name}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-md font-semibold w-[100] text-white">Location: </Text>
            <Text className="font-semibold text-white text-md">{character.location.name}</Text>
          </View>
        </View>

        <View className="pb-4 m-4 bg-gray-600 rounded-lg drop-shadow-3xl">
          <Text className="px-6 my-3 text-xl font-semibold text-white">Episodios: </Text>
          {episodes.map((episode) => (
            <View key={episode.data.id} className="flex-row items-center px-6 my-1">
              <Icon color="green" name="chevron-forward-outline" size={20} />
              <Text className="font-semibold text-white text-md">{episode.data.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="my-5" />
    </>
  );
};

export default DetailScreen;
