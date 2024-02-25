import { View, Text, StyleSheet, Dimensions,} from 'react-native'
import React from 'react'
import { THEME_COLOR } from '../utils/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomButton = ({title ,onClick}) => {
  return (
    <View style={styles.btn} >
        <TouchableOpacity onPress={()=>{
            onClick();
        }}>
      <Text style={{color:'white'}} >{title}</Text>

        </TouchableOpacity>
    </View>
  )
}

export default CustomButton;
const styles =StyleSheet.create({
    btn:{
        width:Dimensions.get('window').width-50,
        height:50,
        backgroundColor:'#40110D',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:20,
        borderRadius:10,
    }
})