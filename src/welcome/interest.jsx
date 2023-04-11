import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Chip } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import { FadeAnimation } from "../../assets/animation/FadeAnimation";
import HomeHeader from "../template/HomeHeader";


export default function Interest(){

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart)

    const [select, setSelect] = useState([{
        icon:"plus",
        label: "nouveau"
    }]);
    const dispatch= useDispatch()
    const route= useRoute()
    const navigation=  useNavigation()

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
            icon:"shopping",
            label: "les courses"
        },
        {
            icon:"cash-multiple",
            label: "abonnements"
        },
        {
            icon:"chart-bar",
            label: "statistiques"
        },
        {
            icon:"clipboard-list",
            label: "gestion stock"
        },
        {
            icon:"wallet",
            label: "portefeuille"
        },
        {
            icon:"account-group",
            label: "le personnel"
        },
        {
            icon:"alert-circle",
            label: "conseils"
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
        },
        flat: {
            padding: 15,
            borderRadius: 20,
            justifyContent:"center"
        },
        btn: {
            alignItems:"center", 
            flexDirection:"row", 
            justifyContent:"center",
            marginLeft: 40,
            marginRight: 40,
            marginTop: 80,
            backgroundColor: chart,
            borderRadius: 20,
        },
        register: {
            textAlign: 'center', 
            color:front, 
            margin: 10
        },
    });

    function selection(el){
        if(select.find((s)=> s.label===el.label)){
            const sel=select.filter((s)=> s.label!==el.label)
            setSelect(sel)
        }else{
            setSelect([el, ...select])
        }
    }

    function handleClick(){
        const action={
            type: "interest",
            value: select
        }
        const action1={
            type: "connect",
            value: route.params.data.user
        }
        const action2={
            type: "token",
            value: "token"
        }
        dispatch(action)
        dispatch(action1)
        dispatch(action2)
    }

    return (
        
        <ScrollView contentContainerStyle={styles.container}>

            <View style={{ alignItems:"center", justifyContent:"center", marginTop: 50, marginBottom: 100}}>
                <Text style={styles.text}>Vos intérets</Text>
                <Text style={[styles.text, {fontSize: 20, marginTop: 20}]}>(veuillez choisir au moins 2)</Text>
            </View>

            <View>
                <FlatList numColumns={2} centerContent contentContainerStyle={styles.flatlist} scrollEnabled={false} data={alternatives} renderItem={({item})=>{
                    return <TouchableOpacity style={styles.flat} onPress={() => selection(item)}>
                        <Chip  style={{backgroundColor: select.find((s)=> s.label===item.label) ? chart :"transparent", color:"white"}} 
                            mode={select.find((s)=> s.label===item.label) ? "flat" :"outlined"} 
                            icon={()=><MaterialCommunityIcons name={item.icon} color={select.find((s)=> s.label===item.label) ? "white" :chart} size={30} />} >
                            <Text style={{color:select.find((s)=> s.label===item.label) ? "white" :chart}}>{item.label}</Text>
                        </Chip>
                    </TouchableOpacity> 
                }} />
            </View>

            {select.length >=2 && 
                <FadeAnimation>
                    <TouchableOpacity style={styles.btn} onPress={handleClick}>
                        <Text style={styles.register}>poursuivre</Text>
                    </TouchableOpacity>
                </FadeAnimation>}

        </ScrollView>
      )
}