import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import HomeHeader from '../template/HomeHeader';

export default function Abonnement() {
    
    const nav=  useNavigation()
    const chart= useSelector((state)=>state.themeReducer.chart)
    //const buttons=[{label:"table-edit", action: handleDetail, color:"skyblue"}, {label:"table-remove", action: handleDelete, color:"red"}]


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
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Abonnement</Text>
            
        </ScrollView>
    );
}


