import { createStackNavigator } from '@react-navigation/stack';
import Home from '../home';
import Login from '../security/login';
import Page1 from '../welcome/page1';
import Page2 from '../welcome/page2';
import Register from '../security/register';
import Page3 from '../welcome/page3';
import Interest from '../welcome/interest';
import Course from '../personnel/course';
import Abonnement from '../personnel/abonnement';
import Portefeuille from '../portefeuille/portefeuille';
import Member from '../member/member';
import Page4 from '../welcome/page4';
import Intro1 from '../pharmacie/intro/intro1';
import Intro2 from '../pharmacie/intro/intro2';
import RegisterPharm from '../security/register-pharm';
import Intro3 from '../pharmacie/intro/intro3';
import HomePharm from '../pharmacie/home';
import Produit from '../pharmacie/home/produit';
import ProduitAdd from '../pharmacie/home/produit.add';
import Stock from '../stock/stock';



const screenOpt={
    //headerShown: false,
    cardStyle: {
        backgroundColor: 'transparent',
        animationEnabled: false
    },
}

export function PreStack(){
    const stack= createStackNavigator()

    return <stack.Navigator
        initialRouteName='page1'
        screenOptions={{
            ...screenOpt
        }}
    >
        <stack.Screen name='page1' component={Page1} />
        <stack.Screen name='page2' component={Page2} />
        <stack.Screen name='login' component={Login} />
        <stack.Screen name='register' component={Register} />
        <stack.Screen name='page3' component={Page3} />
        <stack.Screen name='page4' component={Page4} />
        <stack.Screen name='interest' component={Interest} />
        <stack.Screen name='intro1' component={Intro1} />
        <stack.Screen name='intro2' component={Intro2} />
        <stack.Screen name='intro3' component={Intro3} />
        <stack.Screen name='register-pharm' component={RegisterPharm} />
    </stack.Navigator>
}




// PERSONNEL
export function HomeStack(){
    const stack= createStackNavigator()

    return (<stack.Navigator
        initialRouteName='accueil'
        screenOptions={{
            ...screenOpt
        }}>
        <stack.Screen name='accueil' component={Home} />
        <stack.Screen name='course' component={Course} />
        <stack.Screen name='abonnement' component={Abonnement} />
        <stack.Screen name='portefeuille' component={Portefeuille} />
        <stack.Screen name='personnel' component={Member} />
    </stack.Navigator>)
}

export function SettingStack(){
    const stack= createStackNavigator()
}


export function FavoriteStack(){
    const stack= createStackNavigator()
}




// PHARMACIE
export function HomePharmStack(){
    const stack= createStackNavigator()

    return (<stack.Navigator
        initialRouteName='accueil'
        screenOptions={{
            ...screenOpt
        }}>
        <stack.Screen name='accueil' component={HomePharm} />
        <stack.Screen name='produit' component={Produit} />
        <stack.Screen name='portefeuille' component={Portefeuille} />
        <stack.Screen name='personnel' component={Member} />
        <stack.Screen name='produit-add' component={ProduitAdd} />
    </stack.Navigator>)
}

export function SettingPharmStack(){
    const stack= createStackNavigator()
}

export function StockPharmStack(){
    const stack= createStackNavigator()
    return (<stack.Navigator
        initialRouteName='stock'
        screenOptions={{
            ...screenOpt
        }}>
        <stack.Screen name='stock' component={Stock} />
    </stack.Navigator>)
}

export function FavoritePharmStack(){
    const stack= createStackNavigator()
}


