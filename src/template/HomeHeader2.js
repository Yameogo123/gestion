import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import img from "../../assets/img/icon.png"
import { SafeAreaView } from 'react-native';
import Navbar from './Navbar';
import React,{useState} from 'react';


export default function HomeHeader2({logo=true}){

    const chart= useSelector((state)=>state.themeReducer.chart)
    const front= useSelector((state)=>state.themeReducer.front)
    const back= useSelector((state)=>state.themeReducer.back)
    const nav=  useNavigation()
    const dispatch= useDispatch()
    const route= useRoute()
    const [active, setActive] = useState(false);

    function toggle(){
        let action
        if(back==="black"){
            action={
                type: "default"
            }
        }else{
            action={
                type: "dark"
            }
        }
        dispatch(action)
    }
  
    const style = StyleSheet.create({
        view:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            margin: 20,
            marginTop: 25,
            alignItems: "center"
        },
        img:{
            width: 40,
            height: 40,
            borderRadius: 40 
        },
        text:{
            fontSize: 20,
            color: front
        }
    });

    return (<SafeAreaView style={style.view}> 
        <View>
            <Text style={style.text}>
                John Lucas 
            </Text>
        </View>
        {logo ?<View style={style.view}>
            <TouchableOpacity style={{marginRight: 15}} onPress={toggle}>
                <Ionicons name="md-sunny" color={front} size={30} />
            </TouchableOpacity> 
            <TouchableOpacity style={{marginRight: 15}} onPress={()=>{}}>
                <Ionicons name="notifications-circle" color={front} size={30} />
            </TouchableOpacity> 
            <TouchableOpacity onPress={()=>setActive(!active)}>
                <Image source={img} style={style.img} />
            </TouchableOpacity>
        </View>: <View></View>}
        {active && <Navbar />}
    </SafeAreaView>)
}