import {StackScreenProps} from "@react-navigation/stack";
import React from "react";
import {Image, View} from "react-native";

import InfiniteList from "../components/InfiniteList";
import useGetCharacters from "../hooks/useGetCharacters";
import {CharactersStackParams} from "../navigators/CharactersNavigator";

import LoadingScreen from "./LoadingScreen";

interface Props extends StackScreenProps<CharactersStackParams, "Home"> {}

const HomePage = ({}: Props) => {
  const {loading} = useGetCharacters();

  if (loading) return <LoadingScreen />;

  return (
    <View className="bg-[#212125] items-center min-h-screen">
      <Image
        className="h-[300] w-[250] left-0 bottom-0 absolute opacity-10"
        source={require("../assets/rickmorty.png")}
      />
      <InfiniteList />
    </View>
  );
};

export default HomePage;
