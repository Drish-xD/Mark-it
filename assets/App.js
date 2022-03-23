import React , {useEffect,useState}from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Home,
  CompanyLogin,
  CompanyRegister,
  Main,
  AdminLogin,
  AdminRegister,
  Admin,
  AddUser,
  Sucess,
} from "./screens";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const App = () => {
  
  const [cred,setCred]=useState(null);
  useEffect(()=>{
    getData();
  },[]);
  
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Credential')
      if(value !== null) {
        setCred(value);
      }
    } catch(e) {
      console.warn(e);
    }
  };

 console.log(cred);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName={
          cred?"Home":"Main"
        }
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="CompanyLogin" component={CompanyLogin} />
          <Stack.Screen name="CompanyRegister" component={CompanyRegister} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="AdminRegister" component={AdminRegister} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="AddUser" component={AddUser} />
          <Stack.Screen name="Sucess" component={Sucess} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
