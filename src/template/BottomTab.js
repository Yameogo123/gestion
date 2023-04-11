import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons"
import Setting from "../setting";
import { HomeStack } from "./Stack";
import { useSelector } from "react-redux";


export default function Navigation() {
    
    const Tab = createBottomTabNavigator();
    const chart= useSelector((state)=>state.themeReducer.chart)
    const back= useSelector((state)=>state.themeReducer.back)


    let opt={
        //tabBarActiveTintColor:chart,
        tabBarInactiveTintColor: back,
        //tabBarLabel: '---',
        //tabBarBadge:"user",
        //tabBarActiveBackgroundColor:"snow",
        headerTransparent: true,
        headerTitleAllowFontScaling:true,
    }
    
    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                tabBarShowLabel: false,
                tabBarStyle:{
                    //position:"absolute",
                    //bottom:40,
                    //left: 20,
                    //right:20,
                    //elevation: 0,
                    backgroundColor: "grey",
                    //borderRadius: 40,
                    //height:50,
                    //...style.shadow,
                    //padding:10,
                    //alignItems:"center"
                },
                headerShown: false
            }}
        >
            <Tab.Screen
                name="home" component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size}  />
                    ),
                    ...opt
                }}
            />
            <Tab.Screen
                name="rapport" component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-text" color={color} size={size}  />
                    ),
                    ...opt
                }}
            />
            <Tab.Screen
                name="Favorite" component={Setting}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cards-heart" color={color} size={size} />
                    ),
                    ...opt

                }}
            />
            <Tab.Screen
                name="Star" component={Setting}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="star" color={color} size={size} />
                    ),
                    ...opt

                }}
            />
            <Tab.Screen
                name="Setting" component={Setting}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" color={color} size={size} />
                    ),
                    ...opt

                }}
            />
        </Tab.Navigator>
    )
}
