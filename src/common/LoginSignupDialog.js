import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginSignupDialog=({onCancle,onClickLoginSign,visible})=> {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <Text style={styles.msg}>{"want to add product in cart ?\n  Please login or Sign up"}
          
          </Text> 
          <TouchableOpacity style={styles.loginSignUp}
          onPress={()=>{
            onClickLoginSign()
          }}
          >
            <Text style={styles.btntext}>Login or SignUp</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={[styles.loginSignUp,{backgroundColor:'gray' ,marginBottom:10}]}
            onPress={()=>{
              onCancle()
            }}
            >
            <Text style={styles.btntext}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default  LoginSignupDialog;
const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)', 
    justifyContent:'center',
    alignItems:'center',

  },
  mainView: {
    width: '90%',
 
    backgroundColor:'white',
    borderRadius:10,
    justifyContent:'center',
    marginTop:90,

  },
  msg: {
    color: 'black',
    width: '80%',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop:20,
  },
  loginSignUp:{
  width:'90%',
  height:50,
  backgroundColor:'purple',
  marginTop:20,
  alignSelf:'center',
  justifyContent:'center',
  borderRadius:20,
  alignItems:'center',
  },
  btntext:{
    color:'white',
    fontSize:18,
    fontWeight:'600'
  }
})