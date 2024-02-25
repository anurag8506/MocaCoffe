// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, size } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Swipeout from 'react-native-swipeout';
// import Toast from 'react-native-toast-message';
// import removeIcon from '../../assets/delete.png';
// import { ScrollView } from 'react-native-gesture-handler';

// const Cart = () => {
//   const navigation = useNavigation();
//   const [cartList, setCartList] = useState([]);
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
//           .collection('cart')
//           .where('addedBy', '==', userId)
//           .onSnapshot(snapshot => {
//             const list = [];
//             snapshot.forEach(doc => {
//               list.push({ ...doc.data(), id: doc.id });
//             });
//             setCartList(list);
//           });
//       };
//       getData();
//     }
//   }, [userId]); // Add userId as a dependency here

//   const removeFromCart = id => {
//     firestore()
//       .collection('cart')
//       .doc(id)
//       .delete()
//       .then(() => {
//         Toast.show({
//           type: 'success',
//           position: 'top',
//           text1: 'Item removed from cart!',
//           visibilityTime: 3000,
//           autoHide: true,
//         });
//       })
//       .catch(error => {
//         console.error('Error removing item: ', error);
//       });
//   };

//   const increaseQty = (id, qty) => {
//     firestore()
//       .collection('cart')
//       .doc(id)
//       .update({ qty: qty + 1 });
//   };

//   const decreaseQty = (id, qty) => {
//     if (qty > 1) {
//       firestore()
//         .collection('cart')
//         .doc(id)
//         .update({ qty: qty - 1 });
//     }
//   };

//   const getTotal = () => {
//     let total = 0;
//     cartList.forEach(item => {
//       total += item.price * item.qty;
//     });
//     return total;
//   };

//   return (
//     <View style={styles.container}>
//       <>
//         <ScrollView>
//           <FlatList
//             data={cartList}
//             renderItem={({ item, index }) => {
//               if (item) {
//                 let swipeBtns = [
//                   {
//                     component: (
//                       <View style={styles.swipeoutBtn}>
//                         <Image
//                           source={removeIcon}
//                           style={styles.swipeoutBtnIcon}
//                         />
//                       </View>
//                     ),
//                     backgroundColor: 'white',
//                     onPress: () => removeFromCart(item.id),
//                   },
//                 ];
//                 return (
//                   <Swipeout
//                     right={swipeBtns}
//                     autoClose={true}
//                     backgroundColor="transparent">
//                     <View style={styles.productItem}>
//                       <Image
//                         source={{ uri: item.productImage }}
//                         style={styles.productImage}
//                       />
//                       <View style={styles.centerView}>
//                         <Text style={styles.name}>{item.productName}</Text>
//                         <Text style={styles.desc}>{item.productDesc}</Text>
//                         <Text style={styles.price}>
//                           {'₹' + item.price * item.qty}
//                         </Text>
//                       </View>
//                       <View style={styles.rightView}>
//                         <View style={styles.qtyView}>
//                           <TouchableOpacity
//                             onPress={() => decreaseQty(item.id, item.qty)}>
//                             <Text style={styles.qtyChange}>-</Text>
//                           </TouchableOpacity>
//                           <Text style={styles.qty}>{item.qty}</Text>
//                           <TouchableOpacity
//                             onPress={() => increaseQty(item.id, item.qty)}>
//                             <Text style={styles.qtyChange}>+</Text>
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     </View>
//                   </Swipeout>
//                 );
//               } else {
//                 return null;
//               }
//             }}
//           />
//           <Toast ref={ref => Toast.setRef(ref)} />
//           <Text></Text>
//           <Text></Text>
//           <Text></Text>
//         </ScrollView>
//         {cartList.length > 0 && (
//           <View style={styles.checkOut}>
//             <TouchableOpacity onPress={() => navigation.navigate('CheckOut1')}>
//               <Text style={{ color: 'white', fontSize: 20, }}>Proceed to payment</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </>
//     </View>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, size } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeout from 'react-native-swipeout';
import Toast from 'react-native-toast-message';
import removeIcon from '../../assets/delete.png';
import { ScrollView } from 'react-native-gesture-handler';

