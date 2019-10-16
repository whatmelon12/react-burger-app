import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-app-d0b48.firebaseio.com/"
});

export default instance;
