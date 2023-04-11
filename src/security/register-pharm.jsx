import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, Keyboard, View, 
    TouchableWithoutFeedback, TouchableOpacity, ScrollView } from "react-native";
import logo from "../../assets/img/icon.png"
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { TextInput, Button } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeHeader from "../template/HomeHeader";
import { TextInput } from "@react-native-material/core";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import PhoneInput from 'react-native-phone-number-input';


export default function RegisterPharm({navigation}){

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= "green"
    const phoneInput = useRef(null);

    const [ adresse, setAdresse] = useState('');
    const [ nom, setNom] = useState('');
    const [ phone, setPhone] = useState('');
    const [ message, setMessage] = useState('');
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

    function handleClick() {
        if(adresse!=="" && phone!=="" && nom!==""){
            setMessage("")
            const pharm={
                nom: nom,
                phone: phone,
                adresse: adresse
            }
            const data={pharmacie: pharm, ...route.params?.user}
            navigation.navigate("intro2",{data:data})
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
            margin:10,
            padding:10, 
            color: chart,
            backgroundColor:"transparent",
            borderRadius: 10,
        },
        register: {
            //width: "100%", 
            //textAlign: 'center', 
            color:theme, 
            margin: 5,
            fontSize: 17
        },
        btn:{ 
            padding:10, 
            backgroundColor: chart,
            borderRadius: 10,
            //margin:25,
            alignItems: "center"
        },
    });


    const opt={
        mode:'flat', clearButtonMode:"while-editing", style:styles.input,  
        contentStyle:{color:front}, keyboardAppearance:theme==="black" ? "light": "dark",
        variant:"standard", color:chart, placeholderTextColor:front, selectionColor:front,
        enablesReturnKeyAutomatically:true, variant:"standard",
        inputStyle:{color: front}
    }

    let behave= Platform.OS ==="ios" ? {
        behavior:"padding"
    }: {}

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView {...behave} style={{flex: 2}}>

                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.text}>Informations de la pharmacie </Text>
                    </View>

                    <View>

                        <TextInput 
                            placeholder='nom de la pharmacie' {...opt}
                            onChangeText={(text)=> setNom(text)} keyboardType="default"
                            leading={<MaterialCommunityIcons name="pencil-circle" color={chart} size={25} />}
                        />

                        <TextInput 
                            placeholder='votre adresse' {...opt} onChangeText={(text)=> setAdresse(text)}
                            leading={<MaterialCommunityIcons name="account" color={chart} size={25} />}
                        />

                        <PhoneInput
                            ref={phoneInput} textInputStyle={{color: front}} 
                            defaultValue={phone} defaultCode="SN" layout="first"
                            containerStyle={styles.input} placeholder="téléphone" 
                            textContainerStyle={{ 
                                paddingVertical: 5, backgroundColor: theme, color: front, 
                                borderBottomColor: front, borderBottomWidth: 0.5
                            }}
                            onChangeFormattedText={text => {
                                setPhone(text);
                            }}
                            codeTextStyle={{color: front}} 
                            countryPickerButtonStyle={{color: front, borderBottomColor: front, borderBottomWidth: 0.5}} 
                        />

                        <Text style={{textAlign: 'center', color:"red", margin:10}}>{message}</Text>   

                    </View>


                    <TouchableOpacity style={styles.btn} onPress={handleClick}>
                        <Text style={styles.register}>suivant</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )
}