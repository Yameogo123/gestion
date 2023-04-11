import 'react-native-gesture-handler';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import logo from "../../../assets/img/pharm2.png"
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
//import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import HomeHeader from "../../template/HomeHeader";




export default function Intro3({navigation}) {

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.pharm_chart)
    const route= useRoute()
    const data= route.params?.data
    const gestion=["stock", "trésorerie", "personnel"]
    const dispatch= useDispatch()

    function handleNav(){
        const user=data?.user 
        const pharmmacie= data?.pharmacie
        let action0={
            type:"connect",
            value: user
        }
        let action1={
            type:"token",
            value: "token"
        }
        dispatch(action0)
        dispatch(action1)
    }

    useEffect(()=>{
        navigation.setOptions({
            header: ()=> {
                return <HomeHeader logo={true} profil='pharmacie' />
            },
            headerShown: true
        })
    },[])    


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme,
            alignItems: 'center',
            //justifyContent: 'center',
        },
        text:{
            color: front,
            fontSize: 20,
            textAlign:"center",
            justifyContent: 'center',
            margin: 20,
            //fontWeight: "bold",
        },
        input:{
            margin:5,
            padding:5, 
            color: theme,
            backgroundColor:"transparent",
            borderRadius: 10
        },
        register: { 
            color:theme, 
            margin: 5,
            fontWeight: "bold",
            fontSize: 17
        },
        btn:{ 
            padding:10, 
            backgroundColor: chart,
            borderRadius: 10,
            //margin:25,
            alignItems: "center",
            width: "100%", 
            marginTop: 50
        },
        content:{
            alignItems:"center", justifyContent:"center"
        },
        map:{
            display: "flex",
            flexDirection: "row",
            //justifyContent: 'center',
            alignItems: "center"
        }
    });

    return (
            
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.content}>
                <Text style={[styles.text,{fontWeight: "bold"}]}>Pharmacie {data?.pharmacie?.nom} </Text>
            </View>

            <View style={styles.img}>
                <Image source={logo} resizeMode="center" style={{height: 200, width:200}} />
            </View>

            <View style={styles.content}>
                <Text style={styles.text}>Avec cette application vous pouvez gérer facilement:</Text>
                {gestion.map((el, id)=>{
                    return <View style={styles.map} key={id}>
                        <MaterialCommunityIcons name={"arrow-right"} size={30} color={front}  />
                        <Text style={styles.text}>votre {el}</Text>
                    </View>
                })}
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleNav}>
                <Text style={styles.register}>continuer</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}