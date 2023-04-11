import 'react-native-gesture-handler';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableWithoutFeedback, Modal, Pressable, Alert } from 'react-native';
import { Keyboard } from 'react-native';
import { medicament } from '../../../assets/data/medicaments';


export default function Produit({navigation}) {

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.pharm_chart)
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(1);
    const [arch, setArch] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch= useDispatch()
    const route= useRoute()
    const [produits, setProduits]= useState(medicament)

    function handleSort(){
        setSort(sort === -1 ? 1: -1)
        let x= produits.sort((a, b)=> {
            let fa = a.libelle.toLowerCase(),
                fb = b.libelle.toLowerCase();

            if (fa < fb) {
                return -sort;
            }
            if (fa > fb) {
                return sort;
            }
            return 0;
        })
        setProduits(x); 
    }

    function archive(){
        setArch(arch === 1 ? 0: 1)
    }

    function manual(){
        setModalVisible(!modalVisible)
        navigation.navigate("produit-add")
    }

    function update(prod) {
        navigation.navigate("produit-add", {produit: prod})
    }

    function pop() {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide" transparent={true} visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Choisir la catégorie</Text>
                            <View>
                                <TouchableOpacity style={styles.modalView}>
                                    <Text>Importer sa base de donnée</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalView} onPress={manual}>
                                    <Text>Ajouter manuellement</Text>
                                </TouchableOpacity>
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    useEffect(() => {

    }, [])
    


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme,
            paddingBottom: 70
            //alignItems: 'center',
            //justifyContent: 'center',
        },
        top: {
            display: "flex", flexDirection: "row", justifyContent:"space-between", 
            alignItems: "center", paddingTop: 10
        },
        card:{
            //shadowColor: chart, 
            backgroundColor: "snow",
            shadowRadius: 25, padding: 10, borderRadius: 20, margin: 5
        },
        flatlist:{
            //alignItems: "center",
            marginTop: 20,
            //flex: 1
        },
        image:{
            width: 100, height: 100
        },
        add:{
            position: "absolute", bottom: 20, right: 20, backgroundColor: chart, padding: 10, borderRadius: 20
        },
        title:{
            textAlign: "center", fontSize: 17
        },
        centeredView: {
            flex: 1, 
            justifyContent: "center", 
            alignItems: "center", 
            marginTop: 2,
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
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2
        },
        buttonOpen: {
            backgroundColor: chart,
        },
        buttonClose: {
            backgroundColor: chart,
        },
        archive:{
            position: "absolute", bottom: 90, right: 20, backgroundColor: "red", padding: 10, borderRadius: 20
        },
    });

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={styles.container}>

                <View style={styles.top}>
                    <Searchbar style={{width: "500%"}} placeholder='filtrer vos produits' onChangeText={(text)=>setSearch(text)} 
                        enablesReturnKeyAutomatically  />
                    <TouchableOpacity onPress={handleSort}>
                        <MaterialCommunityIcons name={"filter-variant"} size={40} color={chart}  />
                    </TouchableOpacity>
                </View>

                {arch === 1 && <Text style={[styles.title,{color:"red"}]}>Liste des médicaments archivés</Text>}

                <View style={styles.flatlist}>
                    <FlatList numColumns={3}  data={produits?.filter((item)=>item?.archive===arch)?.filter((item)=>item?.libelle.includes(search.toLowerCase()))} 
                    showsVerticalScrollIndicator={false} keyExtractor={(item)=> item.id} scrollEnabled
                    renderItem={({item})=>{
                        return <TouchableOpacity style={styles.card} onPress={()=> update(item)}>
                            <Image style={styles.image} />
                            <Text style={styles.title}>{item.libelle}</Text>
                            <View style={styles.top}>
                                <Text style={{fontSize: 10}}>{item.pu} XOF</Text>
                                <Text style={{fontSize: 10}}>{item.qte}</Text>
                            </View>
                        </TouchableOpacity>
                    }} />
                </View>

                {pop()}

                <TouchableOpacity style={styles.archive} onPress={archive}>
                    <MaterialCommunityIcons name={"archive-eye"} size={40} color={"white"}  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons name={"plus"} size={40} color={"white"}  />
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
        
    )
}