import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  screenHeight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'
import firestore, { firebase } from '@react-native-firebase/firestore';

import Home from '../tab/Home';



const UserScreen = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [selectedAddress, setSelectedAddress]=useState('')
  const navigation = useNavigation();
  const [cartList, setCartList] = useState([]);

  const getAddress = () => {
    firestore()
    .collection('address')
    .get()
    .then(snapshot => {
      if (snapshot.docs.length > 0) {
        snapshot.docs.map(item => {
          const data = item.data();
          if(data.default === true){
            setSelectedAddress(`${data.street}, ${data.city}, ${data.state}, ${data.pincode}`);
          }
        });
      }
    });
  };


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

  useEffect(() => {
    getAddress();
  }, []);

 
  useEffect(() => {
    const getData = async () => {
      const id = await AsyncStorage.getItem('USERID');
      firestore()
        .collection('cart')
        .where('addedBy', '==', id)
        .onSnapshot(snapshot => {
          const list = [];
          snapshot.forEach(doc => {
            list.push({...doc.data(), id: doc.id});
          });
          setCartList(list);
        });
    };
    getData();
  }, []);



  return (

    <View  style={styles.container}>
    <ScrollView>
      <KeyboardAvoidingView>
        <Text style={styles.profileText}>Profile</Text>
        <Text style={styles.myProfileText}>My Profile</Text>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Personal Details</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyAddress')}>
            <Text style={styles.totalAmount}>Change Details</Text>
            </TouchableOpacity>
       
        </View>
   
        <View
  style={{
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(201, 201, 201, 1)',
    margin:10,
    borderRadius:10,
  }}>
  <Image
    source={require('../../assets/Deepu.png')}
    style={styles.userIcon}
  />
  <View
    style={{
      flexShrink: 1, // This allows the text to wrap to the next line
    }}>
    <Text style={{color: '#40110D', margin: 5, fontWeight: '700'}}>
      {userName}
    </Text>
    <Text style={{color: '#40110D', }}>{userEmail}</Text>
    <Text style={{color: '#40110D', }}>{userMobile}</Text>
    <Text style={{color: '#40110D', }}>{selectedAddress==''?'No Address Selected':selectedAddress}</Text>
  </View>
</View>



        {/* <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderWidth: 0.5,
            borderColor: 'rgba(201, 201, 201, 1)',
           margin:10,
          }}>
          <Image
            source={require('../../assets/Deepu.png')}
            style={styles.userIcon}
          />
          <View>
            <Text style={{color: '#000000', margin: 5, fontWeight: '700'}}>
              {userName}
            </Text>
            <Text>{userEmail}</Text>
            <Text>{userMobile}</Text>
            <Text>{selectedAddress==''?'No Address Selected':selectedAddress}</Text>
          </View>
        </View> */}

        <View style={styles.form}>
          <TouchableOpacity onPress={() => navigation.navigate('Order')}>
            <View style={styles.inputGroup}>
              <Text style={styles.input}>Order</Text>
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PendingReviews')}>
            <View style={styles.inputGroup}>
              <Text style={styles.input}>Pending Reviews</Text>
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <View style={styles.inputGroup}>
              <Text style={styles.input}>FAQ</Text>
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <View style={styles.inputGroup}>
              <Text style={styles.input}>Help 24x7</Text>
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.arrowIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
    </View>
  );
};

export default UserScreen;
const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingLeft: 10,
    paddingRight: 10,

    backgroundColor: 'white',
    
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 100,
    paddingTop: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: 10,
  },

  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    marginBottom: 10,
    paddingTop: 10,
    paddingVertical: 10,
    marginLeft: 20,
    fontSize: 14,
    color: '#40110D',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#40110D',
  },
  updateButton: {
    backgroundColor: '#40110D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
  updateText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollArea: {
    overflow: 'scroll',
    flexGrow: 1,
    height: screenHeight - 125,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 30,
  },
  totalText: {
    fontSize: 18,
    marginTop: 30,
    paddingTop: 20,
    marginLeft: 20,
    color: '#40110D',
  },
  totalAmount: {
    fontSize: 18,
    marginTop: 30,
    paddingTop: 20,
    color: '#AA7C4C',

    marginRight: 30,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  profileText: {
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#40110D',
    fontSize: 22,
    marginTop:30,
  },
  myProfileText: {
    marginTop: 20,
    color: '#40110D',
    fontSize: 16,
    marginLeft:20,
  },
});
