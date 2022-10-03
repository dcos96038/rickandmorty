import React from "react";
import {FlatList, Image, View} from "react-native";

import useGetCharacters from "../hooks/useGetCharacters";

import CharacterCard from "./CharacterCard";

const InfiniteList = () => {
  const {charactersList: characters, loading, getCharacters} = useGetCharacters();

  return (
    <View className="flex-1">
      <FlatList
        ListHeaderComponent={() => (
          <View className="items-center">
            <Image
              className="h-[100] w-[250] justify-center"
              source={require("../assets/logo.png")}
            />
          </View>
        )}
        data={characters}
        keyExtractor={(character, i) => character.id.toString() + i}
        numColumns={2}
        renderItem={({item}) => <CharacterCard character={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (!loading) {
            getCharacters();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default InfiniteList;
