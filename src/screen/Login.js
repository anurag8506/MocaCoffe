
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TextInput, Alert, useColorScheme } from 'react-native';
import React, { useState ,useEffect} from 'react';
import CustomTextInput from '../Componets/CustomTextInput';
import CustomButton from '../Componets/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { THEME_COLOR } from '../utils/Colors';
import Singnup from './Signup';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
const Login = ({ route }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');

  const loginUser = () => {
    firestore()
      .collection('vendors')
      .where('email', '==', email)
      .get()
      .then(snapShot => {
        if (snapShot.docs.length !== 0) {
          if (snapShot.docs[0].data().passWord === passWord) {
            const userName = snapShot.docs[0].data().name; // Get userName from Firestore
            AsyncStorage.setItem('userName', userName).then(() => {
              console.log('userName stored:', userName); // Log userName
              goToNextScreen(snapShot.docs[0].data());
            });
          }
        }
      });
  };

  const goToNextScreen = async data => {
    await AsyncStorage.setItem('NAME', data.name);
    await AsyncStorage.setItem('EMAIL', data.email);
    await AsyncStorage.setItem('MOBILE', data.mobile);
    await AsyncStorage.setItem('USERID', data.userId);

    // Fetch cart data for the logged-in user
    firestore()
      .collection('cart')
      .where('addedBy', '==', data.userId)
      .get()
      .then(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setCartList(list);
      })
      .catch(error => {
        console.error('Error fetching cart data: ', error);
      });

    navigation.navigate('Main');
  };

  const scheme = useColorScheme();
  let placeholderTextColor = 'black';

  if (scheme === 'dark') {
    placeholderTextColor = '#40110D'; // change this to any color you want in dark mode
  }
//  For Google 
GoogleSignin.configure({
  webClientId: '1079475983374-61mh563h8d8333au5g6m38aam1fudrb0.apps.googleusercontent.com', // Replace with your actual web client id
});
// c

useEffect(() => {
  GoogleSignin.configure();
}, []);

const GoogleLogin = async () => {
  try {
    // Check if user is already signed in
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      // User is signed in, so log them out
      await GoogleSignin.signOut();
    }

    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    // Access user's name and email
    const userName = userInfo.user.name;
    const userEmail = userInfo.user.email;

    console.log('User Name: ', userName);
    console.log('User Email: ', userEmail);

    // Store user data in Firebase
    const userId = uuid.v4();
    firestore().collection("vendors").doc(userId).set({
      name: userName,
      email: userEmail,
      userId: userId,
    }).then(res => {
      console.log("user created");
      AsyncStorage.setItem('userName', userName).then(() => {
        console.log('userName stored:', userName); // Log userName
        AsyncStorage.setItem('userEmail', userEmail);

        // Fetch cart data for the new user
        firestore()
          .collection('cart')
          .where('addedBy', '==', userId)
          .get()
          .then(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
              list.push({ ...doc.data(), id: doc.id });
            });
            setCartList(list);
          })
          .catch(error => {
            console.error('Error fetching cart data: ', error);
          });

        navigation.navigate('Main'); // Navigate to Main after signup
      });
    }).catch(error => {
      console.log(error);
    });

  } catch (error) {
    console.log(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log(error);
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log(error);
      // operation (e.g. sign in) is in progress already   
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log(error);
      // play services not available or outdated
    } else {
      console.log(error);
      // some other error happened
    }
  } 
};
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.card}>
        <Text style={styles.title}> Login</Text>
        <CustomTextInput
          placeholder={'Email'}
          placeholderTextColor={placeholderTextColor}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <CustomTextInput
          placeholder={'Enter PassWord'}
          placeholderTextColor={placeholderTextColor}
          value={passWord}
          onChangeText={txt => setPassword(txt)}
        />
        <TouchableOpacity>
          <CustomButton
            title={'Login'}
            onClick={() => {
              loginUser();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={GoogleLogin}>
      <Image
        style={styles.image}
        source={require('../../assets/Ga.png')} // Replace with your local image path
      />
      <View style={styles.textView}>
        <Text style={styles.text}>Login with Google</Text>
      </View>
    </TouchableOpacity>

        <View style={styles.row}>
          <Text style={{ color: 'black' }}> {"Don't have an account?"} </Text>
          <Text
            style={{ color: '#40110D' }}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            {' '}
            {'Create now'}{' '}
          </Text>
        </View>
      </View>
  


      </ScrollView>
    </View>
  );
};

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    width: '95%',
    alignSelf: 'center',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 160,
  },
  title: {
    alignSelf: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 28,
    color: '#40110D',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 60,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFF9F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    alignContent:'center',
    alignSelf:'center',
    borderRadius:10,
 marginTop:20,
  },
  image: {
    width: 18,
    height: 18,
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center',
    marginLeft:40,
 
  },
    textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
