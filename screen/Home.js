import React,{useState,useEffect, useContext} from 'react';
import {StyleSheet,Text,View,Image,FlatList,Alert} from 'react-native';
import {Card,FAB} from 'react-native-paper'
import {useSelector,useDispatch} from 'react-redux'
//import {mycontext} from '../App'
 
function Home(props){

    // const [data,setdata]=useState([])
    // const [loading,setloading]=useState(true)

    const {data,loading}=useSelector((state)=>{
        return state
    })

    const dispatch=useDispatch()

    // const {state,dispatch}=useContext(mycontext)
    // const {data,loading}=state


    const fetchdata=()=>{
        fetch("http://5e2271403275.ngrok.io/")
        .then(res=>res.json())
        .then(results=>{
            // setdata(results) 
            // setloading(false)
            dispatch({type:"ADD_DATA",payload:results})
            dispatch({type:"SET_LOADING",payload:false})
        }).catch(err=>Alert.alert("something went wrong",err))
    }

    useEffect(()=>{
        fetchdata()
    },[])

    const looper=(item)=>{
        return(
                <Card style={styles.hi} onPress={()=>props.navigation.navigate("Profile",{item})}>
                    <View style={styles.hello}>
                        <Image style={{width:70,height:70,borderRadius:35}}
                        source={{uri:item.photo}}
                        />
                        <View>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.text}>{item.position}</Text>
                        </View>
                    </View>
                </Card>
    )
    }
    return(
        <View style={{flex:1}}>
            {
                <FlatList
                    data={data}
                    renderItem={({item})=>{
                        return looper(item)
                    }}
                    keyExtractor={(item)=>item._id}
                    onRefresh={()=>fetchdata()}
                    refreshing={loading}
                />
            }
            <FAB onPress={()=>props.navigation.navigate("CreateProfile")}
                style={styles.fab}
                theme={{colors:{accent:"#be5fe3"}}}
                small={false}
                icon="plus"
            />
        </View>
    )
}

const styles=StyleSheet.create({
    hi:{
        margin:5,
        padding:5,
    },
    hello:{
        flexDirection:'row',
        padding:7
    },
    text:{
        fontSize:15,
        paddingLeft:10,
        paddingTop:10
    },
    fab:{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})

export default Home