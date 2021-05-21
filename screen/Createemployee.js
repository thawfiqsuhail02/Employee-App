import React,{useState} from 'react'
import {StyleSheet,Text,View,Modal,Alert,KeyboardAvoidingView} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import * as Permissions from 'expo-permissions'
import * as Imagepicker from 'expo-image-picker'

const Createemployee= ({navigation,route})=>{

    const updatedetails=(type)=>{
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "age":
                    return route.params.age
                case "photo":
                    return route.params.photo
                case "position":
                    return route.params.position
                case "salary":
                    return route.params.salary
            }
        }
        else{
            return ""
        }
    }

    const [name,setname]=useState(updatedetails("name"))
    const [phone,setphone]=useState(updatedetails("phone"))
    const [email,setemail]=useState(updatedetails("email"))
    const [age,setage]=useState(updatedetails("age"))
    const [salary,setsalary]=useState(updatedetails("salary"))
    const [photo,setphoto]=useState(updatedetails("photo"))
    const [position,setposition]=useState(updatedetails("position"))
    const [modal,setmodal]=useState(false)
    const [enableshift,setenableshift]=useState(false)

    const submitdata=()=>{
        fetch("http://5e2271403275.ngrok.io/send",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,
                position,
                email,
                salary,
                phone,
                age,
                photo
            })
        }).then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved succesfully`)
            navigation.navigate("Home")
        }).catch(err=>Alert.alert("something uploading",err))
    }

    const gallerypicker=async()=>{
        const granted=await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
             let data= await Imagepicker.launchImageLibraryAsync({
                 mediaTypes:Imagepicker.MediaTypeOptions.Images,
                 quality:0.8,
                 allowsEditing:true,
                 aspect:[1,1]
                })
             if(!data.cancelled){
                let file={
                    uri:data.uri,
                    type:'test/${data.uri.string.length-1}',
                    name:'test.${data.uri.string.length-1}',
                }
                uploader(file)
            }
        }
        else{Alert.alert("Sorry! we need access to your Gallery for uploading photos")}
    }
    const camerapicker=async()=>{
        const granted=await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
             let data=await Imagepicker.launchCameraAsync({
                 mediaTypes:Imagepicker.MediaTypeOptions.Images,
                 quality:0.8,
                 allowsEditing:true,
                 aspect:[1,1]
                })
            if(!data.cancelled){
                let file={
                    uri:data.uri,
                    type:'test/${data.uri.string.length-1}',
                    name:'test.${data.uri.string.length-1}',
                }
                uploader(file)
            }
        }
        else{Alert.alert("Sorry! we need access to your Camera for uploading photos")}
    }

    const uploader=(image)=>{
        const data=new FormData()
        data.append('file',image)
        data.append('upload_preset',"Employeeapp")
        data.append('cloud_name',"cheekyboi")
        fetch("https://api.cloudinary.com/v1_1/cheekyboi/image/upload",{
            method:"post",
            body:data
        }).then((res)=>res.json())
        .then(data=>{
            console.log(data)
            setphoto(data.url)
            setmodal(false)
        }).catch(err=>Alert.alert("error uploading image",err))
    }

    const updateemp=()=>{
        fetch("http://5e2271403275.ngrok.io/update",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                name,
                position,
                email,
                salary,
                phone,
                age,
                photo
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is updated succesfully`)
            navigation.navigate("Home")
        })
        
    }

    return(
        <KeyboardAvoidingView behavior="position" enabled={enableshift} style={styles.inp}>
            <View>
                <TextInput
                    label='Name'
                    value={name}
                    mode="outlined"
                    onFocus={()=>setenableshift(false)}
                    onChangeText={(text)=>setname(text)}
                />
                <TextInput
                    label='Position'
                    value={position}
                    mode="outlined"
                    onFocus={()=>setenableshift(false)}
                    onChangeText={(text)=>setposition(text)}
                />
                <TextInput
                    label='Mobile Number'
                    keyboardType="number-pad"
                    value={phone}
                    mode="outlined"
                    onFocus={()=>setenableshift(false)}
                    onChangeText={(text)=>setphone(text)}
                />
                <TextInput
                    label='EmailID'
                    value={email}
                    mode="outlined"
                    onFocus={()=>setenableshift(false)}
                    onChangeText={(text)=>setemail(text)}
                />
                <TextInput
                    label='Age'
                    value={age}
                    mode="outlined"
                    keyboardType="number-pad"
                    onFocus={()=>setenableshift(true)}
                    onChangeText={(text)=>setage(text)}
                />
                <TextInput
                    label='Salary'
                    value={salary}
                    mode="outlined"
                    keyboardType="number-pad"
                    onFocus={()=>setenableshift(true)}
                    onChangeText={(text)=>setsalary(text)}
                />
                <Button style={styles.picb} icon={photo==""?"upload":"check"} mode="contained" onPress={()=>setmodal(true)}>
                    {photo==""?"upload Image":"uploaded image"}
                </Button>
                {
                    route.params?
                    <Button icon="book" mode="outlined" onPress={()=>updateemp()}>
                        Update profile 
                    </Button>:
                    <Button icon="book" mode="outlined" onPress={()=>submitdata()}>
                        Save 
                    </Button>
                }

                <Modal 
                animationType='fade' 
                transparent={true}
                visible={modal} 
                onRequestClose={()=>{setmodal(false)}}
                >
                    <View style={styles.view}>
                        <View style={styles.butto}>
                            <Button icon="camera" mode="contained" onPress={()=>camerapicker()}>
                                Camera
                            </Button>
                            <Button icon="google-photos" mode="contained" onPress={()=>gallerypicker()}>
                                Gallery
                            </Button>
                        </View>
                        <Button style={styles.rad} icon="door" mode="outlined" onPress={()=>setmodal(false)}>
                            Cancel Image
                        </Button>
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles=StyleSheet.create({
    inp:{
        flex:1,
        margin:9
    },
    picb:{
        margin:10
    },
    butto:{
        flexDirection:"row",
        justifyContent:'space-around',
        padding:20
    },
    view:{
        position:'absolute',
        bottom:0,
        top:'82%',
        width:'100%',
        backgroundColor:"#eddbf4"
    },
    rad:{
        width:'70%',
        marginLeft:50    }
})

export default Createemployee