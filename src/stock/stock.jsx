import 'react-native-gesture-handler';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback, Modal, Pressable, Alert } from 'react-native';
import { Keyboard } from 'react-native';
import { medicament } from '../../assets/data/medicaments';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function Stock({navigation}) {

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const user= useSelector((state)=>state.userReducer.user)
    const chart= useSelector((state)=>state.themeReducer.pharm_chart)
    const [selected, setSelected] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch= useDispatch()
    const route= useRoute()
    const [elements, setElement]= useState([])

    function manual(){
        setModalVisible(!modalVisible)
        navigation.navigate("produit-add")
    }

    useEffect(() => {
        setSelected(null)
        if(user?.profil==="pharmacie"){
            medicament.map((item, id)=>medicament[id]["name"]=item.libelle)
            setElement(medicament)
        }
    }, [])
    


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme,
            paddingBottom: 70
            //alignItems: 'center',
            //justifyContent: 'center',
        },
        add:{
            position: "absolute", bottom: 20, right: 20, backgroundColor: chart, padding: 10, borderRadius: 20
        },
        title:{
            textAlign: "center", fontSize: 17
        },
        modalView: {
            margin: 20, backgroundColor: "snow", borderRadius: 20, padding: 25,
            alignItems: "center", shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25, shadowRadius: 4, elevation: 5
        },
    });

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={styles.container}>

                <View>
                    <SearchableDropdown 
                        onItemSelect={(item) => {
                            setSelected(item)
                        }}
                        containerStyle={{ padding: 20, marginTop: 20 }}
                        onRemoveItem={(item, index) => {
                            setSelected({})
                        }}
                        itemStyle={{
                            padding: 10, marginTop: 2, backgroundColor: '#ddd',
                            borderColor: '#bbb', borderWidth: 1, borderRadius: 10,
                        }}
                        itemTextStyle={{ color: chart }} itemsContainerStyle={{ maxHeight: 150 }} items={elements}
                        defaultIndex={2} resetValue={false}
                        textInputProps={
                            {
                                placeholder: "choisir un élément", underlineColorAndroid: "transparent",
                                style: {
                                    padding: 15, borderWidth: 1,
                                    borderColor: theme, borderRadius: 5, width: "100%",backgroundColor:chart
                                },
                                //onTextChange: text => alert(text)
                            }
                        }
                        listProps={{nestedScrollEnabled: true}}
                    />
                </View>

                {selected  && <View style={styles.flatlist}>
                    <Text style={styles.title}>Le stock de : {selected?.name}</Text>
                    <View style={styles.top}>
                        
                    </View>
                </View>}

                <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons name={"pen"} size={30} color={"white"}  />
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
        
    )
}