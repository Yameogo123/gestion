import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import HomeHeader from '../template/HomeHeader';

export default function Portefeuille() {
    
    const nav=  useNavigation()
    const chart= useSelector((state)=>state.themeReducer.chart)


    useEffect(()=>{
        nav.setOptions({
            header: ()=> {
                return <HomeHeader />
            },
            
        })
    },[])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Text>Portefeuille</Text>
        </View>
    );
}


