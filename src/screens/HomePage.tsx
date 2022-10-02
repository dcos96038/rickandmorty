import React, {useEffect, useState} from "react";
import {FlatList, Image, Text, View} from "react-native";

import rymApi from "../api/rymApi";
import CharacterCard from "../components/CharacterCard";
import {Character, CharactersResponse} from "../interfaces/charactersInterface";

const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>();

  useEffect(() => {
    rymApi
      .get<CharactersResponse>("/character")
      .then((characters) => setCharacters(characters.data.results));
  }, []);

  return (
    <View className="bg-[#212125] items-center min-h-screen p-2">
      <Image
        className="h-[300] w-[250] left-0 bottom-0 absolute opacity-10"
        source={require("../assets/rickmorty.png")}
      />
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
        keyExtractor={(character) => character.id.toString()}
        numColumns={2}
        renderItem={({item}) => <CharacterCard character={item} />}
      />
    </View>
  );
};

export default HomePage;
