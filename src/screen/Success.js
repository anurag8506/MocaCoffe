import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Main from './Main';
const Success = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WE MUST SAY</Text>
      <Text style={styles.subHeader}>YOU’VE GREAT CHOICE OF TASTE</Text>
      <Image  source={require('../../assets/Note.png')}
      />
      <Text style={styles.confirmationText}>ORDER CONFIRMED WITH</Text>
      <Text style={styles.deliveryText}>Your ordered will be delivered within 30 minutes at your door</Text>
      <TouchableOpacity 
     style={{
    borderRadius: 8,
    backgroundColor: 'rgba(64, 17, 13, 1)',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    height:53,
    width:353,
    justifyContent: 'center'
  }}
  onPress={() => navigation.navigate('Main')}
>
  <Text style={{color: 'white'}}>Continue Order</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  header: {
    fontSize: 24,
  color:'#AA7C4C',
    textAlign: 'center',
    fontWeight:'400'
  },
  subHeader: {
    fontSize: 20,
    textAlign: 'center',
    color:'#AA7C4C',
    fontWeight:'900'
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 20,
    color:'#AA7C4C',

  },
  deliveryText: {
    fontSize: 16,
    textAlign: 'center',
    alignItems:'center',
    margin: 10,
    color:'#AA7C4C'
  },
  createButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Success;
