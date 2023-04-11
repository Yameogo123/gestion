import React from 'react';
import Navigation from './src/template/BottomTab';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { PreStack } from './src/template/Stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native';
import PharmNavigation from './src/template/BottomPharmTab';

export default function PreApp() {

  DefaultTheme.colors= "white"
  const theme= useSelector((state)=>state.themeReducer.back)
  const user= useSelector((state)=>state.userReducer.user)

  function Redirect(){
    switch (user?.profil) {
      case "pharmacie":
        return <PharmNavigation />
      default:
        return <Navigation />
    }
  }

  return (
      <NavigationContainer theme={theme ==="black" ? DarkTheme : DefaultTheme}>
        <StatusBar style={theme ==="black" ? "light" : "dark"} />
        <SafeAreaView style={{flex:1, backgroundColor:theme}}>
            {user?Redirect(): <PreStack />}
        </SafeAreaView>
      </NavigationContainer>
  );
}
