import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../../assets/animation/Loading';
import HomeHeader2 from '../../template/HomeHeader2';
import { useRoute } from '@react-navigation/native';
import { FadeAnimation } from '../../../assets/animation/FadeAnimation';


export default function HomePharm() {

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.pharm_chart)
    const gestion=[{libelle: "produit", icon: "medical-bag"}, {libelle: "portefeuille", icon: "wallet"},{libelle: "personnel", icon: "account-group"}]
    const nav=  useNavigation()
    const [select, setSelect] = useState({});

    const styles = StyleSheet.create({
        container: {
            flex: 1, backgroundColor: theme,
            //alignItems: 'center', 
            justifyContent: 'center',
            paddingTop: 50
        },
        text:{
            color: front, padding: 10, fontSize: 20,
        },
        content:{
            //alignItems:"center", 
            //justifyContent:"center", 
            flex: 4
        },
        map:{
            display: "flex", flexDirection: "row", borderColor: chart,
            borderWidth: 1, margin: 10, borderRadius: 20, 
            alignItems:"center", marginLeft: 10, 
            shadowColor: chart, 
            backgroundColor: theme,
            shadowOffset:{
                width: 5,
                height: 5
            },
            elevation: 10, shadowOpacity: 0.9, shadowRadius: 15,
            padding: 20,
            justifyContent:"space-between",
        }
    });

    useEffect(()=>{
        nav.setOptions({
            header: ()=> {
                return <HomeHeader2 />
            }
        })
    },[select])

    return (    
        <View style={styles.container}>
            <View style={{ alignItems:"center", flex: 1}}>
                <Text style={[styles.text, {fontWeight: "bold", fontSize: 50}]}>Gestion</Text>
            </View>
            <View style={styles.content}>
                {
                    gestion.map((el, id)=>{
                        return <TouchableOpacity style={styles.map} key={id} onPress={()=> nav.navigate(el.libelle)}>
                            <MaterialCommunityIcons name={el.icon} size={50} color={chart}  />
                            <Text style={styles.text}>Gestion de {el.libelle}</Text>
                            <FadeAnimation>
                                <MaterialCommunityIcons name={"arrow-right"} size={30} color={chart}  />
                            </FadeAnimation>
                        </TouchableOpacity>
                    })
                }
            </View>
        </View>
    )
}

