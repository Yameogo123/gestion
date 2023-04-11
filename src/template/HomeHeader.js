import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import img from "../../assets/img/icon.png"
import img_pharm from "../../assets/img/pharm2.png"
import { SafeAreaView } from 'react-native';



export default function HomeHeader({logo=true, profil="personnel"}){

    const chart= useSelector((state)=>state.themeReducer.chart)
    const front= useSelector((state)=>state.themeReducer.front)
    const back= useSelector((state)=>state.themeReducer.back)
    const nav=  useNavigation()
    const route= useRoute()
    let image= img

    switch (profil) {
        case "pharmacie":
            image= img_pharm
            break;
        case "entreprise":
            image= img_pharm
            break;
        default:
            image= img
            break;
    }
  
    const style = StyleSheet.create({
        view:{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            margin: 20,
            marginTop: 25
        },
        logo:{
            width: 50,
            height: 50
        },
    });

    return (<SafeAreaView style={style.view}> 
        <TouchableOpacity onPress={()=>nav.goBack()}>
            <MaterialCommunityIcons name="arrow-left-bold-circle" color={front} size={40} />
        </TouchableOpacity> 
        {logo ?<View>
            <Image source={image} style={style.logo} />
        </View>: <View></View>}
    </SafeAreaView>)
}