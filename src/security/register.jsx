import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Keyboard, View, 
    TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import logo from "../../assets/img/icon.png"
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "../template/HomeHeader";
import { TextInput } from "@react-native-material/core";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";


export default function Register({navigation}){

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart)

    const [ mail, setMail] = useState('');
    const [ password, setPassword] = useState('');
    const [ password1, setPassword1] = useState('');
    const [ nom, setNom] = useState('');
    const [ show, setShow] = useState('');
    const [ show1, setShow1] = useState('');
    const [ message, setMessage] = useState('');
    const dispatch= useDispatch()

    useEffect(()=>{
        navigation.setOptions({
            header: ()=> {
                return <HomeHeader logo={false} />
            },
            headerShown: true
        })
        const time= setTimeout(()=>setMessage(""), 3000)
        return () => clearTimeout(time);
    },[message])

    function handleClick() {
        if(mail!=="" && password!=="" && password1!==""){
            setMessage("")
            if(password===password1){
                const user={
                    nom: nom,
                    password: password,
                    mail: mail
                }
                navigation.navigate("page4", {user:user})
            }else{
                setMessage("les mots de passe ne correspondent pas")
            }
        }else{
            setMessage("saisir tous les champs")
        }
    }

    const styles = StyleSheet.create({
        container: {
          //flex: 1,
          backgroundColor: theme,
          paddingBottom: 150
        },
        text:{
            color: front,
            fontSize: 30,
            textAlign:"center",
            justifyContent: 'center',
            margin: 20,
        },
        input:{
            margin:5,
            padding:5, 
            color: theme,
            backgroundColor:"transparent",
            borderRadius: 10
        },
        register: {
            //width: "100%", 
            //textAlign: 'center', 
            color:front, 
            margin: 5,
        },
        btn:{ 
            padding:10, 
            backgroundColor: chart,
            borderRadius: 10,
            //margin:25,
            alignItems: "center"
        },
        view:{
            //backgroundColor: chart,
            marginTop: 50,
        },
    });


    const opt={
        mode:'flat', clearButtonMode:"while-editing", style:styles.input,  
        contentStyle:{color:front}, keyboardAppearance:theme==="black" ? "light": "dark", selectionColor:front,
        variant:"standard", color:front, placeholderTextColor:front, selectionColor:front,
        enablesReturnKeyAutomatically:true, variant:"standard",
        inputStyle:{color: "white"}
    }

    let behave= Platform.OS ==="ios" ? {
        behavior:"padding"
    }: {}

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView {...behave} style={{flex: 2}}>

                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.text}>créer son profil</Text>
                        <MaterialCommunityIcons name="account-circle" color={front} size={150} />
                    </View>

                    <View>

                        <TextInput 
                            placeholder='nom complet' {...opt}
                            onChangeText={(text)=> setNom(text)} keyboardType="default"
                            leading={<MaterialCommunityIcons name="pencil-circle" color={front} size={25} />}
                        />

                        <TextInput 
                            placeholder='adresse email' {...opt}
                            onChangeText={(text)=> setMail(text)}  keyboardType="email-address"
                            leading={<MaterialCommunityIcons name="account" color={front} size={25} />}
                        />

                        <TextInput 
                            placeholder='mot de passe' secureTextEntry={!show} {...opt}
                            onChangeText={(text)=> setPassword(text)} onSubmitEditing={handleClick} 
                            leading={<MaterialCommunityIcons name="key" color={front} size={25} />}
                            trailing={<TouchableOpacity onPress={()=>setShow(!show)}>
                                <MaterialCommunityIcons name="eye" color={front} size={25} />
                            </TouchableOpacity>}
                        />
                        <TextInput 
                            placeholder='confirmation mot de passe' secureTextEntry={!show1}  {...opt}
                            onChangeText={(text)=> setPassword1(text)} onSubmitEditing={handleClick} 
                            leading={<MaterialCommunityIcons name="key" color={front} size={25} />}
                            trailing={<TouchableOpacity onPress={()=>setShow1(!show1)}>
                                <MaterialCommunityIcons name="eye" color={front} size={25} />
                            </TouchableOpacity>}
                        />

                        <Text style={{textAlign: 'center', color:"red", margin:10}}>{message}</Text>

                        

                    </View>


                    <TouchableOpacity style={styles.btn} onPress={handleClick}>
                        <Text style={styles.register}>commencer</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )
}