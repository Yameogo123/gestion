
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons"
import Setting from "../setting";
import { FavoritePharmStack, HomePharmStack, HomeStack, SettingPharmStack, StockPharmStack } from "./Stack";
import { useSelector } from "react-redux";


export default function PharmNavigation() {
    
    const Tab = createBottomTabNavigator();
    const chart= useSelector((state)=>state.themeReducer.pharm_chart)
    const back= useSelector((state)=>state.themeReducer.back)
    const front= useSelector((state)=>state.themeReducer.front)



    let opt={
        tabBarActiveTintColor:chart,
        tabBarInactiveTintColor: "black",
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
                    backgroundColor: back,
                    borderColor: back,
                },
                headerShown: false,
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen
                name="home" component={HomePharmStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={focused ? chart : front} size={focused ? size+15 : size+5}  />
                    ),
                    ...opt
                }}
            />
            <Tab.Screen
                name="rapport" component={StockPharmStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons name={focused ? "clipboard-text" : "clipboard-text-outline"} color={focused ? chart : front} size={focused ? size+15 : size+5}  />
                    ),
                    ...opt
                }}
            />
            <Tab.Screen
                name="Favorite" component={FavoritePharmStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons name={focused ? "cards-heart": "cards-heart-outline"} color={focused ? chart : front} size={focused ? size+15 : size+5} />
                    ),
                    ...opt

                }}
            />
            <Tab.Screen
                name="Star" component={Setting}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "star": "star-outline"} color={focused ? chart : front} size={focused ? size+15 : size+5} />
                    ),
                    ...opt

                }}
            />
            <Tab.Screen
                name="Setting" component={SettingPharmStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "settings" : "settings-outline"} color={focused ? chart : front} size={focused ? size+15 : size+5} />
                    ),
                    ...opt

                }}
            />
        </Tab.Navigator>
    )
}
