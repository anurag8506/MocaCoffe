
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Singnup from './Signup';


const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
   <Image style={styles.profileImage} source={require('../../assets/Splash.png')}
      />
      <Text style={styles.mocaText}>moca</Text>
      <Text style={styles.coffeeText}>coffee</Text>
      <TouchableOpacity 
     style={{
    borderRadius: 8,
    backgroundColor: 'rgba(64, 17, 13, 1)',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    height:53,
    width:353,
    marginTop:150,
    
    justifyContent: 'center',
    width:"90%"
  }}
  onPress={() => navigation.navigate('Signup')}
>
  <Text style={{color: 'white',}}>Create an Account </Text>
</TouchableOpacity>
<TouchableOpacity 
 onPress={() => navigation.navigate('Login')}>
<Text style ={{ color:'#40110D',}}>Login</Text>

</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',

  },
  profileImage: {
    // width: 220,
    // height: 140,
    borderRadius: 50,
    marginTop:100,
  },
  mocaText: {
    fontSize: 30,
    fontWeight: 'bold',
    // marginTop: 10,
    color:'#40110D',
  
    
  },
  coffeeText: {
    fontSize: 30,
    // marginTop: 10,
    fontWeight: 'bold',
    color:'#40110D',
  
 
  },


});

export default SplashScreen;
