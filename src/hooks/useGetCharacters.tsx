import axios from "axios";
import {useEffect, useRef, useState} from "react";

import rymApi from "../api/rymApi";
import {Character, CharactersResponse} from "../interfaces/charactersInterface";

const useGetCharacters = () => {
  const [charactersList, setCharactersList] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [firstPage, setFirstPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState("");

  const nextPage = useRef("");
  const prevPage = useRef("");

  const getCharacters = async (type: string = "initial") => {
    let page: string = "/character?page=1";

    if (type === "next") {
      page = nextPage.current;
    }
    if (type === "prev") {
      page = prevPage.current;
    }

    try {
      const {data} = await rymApi.get<CharactersResponse>(page);

      nextPage.current = data.info.next || "";
      prevPage.current = data.info.prev || "";

      setLastPage(false);
      setFirstPage(false);

      if (data.info.next === null) {
        setLastPage(true);
      }
      if (data.info.prev === null) {
        setFirstPage(true);
      }

      setCurrentPage(page.split("=")[1]);
      setCharactersList(data.results);
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
    firstPage,
    lastPage,
    currentPage,
  };
};

export default useGetCharacters;
