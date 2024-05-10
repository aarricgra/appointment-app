import axios from "axios";

//const BASE_URL = EXPO_PUBLIC_API_URL;
const BASE_URL ="http://192.168.1.20:1337";


const API_KEY =
  "1cc643519984075833bc67c8a9c75a10db6aa065a23d080b7c9f04a783a9c55dd42ec4c6de88429d4a5f0893fae6389e20971c0d2714c141e53e36022992e19b774bc3280b32a806c95ba953f748a68b5cbe5b59299be1816941b44b95f225faadb551a02d2cac4e5c79874034817efd67e96576e130f69c6a5d299141d2f2d8";

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

const getPromociones = () => AXIOS_INSTANCE.get("/api/promocions?populate=*");

const getServicios = () => AXIOS_INSTANCE.get("/api/servicios?populate=*");

const getBotones = () => AXIOS_INSTANCE.get("/api/botons?populate=*");
  
const getMatchingUser =(email)=> AXIOS_INSTANCE.get("/api/clientes?filters[Correo][$eq]="+email);

const checkLoginCredentials =(email,password)=> AXIOS_INSTANCE.get("/api/clientes?populate=*&filters[Correo][$eq]="+email+"&filters[Password][$eq]="+password);

const getUserAppointments =(email)=>AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[idCliente][Correo][$eq]="+email);

const postNewUser = (data)=> AXIOS_INSTANCE.post("/api/clientes",data)

const getDayAppointmets = (day) => AXIOS_INSTANCE.get("/api/reservas?filters[Fecha][$eq]="+day)

const postNewAppointment = (data)=> AXIOS_INSTANCE.post("/api/reservas",data)


export default {
  getPromociones,
  getServicios,
  getBotones,
  getMatchingUser,
  getUserAppointments,
  postNewUser,
  checkLoginCredentials,
  getDayAppointmets,
  postNewAppointment
};
