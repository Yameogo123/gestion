import 'react-native-gesture-handler';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from "react-native";
import logo from "../../assets/img/icon.png"
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
//import { useNavigation } from "@react-navigation/native";




export default function Page1({navigation}) {

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart)
    const dispatch= useDispatch()
    const action={
        type: "dark"
    }

    useEffect(() => {
        dispatch(action)
        setTimeout(()=>navigation.navigate("page2"), 4000)
    }, [])
    


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text:{
            textAlign: "center",
            fontSize: 25,
            margin:20,
            color: front
        },
        img:{
            width: "90%",
            marginBottom: 100,
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

    return (
            
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.img}>
                <Image source={logo} resizeMode="center" style={{height: 150, width:200}} />
            </View>
            <Text style={styles.text}>
                HANDLE
            </Text>
        </ScrollView>
    )
}