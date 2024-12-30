import axios from "axios";

const client = axios.create({
     baseURL: "http://172.16.120.87:8080",
     withCredentials: true,
});

//hyebin : 172.16.121.148
//kokodak : 172.16.120.87

export default client;