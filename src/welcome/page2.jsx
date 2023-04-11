//import 'react-native-gesture-handler';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../../assets/img/icon.png"
import {  useSelector } from "react-redux";
import { FadeAnimation } from "../../assets/animation/FadeAnimation";
import Swiper from "react-native-web-swiper";
import React from "react";

export default function Page2({navigation}) {
    
    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart)


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme,
          //alignItems: 'center',
          //justifyContent: 'center',
        },
        text:{
            color: front,
            fontSize: 30,
            textAlign:"center",
            justifyContent: 'center',
        },
        img:{
            //marginBottom: 100,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        btn:{ 
            padding:10, 
            backgroundColor: chart,
            borderRadius: 10,
            margin:20
        }
    });

    return (
        
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image source={logo} resizeMode="center" style={{height: 150, width:200}} />
                </View>
            </View>

            
            <Swiper from={0} timeout={3} loop
                minDistanceForAction={0.2}
                controlsProps={{
                    dotsTouchable: true,
                    prevPos: 'left',
                    nextPos: 'right',
                    nextTitle: '',
                    prevTitle: '',
                    nextTitleStyle: { color: 'red', fontSize: 24, fontWeight: '500' },
                    
                }}
            >

                <Text style={styles.text}>
                    Réalise ton rêve organisationnel 
                </Text>                
                <Text style={styles.text}>
                    Surveille toutes tes dépenses
                </Text>
                <Text style={styles.text}>
                    Programme tes achats
                </Text>

            </Swiper>

            <View style={styles.btn}>
                <TouchableOpacity onPress={()=>navigation.navigate("page3")}>
                    <FadeAnimation>
                        <Text style={[styles.text,{color:front,fontSize: 25}]}>
                            continuer
                        </Text>
                    </FadeAnimation>
                </TouchableOpacity>
            </View>
            
            
        </View>
    );
}
