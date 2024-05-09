import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../services/GlobalApi'
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

export default function TimePicker({day,hour,onchange}) {
    const [appointments,setAppointmets] = useState([])
    const hours = ["08:00","08:30","09:00", "09:30", "10:00", "10:30", "11:30", "13:00", "15:30", "16:00", "17:00", "17:30"];
    const [selectedHour,setSelectedHour]=useState("")
    
  useEffect(() => {
    getDayAppointments();
    onchange("")
  }, [day]);

  const getDayAppointments = () =>
    GlobalApi.getDayAppointmets(day).then((resp) => {
      setAppointmets(resp.data.data);
    });

    return (
    <View style={{padding:separator}}>
        <Text style={styles.title}>Horas disponibles</Text>
        <View style={styles.row}>
            {hours.map((item, index) => {
                if(item==hour){
                    return(
                        <TouchableOpacity key={index} style={styles.buttonSelected}>
                            <Text style={styles.textSelected}>{item}</Text>
                        </TouchableOpacity>
                    )
                }else{
                    let exist=false
                appointments.map((appointment,i)=>{
                    const info=appointment.attributes
                    const h = info.Hora.split(':')
                    const hora= moment().startOf("day").add(h[0],"hours").add(h[1],"minutes").format("HH:mm")
                    if(hora==item){exist=true}
                })
                if(exist){
                    return (
                        <TouchableOpacity key={index} style={styles.buttonTaken}>
                            <Text style={styles.textTaken}>{item}</Text>
                        </TouchableOpacity>
                    );
                }else{
                    return (
                        <TouchableOpacity key={index} style={styles.buttonNotTaken} onPress={()=>onchange(item)}>
                            <Text style={styles.textNotTaken}>{item}</Text>
                        </TouchableOpacity>
                    );
                }
                }
            })}
        </View>
        <Text style={styles.textSelected}>{selectedHour}</Text>
    </View>
  )
}
const screenWidth=Dimensions.get("screen").width
const separator=parseInt(screenWidth*0.04)
const styles = StyleSheet.create({
    textTaken:{color:"white",fontSize:20},
    buttonTaken:{borderColor:"white",borderWidth:2,borderRadius:10,width:screenWidth*0.2,alignItems:"center"},
    textSelected:{color:"#02e071",fontSize:20},
    buttonSelected:{borderColor:"#02e071",borderWidth:2,borderRadius:10,width:screenWidth*0.2,alignItems:"center"},
    textNotTaken:{color:"#34d2eb",fontSize:20},
    buttonNotTaken:{borderColor:"#34d2eb",borderWidth:2,borderRadius:10,width:screenWidth*0.2,alignItems:"center"},
    row:{display:"flex",flexDirection:"row",gap:separator,flexWrap:"wrap"},
    title:{color:"white",marginBottom:10,fontWeight:"bold",fontSize:18}
  });
  