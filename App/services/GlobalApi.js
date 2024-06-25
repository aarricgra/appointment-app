import axios from "axios";
import moment from "moment";

const BASE_URL ="http://192.168.43.104:1337";
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

//Coger todas los productos con alguna rebaja
const getPromociones = () => 
  AXIOS_INSTANCE.get(
    "/api/productos?populate=*&filters[Oferta][$gt]=0"
  );

//Coger productos usando un filtro de nombre
const getProductosFiltered = (value) =>
  AXIOS_INSTANCE.get(
    "/api/productos?populate=*&filters[Nombre][$containsi]="+value
  );

//Coger todos los servicios
const getServicios = () => 
  AXIOS_INSTANCE.get(
    "/api/servicios?populate=*&filters[Nombre][$ne]=Cerrado"
  );

const getMatchingUser =(email)=> AXIOS_INSTANCE.get("/api/clientes?filters[Correo][$eq]="+email);

const checkLoginCredentials =(email,password)=> AXIOS_INSTANCE.get("/api/clientes?populate=*&filters[Correo][$eq]="+email+"&filters[Password][$eq]="+password);

const getUserAppointments =(email)=>AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[idCliente][Correo][$eq]="+email);
const getUserNextsAppointments =(email)=>AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[idCliente][Correo][$eq]="+email+"&filters[Fecha][$gte]="+today+"&sort[0]=Fecha:asc")

const getUserLastAppointments =(email)=>AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[idCliente][Correo][$eq]="+email+"&filters[Fecha][$lt]="+today+"&sort[0]=Fecha:desc");

const postNewUser = (data)=> AXIOS_INSTANCE.post("/api/clientes",data)
const putNewUser = (id,data)=> AXIOS_INSTANCE.put("/api/clientes/"+id,data)

const getDayAppointmets = (day) => AXIOS_INSTANCE.get("/api/reservas?filters[Fecha][$eq]="+day)
const getAppoitmentById = (id) => AXIOS_INSTANCE.get("/api/reservas?populate=*&filters[id][$eq]="+id)
const getServiceById = (id) => AXIOS_INSTANCE.get("/api/servicios?populate=*&filters[id][$eq]="+id)

const deleteAppointment=(id)=> AXIOS_INSTANCE.delete("/api/reservas/"+id)
const postNewAppointment = (data)=> AXIOS_INSTANCE.post("/api/reservas",data)

const getDefaultRank = () => 
  AXIOS_INSTANCE.get(
    "/api/rangos?filters[Nombre][$eq]=Bronce"
  );



export default {
  getPromociones,
  getProductosFiltered,
  getServicios,
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
  deleteAppointment,
  putNewUser,
  getDefaultRank
};
