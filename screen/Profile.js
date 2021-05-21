import React from 'react'
import {StyleSheet,Text,View,Image,Linking,Platform,Alert} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {Title,Card,Button} from 'react-native-paper'
import { MaterialIcons,Entypo } from '@expo/vector-icons'

const Prof=(props)=>{
    const {_id,name,position,email,phone,salary,age,photo} = props.route.params.item

    const dial=()=>{
        if(Platform.OS =="android"){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`tel:${phone}`)
        }
    }
    const deleteemp=()=>{
        fetch("http://5e2271403275.ngrok.io/delete",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        }).then(res=>res.json)
        .then(data=>{
            Alert.alert(`${data.name} deleted`)
            props.navigation.navigate("Home")
        }).catch(err=>Alert.alert("something went wrong"))
    }

    return(
        <View style={styles.pro}>
            <LinearGradient
                colors={["#cc00ff","#e7a6f7"]}
                style={{height:'20%'}}
            />
            <View style={styles.icon}>
                <Image style={{width:120,height:120,borderRadius:60}}
                source={{uri:photo}}
                />
            </View>
            <View style={{alignItems:"center",padding:3}}>
                <Title>{name}</Title>
                <Text>{position}</Text>
            </View>
            <Card style={{margin:6}} onPress={()=>{Linking.openURL(`mailto:${email}`)}}>
                <View style={styles.cardd}>
                    <MaterialIcons
                        name="email"
                        size={18}
                        color="#e7a6f7"
                    />
                    <Text style={styles.letter}>{email}</Text>
                </View>
            </Card>
            <Card style={{margin:6}} onPress={()=>dial()}>
                <View style={styles.cardd}>
                    <Entypo
                        name="phone"
                        size={18}
                        color="#e7a6f7"
                    />
                    <Text style={styles.letter}>{phone}</Text>
                </View>
            </Card>
            <Card style={{margin:6}}>
                <View style={styles.cardd}>
                    <MaterialIcons
                        name="attach-money"
                        size={18}
                        color="#e7a6f7"
                    />
                    <Text style={styles.letter}>{salary}</Text>
                </View>
            </Card>
            <Card style={{margin:6}}>
                <View style={styles.cardd}>
                    <MaterialIcons
                        name="person"
                        size={18}
                        color="#e7a6f7"
                    />
                    <Text style={styles.letter}>{age}</Text>
                </View>
            </Card>
            <View style={styles.butto}>
                <Button icon="account-edit" theme={theme} mode="contained" onPress={()=>
                    props.navigation.navigate("CreateProfile",{_id,name,position,email,phone,salary,age,photo})
                    }>
                    Edit Profile
                </Button>
                <Button icon="delete" theme={theme} mode="contained" onPress={()=>deleteemp()}>
                    Delete Profile
                </Button>
            </View>
        </View>
    )
}
const theme={
    colors:{
        primary:"#e7a6f7"
    }
}

const styles=StyleSheet.create({
    pro:{
        flex:1
    },
    icon:{
        alignItems:'center',
        marginTop:-60
        
    },
    cardd:{
        margin:10,
        flexDirection:'row'
    },
    letter:{
        paddingLeft:7,
        fontSize:15
    },
    butto:{
        justifyContent:"space-around",
        flexDirection:"row",
        marginTop:15
    }
})

export default Prof