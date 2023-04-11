import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, Keyboard, View, Image,
    TouchableWithoutFeedback, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeHeader from "../../template/HomeHeader";
import { TextInput } from "@react-native-material/core";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';


export default function ProduitAdd({navigation}){

    const theme= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)
    const chart= useSelector((state)=>state.themeReducer.pharm_chart)

    const route= useRoute()
    const prod= route.params?.produit

    const [ pu, setPu] = useState(prod?.pu || '');
    const [ libelle, setLibelle] = useState(prod?.libelle || '');
    const [ qte, setQte] = useState(prod?.qte || '');
    const [ peremption, setPeremption] = useState(prod?.peremption || '');
    const [ remarque, setRemarque] = useState(prod?.remarque || '');
    const [ posologie, setPosologie] = useState(prod?.posologie || '');
    const [image, setImage] = useState(null);
    
    const [ message, setMessage] = useState('');
    const dispatch= useDispatch()
    

    useEffect(()=>{
        navigation.setOptions({
            header: ()=> {
                return <HomeHeader logo={false} />
            },
            headerShown: true
        })
        const time= setTimeout(()=>setMessage(""), 3000)
        return () => clearTimeout(time);
    },[message])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            //base64: true
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            //console.log(result)
        }
    };

    function handleClick() {
        if(String(qte)!=="" && String(pu)!=="" && libelle!==""){
            setMessage("")
            const produit={
                libelle: libelle,
                quantite: qte,
                prix: pu,
                peremption: peremption,
                remarque: remarque,
                posologie: posologie,
                archive: 0
            }
            if (prod!==undefined){
                produit["id"]= prod?.id
                produit["archive"]= prod?.archive
                console.log(produit);
            }
            //navigation.navigate("intro2",{produit:produit})
        }else{
            setMessage("saisir les champs étoilés")
        }
    }

    function archiver(archive){
        if(archive===0){
            Alert.alert('archivé et retour à la liste')
        }else{
            Alert.alert('désarchivé et retour à la liste')
        }
        
        //navigation.navigate("produit")
    }

    const showAlert = (archive) =>
    Alert.alert(
        'Attention!',
        archive===0 ?'Voulez vous archiver ce médicament?': 'Voulez vous retirer des archives?',
        [
            {
                text: 'continuer',
                onPress: ()=> archiver(archive),
                style: 'default',
            },
            {
                text: 'annuler',
                style: 'cancel',
            },
        ],
        {
            cancelable: true,
        },
    );

    const styles = StyleSheet.create({
        container: {
          //flex: 1,
          backgroundColor: theme,
          paddingBottom: 150
        },
        text:{
            color: front,
            fontSize: 30,
            textAlign:"center",
            justifyContent: 'center',
            margin: 20,
        },
        input:{
            margin:5,
            padding:5, 
            color: chart,
            backgroundColor:"transparent",
            borderRadius: 10,
        },
        register: {
            //width: "100%", 
            //textAlign: 'center', 
            color:theme, 
            margin: 5,
            fontSize: 17
        },
        btn:{ 
            padding:10, 
            backgroundColor: chart,
            borderRadius: 10,
            //margin:25,
            alignItems: "center"
        },
        add:{
            position: "absolute", top: 20, right: 20, backgroundColor: chart, padding: 10, borderRadius: 20
        },
        btn1:{
            //backgroundColor:front,
            padding: 10,
            borderRadius: 20,
            margin: 15
        },
    });


    const opt={
        mode:'flat', clearButtonMode:"always", style:styles.input,  
        contentStyle:{color:front}, keyboardAppearance:theme==="black" ? "light": "dark",
        variant:"standard", color:chart, placeholderTextColor:front, selectionColor:front,
        enablesReturnKeyAutomatically:true, inputStyle:{color: front}, selectionColor:{chart}
    }

    let behave= Platform.OS ==="ios" ? {
        behavior:"height"
    }: {}

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView {...behave} style={{flex: 1}}>

                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ alignItems:"center", justifyContent:"center"}}>
                        <Text style={styles.text}>Médicament </Text>
                        {prod !== undefined && (prod?.archive===0 ? <TouchableOpacity style={[styles.add,{backgroundColor: "red"}]} onPress={()=>showAlert(prod?.archive)}>
                            <MaterialCommunityIcons name={"archive-plus"} size={30} color={"white"}  />
                        </TouchableOpacity>: <TouchableOpacity style={[styles.add,{backgroundColor: "green"}]} onPress={()=>showAlert(prod?.archive)}>
                            <MaterialCommunityIcons name={"archive-cancel"} size={30} color={"white"}  />
                        </TouchableOpacity>)}
                    </View>

                    <View>

                        {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, marginLeft: 15 }} />}

                        <Button onPress={pickImage} style={styles.btn1} textColor={chart} mode="outlined">
                            choisir une image 📑
                        </Button>

                        <TextInput defaultValue={libelle}
                            placeholder='libellé médicament *' {...opt}
                            onChangeText={(text)=> setLibelle(text)} keyboardType="default"
                            leading={<MaterialCommunityIcons name="pencil-circle" color={chart} size={25} />}
                        />

                        <View style={{display: "flex", flexDirection:"row"}}>
                            <TextInput defaultValue={String(pu)}
                                keyboardType="decimal-pad" inputContainerStyle={{width: 175}}
                                placeholder='prix unitaire *' {...opt} onChangeText={(text)=> setPu(text)}
                                leading={<MaterialCommunityIcons name="cash-multiple" color={chart} size={25} />}
                            />

                            <TextInput defaultValue={String(qte)}
                                keyboardType="numeric" inputContainerStyle={{width: 175}}
                                placeholder='quantité totale *' {...opt} onChangeText={(text)=> setQte(text)}
                                leading={<MaterialCommunityIcons name="pencil-circle" color={chart} size={25} />}
                            />
                        </View>

                        <TextInput defaultValue={posologie}
                            placeholder='la posologie' {...opt} onChangeText={(text)=> setPosologie(text)}
                            leading={<MaterialCommunityIcons name="pencil-circle" color={chart} size={25} />}
                        />

                        <TextInput defaultValue={peremption}
                            dataDetectorTypes={"calendarEvent"} maxLength={8} 
                            placeholder='date de péremption (yy-mm-jj)' {...opt} onChangeText={(text)=> setPeremption(text)}
                            leading={<MaterialCommunityIcons name="calendar" color={chart} size={25} />}
                        />

                        <TextInput defaultValue={remarque}
                            numberOfLines={5} multiline
                            placeholder='remarques importantes' {...opt} onChangeText={(text)=> setRemarque(text)}
                            leading={<MaterialCommunityIcons name="card-bulleted-outline" color={chart} size={25} />}
                        />

                        <Text style={{textAlign: 'center', color:"red", margin:10}}>{message}</Text>   

                    </View>


                    <TouchableOpacity style={styles.btn} onPress={handleClick}>
                        <Text style={styles.register}>enregistrer</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )
}