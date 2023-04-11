import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, Keyboard, View, 
    TouchableWithoutFeedback, FlatList, TouchableOpacity, ScrollView, Platform } from "react-native";
import logo from "../../assets/img/icon.png"
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { TextInput, Button } from 'react-native-paper';
import { TextInput } from "@react-native-material/core";
import { KeyboardAvoidingView } from "react-native";
import HomeHeader from "../template/HomeHeader";

export default function Login({navigation}){

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart)
    const [ text, setText] = useState('');
    const [ password, setPassword] = useState('');
    const [ message, setMessage] = useState('');
    const [ show, setShow] = useState('');
    const dispatch= useDispatch()

    useEffect(()=>{
        navigation.setOptions({
            header: ()=> {
                return <HomeHeader logo={false} />
            },
            headerShown: true
        })
    },[])

    function handleClick() {
        if(text!=="" && password!==""){
            const user={
                login: text,
                password: password,
                profil: "pharmacie"
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
            color: front,
            fontSize: 30,
            textAlign:"center",
            justifyContent: 'center',
        },
        img:{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        btn:{ 
            padding:10, 
            //backgroundColor: "green",
            borderRadius: 10,
            margin:5,
        },
        input:{
            margin:10,
            padding:10, 
            color: theme,
            backgroundColor:"transparent",
            borderRadius: 10,
            border: null
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
            flexDirection:"row",
            //marginBottom:50 ,
        },
        flat: {
            backgroundColor: front, 
            padding: 25,
            margin:10 ,
            borderRadius: 20
        },
        register: {
            //width: "100%", 
            textAlign: 'center', 
            color:front, 
            margin: 10
        },
        btn:{ 
            padding:1, 
            backgroundColor: chart,
            borderRadius: 10,
            margin:20,
            alignItems: "center"
        }
    });

    const opt={
        mode:'flat', clearButtonMode:"while-editing", style:styles.input,  
        contentStyle:{color:front}, keyboardAppearance:theme==="black" ? "light": "dark", selectionColor:front,
        variant:"standard", color:front, placeholderTextColor:front, selectionColor:front,
        enablesReturnKeyAutomatically:true, variant:"standard",
        inputStyle:{color: "white"}
    }

    let behave= Platform.OS==="ios" ? {
        behavior:"height"
    }: {}

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView {...behave} style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.container}>

                    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.text}>Salut, Bon retour parmi nous</Text>
                    </View>

                    <View style={{flex:0}}>
                        <TextInput {...opt}
                            placeholder='saisir votre mail' 
                            onChangeText={(text)=> setText(text)} 
                            leading={<MaterialCommunityIcons name="pencil-circle" color={front} size={25} />}
                        />
                        <TextInput {...opt}
                            clearButtonMode="while-editing" placeholder='mot de passe' secureTextEntry={!show}
                            onChangeText={(text)=> setPassword(text)} onSubmitEditing={handleClick}
                            leading={<MaterialCommunityIcons name="key" color={front} size={25} />}
                            trailing={<TouchableOpacity onPress={()=>setShow(!show)}>
                                <MaterialCommunityIcons name="eye" color={front} size={25} />
                            </TouchableOpacity>}
                        />

                        <Text style={{textAlign: 'center', color:"red", margin:10}}>{message}</Text>

                        <TouchableOpacity>
                            <Text style={styles.register}>mot de passe oublié ?</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.btn} onPress={handleClick}>
                            <Text style={styles.register}>se connecter</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.hr} />
                        <View>
                            <Text style={{textAlign: 'center', color:front}}>ou se connecter avec</Text>
                        </View>
                        <View style={styles.hr}/>
                    </View>

                    <View style={{alignItems: "center"}}>
                        <FlatList centerContent contentContainerStyle={styles.flatlist} scrollEnabled={false} horizontal data={alternatives} renderItem={({item})=>{
                            return <TouchableOpacity style={styles.flat}>
                                <MaterialCommunityIcons name={item.icon} size={40} color={chart}  />
                            </TouchableOpacity> 
                        }} />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )
}