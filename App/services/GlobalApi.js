import axios from "axios";
import moment from "moment";

//const BASE_URL = EXPO_PUBLIC_API_URL;
const BASE_URL ="http://192.168.1.70:1337";
const today = moment().format("YYYY-MM-DD")

const API_KEY =
  "191a0e57af2d16207deed2e599d3ec7aa7a6116d9fa2a0a3365336ac0736072c48a70be5052dfdb39f6f87b1410f1c8cf751ac31d3dc297c1b101f80744ed9f602a9f35157405d630f87bd5e1bb8f0a062f661497126d2b314907eadba3533601319c02f82ce916bf59065f0d87a4be7eef8988389721dacbaa7c44ffa8f3e98";

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

const getBaseUrl=()=>BASE_URL;

const getPromociones = () => AXIOS_INSTANCE.get("/api/productos?populate=*&filters[Oferta][$gt]=0");
const getProductosFiltered = (value) =>AXIOS_INSTANCE.get("/api/productos?populate=*&filters[Nombre][$containsi]="+value);

const getServicios = () => AXIOS_INSTANCE.get("/api/servicios?populate=*&filters[id][$gt]=1");

const getBotones = () => AXIOS_INSTANCE.get("/api/botons?populate=*");
  
const getMatchingUser =(email)=> AXIOS_INSTANCE.get("/api/clientes?filters[Correo][$eq]="+email);

const checkLoginCredentials =(email,password)=> AXIOS_INSTANCE.get("/api/clientes?populate=*&filters[Correo][$eq]="+email+"&filters[Password][$eq]="+password);

const getUserAppointments =(email)=>AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[idCliente][Correo][$eq]="+email);
const getUserNextsAppointments =(email)=>AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[idCliente][Correo][$eq]="+email+"&filters[Fecha][$gte]="+today+"&sort[0]=Fecha:asc")

const getUserLastAppointments =(email)=>AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[idCliente][Correo][$eq]="+email+"&filters[Fecha][$lte]="+today+"&sort[0]=Fecha:desc");

const postNewUser = (data)=> AXIOS_INSTANCE.post("/api/clientes",data)

const getDayAppointmets = (day) => AXIOS_INSTANCE.get("/api/reservas?filters[Fecha][$eq]="+day)
const getAppoitmentById = (id) => AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[id][$eq]="+id)
const getServiceById = (id) => AXIOS_INSTANCE.get("/api/servicios?populate=*&filters[id][$eq]="+id)

const deleteAppointment=(id)=> AXIOS_INSTANCE.delete("/api/reservas/"+id)
const postNewAppointment = (data)=> AXIOS_INSTANCE.post("/api/reservas",data)


export default {
  getPromociones,
  getProductosFiltered,
  getServicios,
  getBotones,
  getMatchingUser,
  getUserAppointments,
  getUserNextsAppointments,
  getUserLastAppointments,
  postNewUser,
  checkLoginCredentials,
  getDayAppointmets,
  postNewAppointment,
  getAppoitmentById,
  getServiceById,
  getBaseUrl,
  deleteAppointment
};
