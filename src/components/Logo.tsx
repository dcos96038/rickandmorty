import React from "react";
import {Image} from "react-native";

const Logo = () => {
  return (
    <Image className="w-[350] h-[350]" source={require("../assets/rick-and-morty-31013.png")} />
  );
};

export default Logo;
