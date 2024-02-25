import React, { useState ,useEffect} from 'react';
import {View, Text, Image,TouchableOpacity,StyleSheet,ScrollView,Button,STy} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Wishlist= () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [selectedAddress, setSelectedAddress]=useState('')
  const menuItems = [
    {name: 'Profile', screen: 'Profile', icon: require('../../assets/PRo.png')},
    {name: 'Orders', screen: 'Orders', icon: require('../../assets/order.png')},
    {
      name: 'Offer and Promo ',
      screen: 'Offer and Promo',
      icon: require('../../assets/Offer11.png'),
    },
    {
      name: 'Privacy policy',
      screen: 'Privacy policy',
      icon: require('../../assets/Privacy1.png'),
    },
    {
      name: 'Security',
      screen: 'Security',
      icon: require('../../assets/Security.png')
    },
  ];
  useEffect(() => {
    AsyncStorage.getItem('userName').then(value => {
      if (value !== null) {
        setUserName(value);
      }
    });
    AsyncStorage.getItem('userEmail').then(value => {
      if (value !== null) {
        setUserEmail(value);
      }
    });
    AsyncStorage.getItem('userMobile').then(value => {
      if (value !== null) {
        setUserMobile(value);
      }
    });
  }, []);

  const signOutUser = async () => {
    try {
      // Clear all keys
      await AsyncStorage.clear();
      console.log('Storage successfully cleared!');

      // Navigate to Login screen
      navigation.navigate('Login');
    } catch (e) {
      console.log('Failed to clear the async storage.');
    }
  };





  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          borderWidth: 0.3,
          borderColor: 'rgba(201, 201, 201, 1)',
          marginTop: 30,
          margin: 30,
          borderRadius: 20,
          shadowOpacity: 40,
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }}>
        <Image
          source={require('../../assets/Deepu.png')}
          style={{width: 50, height: 68, marginRight: 10}}
        />
        <View style={{marginLeft:10,textAlign:'center',justifyContent:'center' }}>
            <Text style= {{fontWeight:'bold',color:'rgba(0, 0, 0, 1)' , textAlignVertical:'center',}}> {userName}</Text>
            <Text style={{color: '#40110D',}}> {userEmail}</Text> 
        </View>
      </View>
      <View style={{flexDirection:'row'}}>
      <TouchableOpacity
   onPress={() => navigation.navigate('UserScreen')}>
   <View style={styles.menuItem}>
    <Image style={styles.menuIcon} source={require('../../assets/PRo.png')} />
    <Text style={styles.menuText}>Profile</Text>
  </View>
</TouchableOpacity>
</View>
<TouchableOpacity
  onPress={() => navigation.navigate('Orders')}>
  <View style={styles.menuItem}>
    <Image style={styles.menuIcon} source={require('../../assets/order.png')} />
    <Text style={styles.menuText}>Orders</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => navigation.navigate('Offer and Promo')}>
  <View  style={styles.menuItem}>
    <Image style={styles.menuIcon} source={require('../../assets/Offer11.png')} />
    <Text style={styles.menuText}>Offer and Promo</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => navigation.navigate('Privacy policy')}>
  <View   style={styles.menuItem}>
    <Image style={styles.menuIcon} source={require('../../assets/Privacy1.png')} />
    <Text style={styles.menuText}>Privacy policy</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity
onPress={() => navigation.navigate('Security')}>
  <View   style={styles.menuItem}>
    <Image style={styles.menuIcon} source={require('../../assets/Security.png')} />
    <Text style={styles.menuText}>Security</Text>
  </View>
</TouchableOpacity>
   
<TouchableOpacity
        style={{
          borderRadius: 8,
          backgroundColor: 'white',
          margin: 40,
          padding: 10,
          marginLeft: 30,
          justifyContent: 'center',
        }}
        onPress={signOutUser}>
        <Text style={{color: 'black', fontSize:18,fontWeight :'500'}}>SignOut</Text>
      </TouchableOpacity>
   
    </ScrollView>
  );
};




// import React, { useState ,useEffect} from 'react';
// import {View, Text, Image,TouchableOpacity,StyleSheet,ScrollView,Button,} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// // ... other imports ...

// const Wishlist= () => {
//   const navigation = useNavigation();
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [userMobile, setUserMobile] = useState('');
//   const [selectedAddress, setSelectedAddress]=useState('')
  
//   // ... other code ...

//   const signOutUser = async () => {
//     try {
//       // Clear all keys
//       await AsyncStorage.clear();
//       console.log('Storage successfully cleared!');

//       // Navigate to Login screen
//       navigation.navigate('Login');
//     } catch (e) {
//       console.log('Failed to clear the async storage.');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View
//         style={{
//           flexDirection: 'row',
//           padding: 10,
//           borderWidth: 0.3,
//           borderColor: 'rgba(201, 201, 201, 1)',
//           marginTop: 30,
//           margin: 30,
//           borderRadius: 20,
//           shadowOpacity: 40,
//           backgroundColor: 'rgba(255, 255, 255, 1)',
//         }}>
//         <Image
//           source={require('../../assets/Deepu.png')}
//           style={{width: 50, height: 68, marginRight: 10}}
//         />
//         <View style={{marginLeft:10,textAlign:'center',justifyContent:'center' }}>
//             <Text style= {{fontWeight:'bold',color:'rgba(0, 0, 0, 1)' , textAlignVertical:'center',}}> {userName}</Text>
//             <Text> {userEmail}</Text> 
//         </View>
//       </View>
//       <View style={{flexDirection:'row'}}>
//       <TouchableOpacity
//    onPress={() => navigation.navigate('UserScreen')}>
//    <View style={styles.menuItem}>
//     <Image style={styles.menuIcon} source={require('../../assets/PRo.png')} />
//     <Text style={styles.menuText}>Profile</Text>
//   </View>
// </TouchableOpacity>
// </View>
// <TouchableOpacity
//   onPress={() => navigation.navigate('Orders')}>
//   <View style={styles.menuItem}>
//     <Image style={styles.menuIcon} source={require('../../assets/order.png')} />
//     <Text style={styles.menuText}>Orders</Text>
//   </View>
// </TouchableOpacity>
// <TouchableOpacity
//   onPress={() => navigation.navigate('Offer and Promo')}>
//   <View  style={styles.menuItem}>
//     <Image style={styles.menuIcon} source={require('../../assets/Offer11.png')} />
//     <Text style={styles.menuText}>Offer and Promo</Text>
//   </View>
// </TouchableOpacity>
// <TouchableOpacity
//   onPress={() => navigation.navigate('Privacy policy')}>
//   <View   style={styles.menuItem}>
//     <Image style={styles.menuIcon} source={require('../../assets/Privacy1.png')} />
//     <Text style={styles.menuText}>Privacy policy</Text>
//   </View>
// </TouchableOpacity>
// <TouchableOpacity
// onPress={() => navigation.navigate('Security')}>
//   <View   style={styles.menuItem}>
//     <Image style={styles.menuIcon} source={require('../../assets/Security.png')} />
//     <Text style={styles.menuText}>Security</Text>
//   </View>
// </TouchableOpacity>
  
//     </ScrollView>
//   );
// };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 13,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    borderBottomColor: 'white',
    marginLeft: 20,
  },
  menuIcon: {
    marginRight: 38,
  },
  menuIcon1: {
    marginRight: 38,
  },
  menuIcon2: {
    marginRight: 38,
  },

  menuText: {
    fontSize: 18,
    color: '#40110D',
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
});

export default Wishlist;
