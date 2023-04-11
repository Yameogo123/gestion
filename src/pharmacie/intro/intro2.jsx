import 'react-native-gesture-handler';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import logo from "../../../assets/img/pharm2.png"
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import HomeHeader from "../../template/HomeHeader";




export default function Intro2({navigation}) {

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.pharm_chart)
    const route= useRoute()
    const data= route.params?.data

    useEffect(()=>{
        navigation.setOptions({
            header: ()=> {
                return <HomeHeader logo={true} />
            },
            headerShown: true
        })
    },[])    

    function handleNav(){
        navigation.navigate("intro3", {data: data})
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text:{
            color: front,
            fontSize: 30,
            textAlign:"center",
            justifyContent: 'center',
            margin: 20,
            fontWeight: "bold",
        },
        input:{
            margin:5,
            padding:5, 
            color: theme,
            backgroundColor:"transparent",
            borderRadius: 10
        },
        register: {
            //textAlign: 'center', 
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
    });

    return (
            
        <ScrollView contentContainerStyle={styles.container}>

            <View style={{ alignItems:"center", justifyContent:"center"}}>
                <Text style={styles.text}>Pharmacie {data?.pharmacie?.nom} </Text>
            </View>

            <View style={styles.img}>
                <Image source={logo} resizeMode="center" style={{height: 450, width:400}} />
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleNav}>
                <Text style={styles.register}>continuer</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}