const Cart = () => {
  const navigation = useNavigation();
  const [cartList, setCartList] = useState([]);
  const [userId, setUserId] = useState(null); // Add this line

  // Add this useEffect
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('USERID');
      setUserId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const getData = async () => {
        firestore()
          .collection('cart')
          .where('addedBy', '==', userId)
          .onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
              list.push({ ...doc.data(), id: doc.id });
            });
            setCartList(list);
          });
      };
      getData();
    }
  }, [userId]); // Add userId as a dependency here

  const removeFromCart = id => {
    firestore()
      .collection('cart')
      .doc(id)
      .delete()
      .then(() => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Item removed from cart!',
          visibilityTime: 3000,
          autoHide: true,
        });
      })
      .catch(error => {
        console.error('Error removing item: ', error);
      });
  };

  const increaseQty = (id, qty) => {
    firestore()
      .collection('cart')
      .doc(id)
      .update({ qty: qty + 1 });
  };

  const decreaseQty = (id, qty) => {
    if (qty > 1) {
      firestore()
        .collection('cart')
        .doc(id)
        .update({ qty: qty - 1 });
    }
  };

  const getTotal = () => {
    let total = 0;
    cartList.forEach(item => {
      total += item.price * item.qty;
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <>
        <ScrollView>
          <FlatList
            data={cartList}
            renderItem={({ item, index }) => {
              if (item) {
                let swipeBtns = [
                  {
                    component: (
                      <View style={styles.swipeoutBtn}>
                        <Image
                          source={removeIcon}
                          style={styles.swipeoutBtnIcon}
                        />
                      </View>
                    ),
                    backgroundColor: 'white',
                    onPress: () => removeFromCart(item.id),
                  },
                ];
                return (
                  <Swipeout
                    right={swipeBtns}
                    autoClose={true}
                    backgroundColor="transparent">
                    <View style={styles.productItem}>
                      <Image
                        source={{ uri: item.productImage }}
                        style={styles.productImage}
                      />
                      <View style={styles.centerView}>
                        <Text style={styles.name}>{item.productName}</Text>
                        <Text style={styles.desc}>{item.productDesc}</Text>
                        <Text style={styles.price}>
                          {'₹' + item.price * item.qty}
                        </Text>
                        {/* Display additional requirements */}
                        {item.additionalReq && (
                          <Text style={styles.additionalReq}>
                            Additional Requirements: {item.additionalReq}
                          </Text>
                        )}
                      </View>
                      <View style={styles.rightView}>
                        <View style={styles.qtyView}>
                          <TouchableOpacity
                            onPress={() => decreaseQty(item.id, item.qty)}>
                            <Text style={styles.qtyChange}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.qty}>{item.qty}</Text>
                          <TouchableOpacity
                            onPress={() => increaseQty(item.id, item.qty)}>
                            <Text style={styles.qtyChange}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Swipeout>
                );
              } else {
                return null;
              }
            }}
          />
          <Toast ref={ref => Toast.setRef(ref)} />
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </ScrollView>
        {cartList.length > 0 && (
          <View style={styles.checkOut}>
            <TouchableOpacity onPress={() => navigation.navigate('CheckOut1')}>
              <Text style={{ color: 'white', fontSize: 20, }}>Proceed to payment</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    </View>
  );
};

export default Cart;


// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   Image,
//   TouchableOpacity,setCartList,size
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Swipeout from 'react-native-swipeout';
// import Toast from 'react-native-toast-message';
// import removeIcon from '../../assets/delete.png';
// import {ScrollView} from 'react-native-gesture-handler';
// const Cart = () => {
//   const navigation = useNavigation();
//   const [cartList, setCartList] = useState([]);
  
//   useEffect(() => {
//     const getData = async () => {
//       const id = await AsyncStorage.getItem('USERID');
//       firestore()
//         .collection('cart')
//         .where('addedBy', '==', id)
//         .onSnapshot(snapshot => {
//           const list = [];
//           snapshot.forEach(doc => {
//             list.push({...doc.data(), id: doc.id});
//           });
//           setCartList(list);
//         });
//     };
//     getData();
//   }, []);

//   const removeFromCart = id => {
//     firestore()
//       .collection('cart')
//       .doc(id)
//       .delete()
//       .then(() => {
//         Toast.show({
//           type: 'success',
//           position: 'top',
//           text1: 'Item removed from cart!',
//           visibilityTime: 3000,
//           autoHide: true,
//         });
//       })
//       .catch(error => {
//         console.error('Error removing item: ', error);
//       });
//   };
//   const increaseQty = (id, qty) => {
//     firestore()
//       .collection('cart')
//       .doc(id)
//       .update({qty: qty + 1});
//   };
//   const decreaseQty = (id, qty) => {
//     if (qty > 1) {
//       firestore()
//         .collection('cart')
//         .doc(id)
//         .update({qty: qty - 1});
//     }
//   };
//   const getTotal = () => {
//     let total = 0;
//     cartList.forEach(item => {
//       total += item.price * item.qty;
//     });
//     return total;
//   };
//   return (
//     <View style={styles.container}>
//       <>
//         <ScrollView>
//           <FlatList
//             data={cartList}
//             renderItem={({item, index}) => {
//               if (item) {
//                 let swipeBtns = [
//                   {
//                     component: (
//                       <View style={styles.swipeoutBtn}>
//                         <Image
//                           source={removeIcon}
//                           style={styles.swipeoutBtnIcon}
//                         />
//                       </View>
//                     ),
//                     backgroundColor: 'white',
//                     onPress: () => removeFromCart(item.id),
//                   },
//                 ];
//                 return (
//                   <Swipeout
//                     right={swipeBtns}
//                     autoClose={true}
//                     backgroundColor="transparent">
//                     <View style={styles.productItem}>
//                       <Image
//                         source={{uri: item.productImage}}
//                         style={styles.productImage}
//                       />
//                       <View style={styles.centerView}>
//                         <Text style={styles.name}>{item.productName}</Text>
//                         <Text style={styles.desc}>{item.productDesc}</Text>
//                         <Text style={styles.price}>
//                           {'₹' + item.price * item.qty}
//                         </Text>
//                       </View>
//                       <View style={styles.rightView}>
//                         <View style={styles.qtyView}>
//                           <TouchableOpacity
//                             onPress={() => decreaseQty(item.id, item.qty)}>
//                             <Text style={styles.qtyChange}>-</Text>
//                           </TouchableOpacity>
//                           <Text style={styles.qty}>{item.qty}</Text>
//                           <TouchableOpacity
//                             onPress={() => increaseQty(item.id, item.qty)}>
//                             <Text style={styles.qtyChange}>+</Text>
//                           </TouchableOpacity>
//                         </View>
//                       </View>
//                     </View>
//                   </Swipeout>
//                 );
//               } else {
//                 return null;
//               }
//             }}
//           />
//           <Toast ref={ref => Toast.setRef(ref)} />
//           <Text></Text>
//         <Text></Text>
//         <Text></Text>
//         </ScrollView>
//         {cartList.length > 0 && (
//           <View style={styles.checkOut}>
//             {/* <Text style={styles.total}>{'Total: INR  ' + getTotal()}</Text> */}
//             <TouchableOpacity  onPress={() => navigation.navigate('CheckOut1')}>
//               <Text style={{color:'white', fontSize:20,}}>Proceed to payment</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </>
    
//     </View>
//   );
// };
// export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 30,
    padding: 10,
    borderWidth: 0.5,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  centerView: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  desc: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  rightView: {
    alignItems: 'flex-end',
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: 120,
  },
  qtyChange: {
    fontSize: 20,
    color: '#000',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
  },
  qty: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    lineHeight: 30,
    borderRadius: 15,
    borderColor: '#000',
  },
  checkOut: {
    backgroundColor: '#40110D',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    bottom:60,
  },
  total: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
  },

  swipeoutBtnIcon: {
    width: 20,
    height: 20,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 70,
    tintColor: size === 'Signature' ? 'white' : '#8C8C8C'
  },
});
