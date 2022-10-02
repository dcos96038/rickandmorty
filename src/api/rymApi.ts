import axios from "axios";

const baseURL = "https://rickandmortyapi.com/api";

const rymApi = axios.create({baseURL});

export default rymApi;
