import axios from "axios";
import {useEffect, useRef, useState} from "react";

import rymApi from "../api/rymApi";
import {Character, CharactersResponse} from "../interfaces/charactersInterface";

const useGetCharacters = () => {
  const [charactersList, setCharactersList] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const nextPage = useRef("/character?page=1");

  const getCharacters = async () => {
    try {
      const {data} = await rymApi.get<CharactersResponse>(nextPage.current);

      nextPage.current = data.info.next;

      console.log(data.info.next);

      setCharactersList([...charactersList, ...data.results]);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(error as string);
      }
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return {
    getCharacters,
    charactersList,
    loading,
    errorMsg,
  };
};

export default useGetCharacters;
