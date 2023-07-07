import axios from "axios";
import { BASE_URL, REQUEST_TIME } from "./constants";


export const http= axios.create({
    baseURL:BASE_URL,
    timeout:REQUEST_TIME
})

