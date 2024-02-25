import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';

const MyAddress = () => {
  const navigation = useNavigation();
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = () => {
    firestore()
      .collection('address')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          setAddressList(snapshot.docs);
        }
      });
  };

  const setDefault = addressId => {
    let temp = addressList;
    temp.map(item => {
      if (item._data.addressId == addressId) {
        firestore().collection('address').doc(addressId).update({
          default: true,
        });
      } else {
        firestore().collection('address').doc(item._data.addressId).update({
          default: false,
        });
      }
    });
    getAddress();
  };

  const deleteAddress = addressId => {
    firestore()
      .collection('address')
      .doc(addressId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        getAddress(); // Refresh the list after delete
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  const editAddress = addressId => {
    // Navigate to the edit address screen with the addressId as parameter
    navigation.navigate('EditAddress', {addressId: addressId});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.adderssItem}
              onPress={() => {
                setDefault(item._data.addressId);
              }}>
              <View style={{flexShrink: 1}}>
                <Text style={styles.value}>
                  {'Street :' + item._data.street}
                </Text>
                <Text style={styles.value}>{'City:' + item._data.city}</Text>
                <Text style={styles.value}>{'State :' + item._data.state}</Text>
                <Text style={styles.value}>
                  {'Pincode :' + item._data.pincode}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                {item._data.default == true && (
                  <Text style={styles.default}>
                    {item._data.default == true ? 'Default' : ''}
                  </Text>
                )}
                <Text
                  style={styles.edit}
                  onPress={() => editAddress(item._data.addressId)}>
                  Edit
                </Text>
                <Text
                  style={styles.delete}
                  onPress={() => deleteAddress(item._data.addressId)}>
                  Delete
                </Text>
              </View>
              <View></View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewbn}
        onPress={() => navigation.navigate('AddAdress')}>
        <Text style={styles.title}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyAddress;

// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FlatList } from 'react-native-gesture-handler';

// const MyAddress = () => {
//     const navigation = useNavigation();
//     const [addressList, setAddressList] = useState([]);

//     useEffect(() => {
//         getAddress();
//       }, []);

//       const getAddress = () => {
//         firestore().collection('address').get().then(snapshot => {
//           if (snapshot.docs.length > 0) {
//             setAddressList(snapshot.docs);
//           }
//         });
//       };
//       const setDefault=(addressId)=>{
//      let temp =addressList;
//      temp.map(item=>{
//         if(item._data.addressId==addressId){
//            firestore().collection("address").doc(addressId).update({
//             default:true
//            })
//         }else{
//             firestore().collection("address").doc(item._data.addressId).update({
//                 default:false
//                })
//         }
//      })
//      getAddress()
//       }

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={addressList}
//                 renderItem={({ item, index }) => {
//                     return (
//                         <TouchableOpacity style={styles.adderssItem}
//                         onPress={()=>{
//                             setDefault(item._data.addressId)
//                         }}>

//                             <View style={{ flexShrink: 1,}}>
//                             <Text style={styles.value}>{"Street :" + item._data.street}</Text>
//                             <Text style={styles.value}>{"City:" + item._data.city}</Text>
//                             <Text style={styles.value}>{"State :" + item._data.state}</Text>
//                             <Text style={styles.value}>{"Pincode :" + item._data.pincode}</Text>

//                             </View>
//                             <View style={{justifyContent:'center',}}>
//                        {item._data.default==true &&
//                        <Text style={styles.default}>
//                        { item._data.default==true? 'Default':''}</Text>}
//                        <Text style={styles.edit}>Edit</Text>
//                        <Text style={styles.delete}>Delete</Text>

//                             </View>
//                             <View>

//                             </View>
//                         </TouchableOpacity>
//                     )
//                 }}
//             />
//             <TouchableOpacity style={styles.addNewbn} onPress={() => navigation.navigate('AddAdress')}>
//                 <Text style={styles.title}>Add New Address</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default MyAddress;/
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {FlatList} from 'react-native-gesture-handler';

// const MyAddress = () => {
//   const navigation = useNavigation();
//   const [addressList, setAddressList] = useState([]);

//   useEffect(() => {
//     getAddress();
//   }, []);

//   const getAddress = () => {
//     firestore()
//       .collection('address')
//       .get()
//       .then(snapshot => {
//         if (snapshot.docs.length > 0) {
//           setAddressList(snapshot.docs);
//         } else {
//           setAddressList([]);
//         }
//       });
//   };

//   const setDefault = addressId => {
//     if (addressList.length > 0) {
//       let temp = addressList;
//       temp.map(item => {
//         if (item._data.addressId == addressId) {
//           firestore().collection('address').doc(addressId).update({
//             default: true,
//           });
//         } else {
//           firestore().collection('address').doc(item._data.addressId).update({
//             default: false,
//           });
//         }
//       });
//       getAddress();
//     }
//   };

//   const deleteAddress = addressId => {
//     firestore()
//       .collection('address')
//       .doc(addressId)
//       .delete()
//       .then(() => {
//         console.log('Document successfully deleted!');
//         getAddress(); // Refresh the list after delete
//       })
//       .catch(error => {
//         console.error('Error removing document: ', error);
//       });
//   };

//   const editAddress = addressId => {
//     // Navigate to the edit address screen with the addressId as parameter
//     navigation.navigate('EditAddress', {addressId: addressId});
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={addressList}
//         renderItem={({item, index}) => {
//           return (
//             <TouchableOpacity
//               style={styles.adderssItem}
//               onPress={() => {
//                 setDefault(item._data.addressId);
//               }}>
//               <View style={{flexShrink: 1}}>
//                 <Text style={styles.value}>
//                   {'Street :' + item._data.street}
//                 </Text>
//                 <Text style={styles.value}>{'City:' + item._data.city}</Text>
//                 <Text style={styles.value}>{'State :' + item._data.state}</Text>
//                 <Text style={styles.value}>
//                   {'Pincode :' + item._data.pincode}
//                 </Text>
//               </View>
//               <View style={{justifyContent: 'center'}}>
//                 {item._data.default == true && (
//                   <Text style={styles.default}>
//                     {item._data.default == true ? 'Default' : ''}
//                   </Text>
//                 )}
//                 <Text
//                   style={styles.edit}
//                   onPress={() => editAddress(item._data.addressId)}>
//                   Edit
//                 </Text>
//                 <Text
//                   style={styles.delete}
//                   onPress={() => deleteAddress(item._data.addressId)}>
//                   Delete
//                 </Text>
//               </View>
//               <View></View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//       <TouchableOpacity
//         style={styles.addNewbn}
//         onPress={() => navigation.navigate('AddAdress')}>
//         <Text style={styles.title}>Add New Address</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MyAddress;

// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FlatList } from 'react-native-gesture-handler';

// const MyAddress = () => {
//   const navigation = useNavigation();
//   const [addressList, setAddressList] = useState([]);
//   const [userId, setUserId] = useState(null); // Add this line

//   // Add this useEffect
//   useEffect(() => {
//     const fetchUserId = async () => {
//       const id = await AsyncStorage.getItem('USERID');
//       setUserId(id);
//     };
//     fetchUserId();
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       const getData = async () => {
//         firestore()
//           .collection('address')
//           .where('addedBy', '==', userId)
//           .onSnapshot(snapshot => {
//             const list = [];
//             snapshot.forEach(doc => {
//               list.push({ ...doc.data(), id: doc.id });
//             });
//             setAddressList(list);
//           });
//       };
//       getData();
//     }
//   }, [userId]); // Add userId as a dependency here

//   const getAddress = () => {
//     firestore()
//       .collection('address')
//       .where('addedBy', '==', userId)
//       .get()
//       .then(snapshot => {
//         if (snapshot.docs.length > 0) {
//           setAddressList(snapshot.docs);
//         } else {
//           setAddressList([]);
//         }
//       });
//   };

//   const setDefault = addressId => {
//     if (addressList.length > 0) {
//       let temp = addressList;
//       temp.map(item => {
//         if (item._data.addressId == addressId) {
//           firestore().collection('address').doc(addressId).update({
//             default: true,
//           });
//         } else {
//           firestore().collection('address').doc(item._data.addressId).update({
//             default: false,
//           });
//         }
//       });
//       getAddress();
//     }
//   };

//   const deleteAddress = addressId => {
//     firestore()
//       .collection('address')
//       .doc(addressId)
//       .delete()
//       .then(() => {
//         console.log('Document successfully deleted!');
//         getAddress(); // Refresh the list after delete
//       })
//       .catch(error => {
//         console.error('Error removing document: ', error);
//       });
//   };

//   const editAddress = addressId => {
//     // Navigate to the edit address screen with the addressId as parameter
//     navigation.navigate('EditAddress', { addressId: addressId });
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={addressList}
//         renderItem={({ item, index }) => {
//           return (
//             <TouchableOpacity
//               style={styles.adderssItem}
//               onPress={() => {
//                 setDefault(item._data.addressId);
//               }}>
//               <View style={{ flexShrink: 1 }}>
//                 <Text style={styles.value}>
//                   {'Street :' + item._data.street}
//                 </Text>
//                 <Text style={styles.value}>{'City:' + item._data.city}</Text>
//                 <Text style={styles.value}>{'State :' + item._data.state}</Text>
//                 <Text style={styles.value}>
//                   {'Pincode :' + item._data.pincode}
//                 </Text>
//               </View>
//               <View style={{ justifyContent: 'center' }}>
//                 {item._data.default == true && (
//                   <Text style={styles.default}>
//                     {item._data.default == true ? 'Default' : ''}
//                   </Text>
//                 )}
//                 <Text
//                   style={styles.edit}
//                   onPress={() => editAddress(item._data.addressId)}>
//                   Edit
//                 </Text>
//                 <Text
//                   style={styles.delete}
//                   onPress={() => deleteAddress(item._data.addressId)}>
//                   Delete
//                 </Text>
//               </View>
//               <View></View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//       <TouchableOpacity
//         style={styles.addNewbn}
//         onPress={() => navigation.navigate('AddAdress')}>
//         <Text style={styles.title}>Add New Address</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MyAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  addNewbn: {
    backgroundColor: '#40110D',
    height: 50,
    width: '90%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  adderssItem: {
    width: '90%',

    borderBottomWidth: 0.3,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  default: {
    backgroundColor: '#40110D',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    fontSize: 12,
  },
  edit: {
    fontSize: 16,
    textDecorationColor: '#40110D',
    textDecorationLine: 'underline',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  delete: {
    fontSize: 16,
    textDecorationColor: '#40110D',
    textDecorationLine: 'underline',
    marginTop: 10,
    color: 'red',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color:'gray'
  },
});
