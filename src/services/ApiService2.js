import axios from "axios";
import config from "@/config";

const ApiService = axios.create({
  baseURL: config.apiEndpoint
});

export default ApiService;
