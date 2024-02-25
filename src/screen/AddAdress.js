import { View, Text, StyleSheet ,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import Loader from '../Componets/Loader';
const AddAdress = () => {
    const navigation = useNavigation();
    const [street, setStreet]=useState('')
    const [pincode, setPincode]=useState('')
    const [city, setCity]=useState('')
    const [state, setState]=useState('')
    const [visible, setVisible]=useState(false)

const saveAddress= async()=>{
    setVisible(true)
    const id=await AsyncStorage.getItem('USERID')
    const addressId=uuid.v4()
    firestore().collection("address").doc(addressId).set({
       addedBy:id,
       addressId:addressId,
       street:street,
       city:city,
       pincode:pincode,
       state:state,
       default:false,
    }).then(res=>{
setVisible(false)
navigation.goBack()
    }).catch(error=>{
        setVisible(false)
        console.log(error)
    })

}
  return (
    <View style={styles.container}>
    {/* <TextInput value={street} onChangeText={(txt)=>setStreet(txt)} style={styles.input} placeholder='Enter Your Address'/>
    <TextInput value={city} onChangeText={(txt)=>setCity(txt)} style={styles.input} placeholder='City'/>
    <TextInput value={state} onChangeText={(txt)=>setState(txt)}  style={styles.input} placeholder='Sate'/>
    <TextInput value={pincode} onChangeText={(txt)=>setPincode(txt)} style={styles.input} keyboardType='number-pad' placeholder='Pin code'/> */}
    <TextInput 
  value={street} 
  onChangeText={(txt)=>setStreet(txt)} 
  style={{...styles.input, color: 'black'}} 
  placeholder='Enter Your Address'
  placeholderTextColor='black'
/>
<TextInput 
  value={city} 
  onChangeText={(txt)=>setCity(txt)} 
  style={{...styles.input, color: 'black'}} 
  placeholder='City'
  placeholderTextColor='black'
/>
<TextInput 
  value={state} 
  onChangeText={(txt)=>setState(txt)}  
  style={{...styles.input, color: 'black'}} 
  placeholder='State'
  placeholderTextColor='black'
/>
<TextInput 
  value={pincode} 
  onChangeText={(txt)=>setPincode(txt)} 
  style={{...styles.input, color: 'black'}} 
  keyboardType='number-pad' 
  placeholder='Pin code'
  placeholderTextColor='black'
/>

    <TouchableOpacity style={styles.addNewbn}
     onPress={() => saveAddress()}>
<Text style={styles.title}>Save Address</Text>
<Loader visible={visible} />
     </TouchableOpacity>
    </View>
  )
}

export default AddAdress;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white'
    
    },
    input:{
        width:'90%',
        height:50,
        borderWidth:.5,
        borderRadius:10,
        marginTop:20,
        alignSelf:'center',
        paddingLeft:10,
        paddingRight:10,
        color: '#40110D',
    },
    addNewbn:{
        backgroundColor:'#40110D',
        height:50,
        width:'90%',
        alignSelf:'center',
        bottom:10,
        borderRadius:10,
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center',
        marginTop:50,
    },
    title:{
        color:'white',
        fontSize:16,
        
    }

})