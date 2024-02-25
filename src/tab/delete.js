
// import {View, Text, StyleSheet, Image, Button,TouchableOpacity, Alert, TextInput,alert,useColorScheme} from 'react-native';
// import React, { useState } from 'react';
// import CustomTextInput from '../Componets/CustomTextInput';
// import CustomButton from '../Componets/CustomButton';
// import { THEME_COLOR } from '../utils/Colors';
// import { useNavigation } from '@react-navigation/native';
// import firestore from "@react-native-firebase/firestore"
// import uuid from 'react-native-uuid'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ScrollView } from 'react-native-gesture-handler';

// const Singnup = () => {
//    const navigation = useNavigation();
//    const [name, setName]= useState('');
//    const [email, setEmail]= useState('');
//    const [mobile, setMobile]= useState('');
//    const [passWord, setPassword]= useState('');
//    const [confirmPass, setConfirmPass]= useState('');
   
//    const registerVendor=()=>{
//       const userId=uuid.v4();
//     //   firestore().collection("vendors").doc(userId).set({
//     //     name: name,
//     //     email: email,
//     //     mobile: mobile,
//     //     passWord: passWord,
//     //     userId: userId,
//     //   }).then(res => {
//     //     console.log("user created");
//     //     navigation.navigate('Main', { userName: name }); // Navigate to Home after signup
//     //   }).catch(error => {
//     //     console.log(error);
//     //   });
//     // };

//     firestore().collection("vendors").doc(userId).set({
//       name: name,
//       email: email,
//       mobile: mobile,
//       passWord: passWord,
//       userId: userId,
//     }).then(res => {
//       console.log("user created");
//       AsyncStorage.setItem('userName', name).then(() => {
//         console.log('userName stored:', name); // Log userName
//         AsyncStorage.setItem('userEmail', email);
//         AsyncStorage.setItem('userMobile', mobile);
//         navigation.navigate('Main'); // Navigate to Main after signup
   
//       });
//     }).catch(error => {
//       console.log(error);
//     });
//   };

//    const validate=()=>{
//     let valid =true;
//     if (name == '') {
//       valid = false;
//     }
//     if(email=='') {
//       valid = false;
//     }
//     if(mobile=='' || mobile.length<10){
//       valid = false;
//     }
//     if(passWord==''){
//       valid = false;
//     }
//     if(confirmPass==''){
//       valid = false
//     }
//     if (passWord !== confirmPass) {
//       valid = false;
//     }
//     return valid;
//    };


//    const scheme = useColorScheme();
//    let placeholderTextColor = 'black';
 
//    if (scheme === 'dark') {
//      placeholderTextColor = '#40110D'; // change this to any color you want in dark mode
//    }

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//       <View style={styles.card}>
//         <Text style={styles.title} > Create an account</Text>
//         <Text style={styles.text} >Welcome Koala🐨, enter your details so lets </Text>
//         <Text style={styles.text1}>get started in ordering coffee.</Text>
//         {/* <CustomTextInput   placeholder={'Enter Your Name'}   placeholderTextColor={placeholderTextColor}
//         value={name}  onChangeText={txt => setName(txt)} />
//         <CustomTextInput placeholder={'Email'} 
//          value={email} onChangeText={txt => setEmail(txt)} />
//         <CustomTextInput placeholder={'Phone Number'}
//          value={mobile} onChangeText={txt => setMobile(txt)} />
//         <CustomTextInput placeholder={'Enter PassWord'}
//          value={passWord} onChangeText={txt => setPassword(txt)} />
//         <CustomTextInput placeholder={'Confirm Password'}
//          value={confirmPass} onChangeText={txt => setConfirmPass(txt)} /> */}
//       <CustomTextInput  
//         placeholder={'Enter Your Name'}
//         placeholderTextColor={placeholderTextColor}
//         value={name}  
//         onChangeText={txt => setName(txt)} 
//       />
//       <CustomTextInput 
//         placeholder={'Email'}
//         placeholderTextColor={placeholderTextColor}
//         value={email} 
//         onChangeText={txt => setEmail(txt)} 
//       />
//       <CustomTextInput 
//         placeholder={'Phone Number'}
//         placeholderTextColor={placeholderTextColor}
//         value={mobile} 
//         onChangeText={txt => setMobile(txt)} 
//       />
//       <CustomTextInput 
//         placeholder={'Enter PassWord'}
//         placeholderTextColor={placeholderTextColor}
//         value={passWord} 
//         onChangeText={txt => setPassword(txt)} 
//       />
//       <CustomTextInput 
//         placeholder={'Confirm Password'}
//         placeholderTextColor={placeholderTextColor}
//         value={confirmPass} 
//         onChangeText={txt => setConfirmPass(txt)} 
//       />

//          {/*  */}
//          <TouchableOpacity>
//         <CustomButton  title={'Sign Up'} 
         
//         onClick={() => {
//           if(validate()){
//             registerVendor();
//           }else{
//             Alert.alert("Kindly fill the entries correctly and complete the form")
//           }
          
//         }} 
//          />

//          </TouchableOpacity>
//       </View>
//       <Text></Text>
//     </ScrollView>
//     </View>
//   )
// }

