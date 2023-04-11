import 'react-native-gesture-handler';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import logo from "../../../assets/img/pharm1.png"
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
//import { useNavigation } from "@react-navigation/native";




export default function Intro1({navigation}) {

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.pharm_chart)
    const dispatch= useDispatch()
    const route= useRoute()
    const action={
        type: "default"
    }

    function handleNav(){
        let user= route.params?.data
        navigation.navigate("register-pharm", {user: user})
    }

    useEffect(() => {
        dispatch(action)
        setTimeout(handleNav, 3000)
    }, [])
    


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
            
        <ScrollView contentContainerStyle={styles.container}>

            <TouchableOpacity style={styles.img} onPress={handleNav}>
                <Image source={logo} resizeMode="center" style={{height: 300, width:300}} />
            </TouchableOpacity>

        </ScrollView>
    )
}