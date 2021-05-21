import React ,{createContext,useReducer}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screen/Home'
import Contants from 'expo-constants'
import Createemployee from './screen/Createemployee'
import Prof from './screen/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer,initstate} from './reducers/reducer'

// export const mycontext=createContext()

const store=createStore(reducer)

const Stack=createStackNavigator()
const navbar={
  title:"Home",
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"#be5fe3"
  }
}

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={navbar} />
        <Stack.Screen name="CreateProfile" component={Createemployee} options={{...navbar,title:"Create Profile"}} />
        <Stack.Screen name="Profile" component={Prof} options={{...navbar,title:"View Profile"}}/>
      </Stack.Navigator>
      {/* <Home /> */}
      {/* <Createemployee /> */}
      {/* <Prof /> */}
    </View>
  );
}

export default ()=>{
  //const [state,dispatch]=useReducer(reducer,initstate)
  return(
    // <mycontext.Provider value={
    //   {state,dispatch}
    // }>
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
    // </mycontext.Provider>
  )
} 

const styles = StyleSheet.create({
  container: {
   flex:1
  },
});
