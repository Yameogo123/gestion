import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Keyboard, View, 
    TouchableWithoutFeedback, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from "@react-navigation/native";
import HomeHeader from "../template/HomeHeader";


export default function Page4({navigation}){

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart) 

    const dispatch= useDispatch()
    const route= useRoute()

    useEffect(()=>{
        navigation.setOptions({
            header: ()=> {
                return <HomeHeader logo={false} />
            },
            headerShown: true
        })
    },[])

    const alternatives=[
        {
            icon:"wallet",
            label: "personnel"
        },
        {
            icon:"home-city-outline",
            label: "entreprise"
        },
        {
            icon:"hospital-box",
            label: "pharmacie"
        }
    ]

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme,
        },
        text:{
            color: front,
            fontSize: 30,
            textAlign:"center",
            justifyContent: 'center',
        },
        flatlist:{
            alignItems: "center", 
            //justifyContent:"space-around", 
            display:"flex", 
            flexDirection:"row"
        },
        flat: {
            backgroundColor: chart, 
            padding: 25,
            margin:5 ,
            borderRadius: 20,
            alignItems:"center", 
            justifyContent:"center"
        }
    });

    function handleClick(lab){
        const data={
            user: {...route.params?.user, profil: lab},
        }
        if(lab==="personnel"){
            navigation.navigate("interest",{data:data})
        }else if(lab==="entreprise"){
            navigation.navigate("interest",{data:data})
        }else if(lab==="pharmacie"){
            navigation.navigate("intro1",{data:data})
        }
        //
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={{ alignItems:"center", justifyContent:"center", marginTop: 150, marginBottom: 150}}>
                <Text style={styles.text}>Choix de votre profil</Text>
            </View>

            <View>
                <FlatList centerContent contentContainerStyle={styles.flatlist} scrollEnabled={false} horizontal data={alternatives} renderItem={({item})=>{
                    return <TouchableOpacity style={styles.flat} onPress={()=> handleClick(item.label)}>
                        <MaterialCommunityIcons name={item.icon} size={50} color={"white"} 
                        style={{ alignItems:"center", justifyContent:"center"}} />
                        <Text style={{color:"white"}}>{item.label}</Text>
                    </TouchableOpacity> 
                }} />
            </View>

        </ScrollView>
      )
}