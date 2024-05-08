const getCurrentDate = () => {
  return (
    new Date(new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1 < 10
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1) +
    "-" +
    (new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate())
  ))
};
const getStrapiDateObject = (info) => {
    const dia=info.Fechor.substring(8,10)
    const mes=info.Fechor.substring(5,7)
    const año=info.Fechor.substring(0,4)
    return (
        new Date(año+"-"+mes+"-"+dia)
    );
  };

const getStrapiTime = (info) => {
    return(
        info.Fechor.substring(11,16)
    )
}

export default {
  getCurrentDate,
  getStrapiDateObject,
  getStrapiTime,
  
};
