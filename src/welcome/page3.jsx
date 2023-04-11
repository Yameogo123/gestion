import React, { useState } from "react";
import { Image, StyleSheet, Text, Keyboard, View, 
    TouchableWithoutFeedback, FlatList, TouchableOpacity, ScrollView } from "react-native";
import logo from "../../assets/img/icon.png"
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, Button } from 'react-native-paper';

export default function Page3({navigation}){

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart)
    const [ text, setText] = useState('');
    const [ password, setPassword] = useState('');
    const [ message, setMessage] = useState('');
    const dispatch= useDispatch()

    function handleClick() {
        if(text!=="" && password!==""){
            const user={
                login: text,
                password: password
            }
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
        }else{
            setMessage("saisir tous les champs")
        }
    }

    const alternatives=[
        {
            icon:"facebook"
        },
        {
            icon:"google"
        },
        {
            icon:"apple"
        }
    ]

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme,
        },
        text:{
            color: theme,
            fontSize: 17,
            textAlign:"center",
            justifyContent: 'center',
        },
        img:{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingTop: 50
        },
        btn:{ 
            padding:10, 
            backgroundColor: front,
            borderRadius: 10,
            margin:40,
            marginTop: 100
        },
        hr:{
            backgroundColor:front,
            flex: 1, 
            height: 1,
        },
        flatlist:{
            alignItems: "center", 
            justifyContent:"space-around", 
            display:"flex", 
            flexDirection:"row"
        },
        flat: {
            backgroundColor: front, 
            padding: 25,
            margin:10 ,
            borderRadius: 20
        },
        register: {
            textAlign: 'center', 
            color:front, 
            margin: 20,
            fontSize: 17
        }
    });

    return (

        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.img}>
                <Image source={logo} resizeMode="center" style={{height: 150, width:200}} />
            </View>

            <View style={{flex:1}}>
                
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("register")}>
                    <Text style={styles.text}>créer un compte avec le mail</Text>
                </TouchableOpacity>

            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.hr} />
                <View>
                    <Text style={{textAlign: 'center', color:front}}> ou créer avec </Text>
                </View>
                <View style={styles.hr}/>
            </View>

            <View style={{flex:1}}>
                <FlatList centerContent contentContainerStyle={styles.flatlist} scrollEnabled={false} horizontal data={alternatives} renderItem={({item})=>{
                    return <TouchableOpacity style={styles.flat}>
                        <MaterialCommunityIcons name={item.icon} size={50} color={chart}  />
                    </TouchableOpacity> 
                }} />
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate("login")}>
                <Text style={styles.register}>vous avez un compte? connectez vous </Text>
            </TouchableOpacity>

        </ScrollView>

      )
}