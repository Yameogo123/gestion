import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HomeHeader from '../template/HomeHeader';
import SelectDropdown from 'react-native-select-dropdown'
import Table from '../template/Datatable';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Course() {
    
    const nav=  useNavigation()
    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.chart)
    const choices = ["à venir", "passé"]
    const [choix, setChoix]= useState(choices[0])
    const data=[
        {id:1, libelle:"ravitaillement", date:"20-05-2023"}, {id:2, libelle:"voyage", date:"10-10-2023"},
        {id:3, libelle:"fête noel", date:"02-02-2023"}, {id:4, libelle:"aliment", date:"01/01-2022"},
        {id:5, libelle:"fête paques", date:"05-08-2023"}, {id:6, libelle:"toilettes", date:"01-01-2023"},
        {id:7, libelle:"fête tabaski", date:"02-07-2023"}, {id:8, libelle:"deco", date:"01-01-2023"},
        {id:9, libelle:"fête 31", date:"02-10-2022"}, {id:10, libelle:"maquillage", date:"01-01-2023"},
        {id:11, libelle:"fête tabasqui", date:"02-07-2022"}, {id:12, libelle:"deco", date:"01-01-2022"},
    ]
    const head=["libelle", "date"]

    function handleDetail(id){
        console.log("detail "+id)
    }
    function handleDelete(id){
        console.log("delete "+id)
    }
    function handleNew(){
        console.log("new ")
    }
    const buttons=[{label:"table-edit", action: handleDetail, color:"skyblue"}, {label:"table-remove", action: handleDelete, color:"red"}]

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
            backgroundColor: theme,
        },
        title:{
            borderRadius: 20,
            margin: 15,
            display:"flex",
            justifyContent:"space-between",
            flexDirection:"row"
        }
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.title}>
                <SelectDropdown buttonStyle={{borderRadius: 20, height: "100%"}}
                    defaultValue={choix} data={choices}
                    onSelect={(selectedItem, index) => {
                        setChoix(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                    renderDropdownIcon={()=>{return <MaterialCommunityIcons name={ "filter-plus" } color={chart} size={30}  />}}
                />
                <TouchableOpacity onPress={handleNew}>
                    <MaterialCommunityIcons name={"plus-box"} color={chart} size={30}  />
                </TouchableOpacity>
            </View>
            <View>
                <Table head={head} data={data} buttons={buttons}  filter={choix} />
            </View>

        </ScrollView>
    );
}


