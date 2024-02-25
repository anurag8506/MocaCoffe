// // import { View, Text, StyleSheet ,Dimensions,TextInput,useColorScheme} from 'react-native'
// import React from 'react'

// const CustomTextInput = ({placeholder,value,onChangeText,type,placeholderTextColor}) => {
//   return (
//     <View style={styles.input}>
//       <TextInput  
//         style={{color: '#40110D'}}
//         placeholder={placeholder}
//         placeholderTextColor={placeholderTextColor}
//         value={value}
//         keyboardType={type ? type :'default'}
//         onChangeText={txt=> {
//           onChangeText(txt);
//         }}
//       />
//     </View>
//   )
// }

// export default CustomTextInput;
// const styles =StyleSheet.create({
//     input:{
//       width:Dimensions.get('window').width-50,
//         height:50,
//         borderWidth:.5,
//         borderRadius:10,
//         alignSelf:'center',
//         margin:20,
//         paddingLeft:20,
//         color: '#40110D'
//     }
// })

import { View, Text, StyleSheet ,Dimensions,TextInput,useColorScheme} from 'react-native'
import React from 'react'

const CustomTextInput = ({placeholder,value,onChangeText,type,placeholderTextColor}) => {
  return (
    <View style={styles.input}>
      <TextInput  
        style={{color: '#40110D'}}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        keyboardType={type ? type :'default'}
        onChangeText={txt=> {
          onChangeText(txt);
        }}
      />
    </View>
  )
}

export default CustomTextInput;
const styles =StyleSheet.create({
    input:{
      width:Dimensions.get('window').width-50,
        height:50,
        borderWidth:.5,
        borderRadius:10,
        alignSelf:'center',
        margin:20,
        paddingLeft:20,
        color: '#40110D'
    }
})
