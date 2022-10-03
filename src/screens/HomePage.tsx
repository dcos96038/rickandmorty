import {DrawerScreenProps} from "@react-navigation/drawer";
import React, {useEffect} from "react";
import {FlatList, Image, View} from "react-native";

import CharacterCard from "../components/CharacterCard";
import CharactersPaginator from "../components/CharactersPaginator";
import DrawerButton from "../components/DrawerButton";
import useGetCharacters from "../hooks/useGetCharacters";
import {DrawerParams} from "../navigators/DrawerNavigation";

import LoadingScreen from "./LoadingScreen";

interface Props extends DrawerScreenProps<DrawerParams, "Characters"> {}

const HomePage = ({navigation}: Props) => {
  const {
    charactersList: characters,
    loading,
    getCharacters,
    currentPage,
    lastPage,
    firstPage,
  } = useGetCharacters();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const onClick = (type: string) => {
    getCharacters(type);
  };

  if (loading) return <LoadingScreen />;

  return (
    <View className="bg-[#212125] min-w-full items-center min-h-screen">
      <DrawerButton openDrawer={openDrawer} />
      <Image
        className="h-[300] w-[250] left-0 bottom-0 absolute opacity-10"
        source={require("../assets/rickmorty.png")}
      />

      <FlatList
        ListFooterComponent={() => <View className="h-[100]" />}
        ListHeaderComponent={() => (
          <View className="items-center">
            <Image
              className="h-[80] w-[200] justify-center"
              source={require("../assets/logo.png")}
            />
          </View>
        )}
        contentContainerStyle={{width: "100%", alignItems: "stretch"}}
        data={characters}
        keyExtractor={(character, i) => character.id.toString() + i}
        numColumns={2}
        renderItem={({item}) => <CharacterCard character={item} />}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
      />
      <CharactersPaginator
        firstPage={firstPage}
        lastPage={lastPage}
        page={currentPage}
        onClick={(value) => onClick(value)}
      />
    </View>
  );
};

export default HomePage;
