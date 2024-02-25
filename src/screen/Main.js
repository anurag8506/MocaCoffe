import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Home from '../tab/Home';
import Search from '../tab/Search';
import Cart from '../tab/Cart';
import Wishlist from '../tab/Wishlist';
import User from '../tab/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSignupDialog from '../common/LoginSignupDialog';
import Order from '../tab/Order';
import { SvgUri } from 'react-native-svg';

const Main = ({route}) => {
  const [userName, setUserName] = useState(''); // Declare a state variable for userName
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    // Retrieve userName from AsyncStorage
    AsyncStorage.getItem('userName').then(value => {
      if (value !== null) {
        setUserName(value);
      }
    });
  }, []);

  // ...existing code...

  return (
    <View style={styles.container}>
      {activeTab == 0 ? (
        <Home userName={userName} /> // Pass userName to Home
      ) : activeTab == 1 ? (
        <Search />
      ) : activeTab == 2 ? (
        <Order />
      ) : activeTab == 3 ? (
        <Wishlist />
      ) : (
        <User />
      )}
      
      {/* <TouchableOpacity   onPress={() => navigation.navigate('Cart')}>
        <Image source={require('../../assets/Carts.png')}  style={{right:0, position:'absolute', padding:10,margin:10}}/>
        </TouchableOpacity> */}

      <View style={styles.bottomView}>
    
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setActiveTab(0);
          }}>
          <Image
            source={require('../../assets/Home.png')}
            style={[
              styles.tabIcon,
              {tintColor: activeTab == 0 ? '#E4B88A' : 'white'},
            ]}
          />
          <Text style={{color: activeTab == 0 ? '#E4B88A' : 'white'}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setActiveTab(1);
          }}>
          <Image
            source={require('../../assets/Search.png')}
            style={[
              styles.tabIcon,
              {tintColor: activeTab == 1 ? '#E4B88A' : 'white'},
            ]}
          />
          <Text style={{color: activeTab == 1 ? '#E4B88A' : 'white'}}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setActiveTab(2);
          }}>
          <Image
            source={require('../../assets/Order11.png')}
            style={[
              styles.tabIcon,
              {tintColor: activeTab == 2 ? '#E4B88A' : 'white'},
            ]}
          />
          <Text style={{color: activeTab == 2 ? '#E4B88A' : 'white'}}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setActiveTab(3);
          }}>
          <Image
            source={require('../../assets/Account.png')}
            style={[
              styles.tabIcon,
              {tintColor: activeTab == 3 ? '#E4B88A' : 'white'},
            ]}
          />
          <Text style={{color: activeTab == 3 ? '#E4B88A' : 'white'}}>Account</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
};



export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    elevation: 90,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    textAlignVertical:'center',
 
  },
  tab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    padding:10,
  },
  tabIcon: {
    width: 28,
    height: 30,
    marginTop:10,
    marginBottom:5,
  },
});