// export default Singnup;


// orignal code bellow 

// import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Alert, TextInput, alert, useColorScheme } from 'react-native';
// import React, { useState } from 'react';
// import CustomTextInput from '../Componets/CustomTextInput';
// import CustomButton from '../Componets/CustomButton';
// import { THEME_COLOR } from '../utils/Colors';
// import { useNavigation } from '@react-navigation/native';
// import firestore from "@react-native-firebase/firestore"
// import uuid from 'react-native-uuid'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ScrollView } from 'react-native-gesture-handler';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// const Singnup = () => {
//   const navigation = useNavigation();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [passWord, setPassword] = useState('');
//   const [confirmPass, setConfirmPass] = useState('');


//   GoogleSignin.configure({
//     webClientId: '1079475983374-61mh563h8d8333au5g6m38aam1fudrb0.apps.googleusercontent.com', // Replace with your actual web client id
//   });

//   const registerVendor = () => {
//     const userId = uuid.v4();
//     firestore().collection("vendors").doc(userId).set({
//       name: name,
//       email: email,
//       mobile: mobile,
//       passWord: passWord,
//       userId: userId,
//     }).then(res => {
//       console.log("user created");
//       AsyncStorage.setItem('userName', name).then(() => {
//         console.log('userName stored:', name); // Log userName
//         AsyncStorage.setItem('userEmail', email);
//         AsyncStorage.setItem('userMobile', mobile);

//         // Fetch cart data for the new user
//         firestore()
//           .collection('cart')
//           .where('addedBy', '==', userId)
//           .get()
//           .then(snapshot => {
//             const list = [];
//             snapshot.forEach(doc => {
//               list.push({ ...doc.data(), id: doc.id });
//             });
//             setCartList(list);
//           })
//           .catch(error => {
//             console.error('Error fetching cart data: ', error);
//           });

//         navigation.navigate('Main'); // Navigate to Main after signup
//       });
//     }).catch(error => {
//       console.log(error);
//     });
//   };

//   const validate = () => {
//     let valid = true;
//     if (name == '') {
//       valid = false;
//     }
//     if (email == '') {
//       valid = false;
//     }
//     if (mobile == '' || mobile.length < 10) {
//       valid = false;
//     }
//     if (passWord == '') {
//       valid = false;
//     }
//     if (confirmPass == '') {
//       valid = false
//     }
//     if (passWord !== confirmPass) {
//       valid = false;
//     }
//     return valid;
//   };

//   const scheme = useColorScheme();
//   let placeholderTextColor = 'black';

//   if (scheme === 'dark') {
//     placeholderTextColor = '#40110D'; // change this to any color you want in dark mode
//   }
//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       console.log(userInfo);
//     } catch (error) {
//       console.log(error);
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // user cancelled the login flow
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // operation (e.g. sign in) is in progress already
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         // play services not available or outdated
//       } else {
//         // some other error happened
//       }
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={styles.card}>
//           <Text style={styles.title} > Create an account</Text>
//           <Text style={styles.text} >Welcome Koala🐨, enter your details so lets </Text>
//           <Text style={styles.text1}>get started in ordering coffee.</Text>
//           <CustomTextInput
//             placeholder={'Enter Your Name'}
//             placeholderTextColor={placeholderTextColor}
//             value={name}
//             onChangeText={txt => setName(txt)}
//           />
//           <CustomTextInput
//             placeholder={'Email'}
//             placeholderTextColor={placeholderTextColor}
//             value={email}
//             onChangeText={txt => setEmail(txt)}
//           />
//           <CustomTextInput
//             placeholder={'Phone Number'}
//             placeholderTextColor={placeholderTextColor}
//             value={mobile}
//             onChangeText={txt => setMobile(txt)}
//           />
//           <CustomTextInput
//             placeholder={'Enter PassWord'}
//             placeholderTextColor={placeholderTextColor}
//             value={passWord}
//             onChangeText={txt => setPassword(txt)}
//           />
//           <CustomTextInput
//             placeholder={'Confirm Password'}
//             placeholderTextColor={placeholderTextColor}
//             value={confirmPass}
//             onChangeText={txt => setConfirmPass(txt)}
//           />

//           <TouchableOpacity>
//             <CustomButton title={'Sign Up'} 

//               onClick={() => {
//                 if (validate()) {
//                   registerVendor();
//                 } else {
//                   Alert.alert("Kindly fill the entries correctly and complete the form")
//                 }

//               }}
//             />

//           </TouchableOpacity>
//                   <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
//            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />           
//             <View>
//               <Text style={{ width: 50, textAlign: 'center' }}>OR</Text>
//             </View>
//             <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
//          </View>
//          <TouchableOpacity
//   style={{
//     width:200,
//     height:50,
//     borderWidth:.5,
//   }}
//   onPress={signIn}
// >
//   <Text>Google Signin</Text>
// </TouchableOpacity>

//         </View>
//         <Text></Text>
//         <Text></Text>
//         <Text></Text>
//         <Text></Text>
//       </ScrollView>
//     </View>
//   )
// }

// export default Singnup;

