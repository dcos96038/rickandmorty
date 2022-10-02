import axios from "axios";

const baseURL = "https://razbaqr77h.execute-api.sa-east-1.amazonaws.com/prod";

const loginApi = axios.create({baseURL});

loginApi.interceptors.request.use(async (config: any) => {
  const token = "7HckdEx0dx67Kor9pPGAB7WtYCyd3r5J70Sp0smo";

  config.headers["x-api-key"] = token;

  return config;
});

export default loginApi;
