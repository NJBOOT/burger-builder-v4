import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-v3.firebaseio.com/",
});

export default instance;
