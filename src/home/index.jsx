
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Loading from '../../assets/animation/Loading';
import HomeHeader2 from '../template/HomeHeader2';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Home() {

  const theme= useSelector((state)=>state.themeReducer.back)
  const front= useSelector((state)=>state.themeReducer.front)
  const chart= useSelector((state)=>state.themeReducer.chart)
  const interest= useSelector((state)=>state.userReducer.interest)


  const nav=  useNavigation()
  const [select, setSelect] = useState({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme,
      //alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color: theme,
      padding: 1,
      //width: "100%"
      //fontSize: 10,
    },
    carre:{
      padding: 50,
      backgroundColor: "#CBD1D4",
      alignItems: "center",
      margin: 10,
      elevation: 2,
      borderRadius: 20,
    }
  });

  useEffect(()=>{
    nav.setOptions({
      header: ()=> {
        return <HomeHeader2 />
      }, 
    })
  },[select])

    return (    
    <View style={styles.container}>
        {interest?.length==0 ? <Loading /> :
        <FlatList data={interest} numColumns={2} pagingEnabled={false} contentContainerStyle={{alignItems: "center"}}
        showsVerticalScrollIndicator={false} scrollEnabled renderItem={
          ({item})=>{
            return (<TouchableOpacity style={styles.carre}>
              <Text style={styles.text}>{item?.label}</Text>
              <MaterialCommunityIcons name={item.icon} color={chart} size={50} />
            </TouchableOpacity>)
          }} />}
        
    </View>
    )
}

