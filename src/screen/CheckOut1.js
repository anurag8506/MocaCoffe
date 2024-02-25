
import React, {useEffect, useState} from 'react';
import { View,Text,FlatList,StyleSheet,Dimensions,Image,TouchableOpacity,} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeout from 'react-native-swipeout';
import Toast from 'react-native-toast-message';
import removeIcon from '../../assets/delete.png';
import {ScrollView} from 'react-native-gesture-handler';
import RazorpayCheckout from 'react-native-razorpay';
import uuid from "react-native-uuid"

const CheckOut1 = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const navigation = useNavigation();
  const [cartList, setCartList] = useState([]);
  const [selectedAddress, setSelectedAddress]=useState('')
  const [addressList, setAddressList] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const deliveryOptions = ["Door Delivery", "Take Away"];
  const isFocused =useIsFocused()

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
      .update({qty: qty + 1});
  };

  const decreaseQty = (id, qty) => {
    if (qty > 1) {
      firestore()
        .collection('cart')
        .doc(id)
        .update({qty: qty - 1});
    }
  };

  const getTotal = () => {
    let total = 0;
    cartList.forEach(item => {
      total += item.price * item.qty;
    });
    return total;
  };

  useEffect(() => {
    getAddress();
  }, []);

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
  const orderPlace = async (paymentId) => {
    if (selectedDelivery === 0) { // 0 is the index for "Door Delivery"
      let temp = cartList;
      for (let item of temp) {
        const orderId = uuid.v4();
        try {
          await firebase()
            .collection("order")
            .doc(orderId)
            .set({
              ...item,
              orderId: orderId,
              paymentId: paymentId,
              userName: userName, // Add this line
              userEmail: userEmail, // Add this line
              userMobile: userMobile, // Add this line
              selectedAddress: selectedAddress, // Add this line
              selectedDelivery: deliveryOptions[selectedDelivery], // Add this line
            });
          console.log("Order placed successfully!");
        } catch (error) {
          console.error("Error placing order: ", error);
        }
      }
      navigation.navigate("Success");
    } else {
      alert("Please select Door Delivery option to proceed.");
    }
  };
  
  return (
    <View style={styles.container}>
      <>
        <ScrollView>
          <FlatList
            data={cartList}
            renderItem={({item, index}) => {
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
              }
            }}
          />
        <View> 
          <View style={styles.checkOut2}>
            <Text style={styles.total3}>Address Details</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyAddress')}>
            <Text style={styles.total}>Change Details</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderWidth: 0.4,
            margin: 20,
            borderRadius:10,
            borderColor:'#C9C9C9'
          }}>
          <View>
            <Text style={{color: '#000000', marginTop: 5, fontWeight: '700'}}>
              {userName}
            </Text>
            <Text style={{color: 'gray', }}>{userEmail}</Text>
            <Text  style={{color: 'gray', }}>{userMobile}</Text>
            <Text  style={{color: 'gray', }}>{selectedAddress==''?'No Address Selected':selectedAddress}</Text>
          </View>
        </View>
          </View> 
        </View>
      <Text
          style={{
            color: "#40110D",
            fontWeight: "bold",
            marginTop: 30,
            margin: 30,
            fontSize: 16.47,
            lineHeight: 22.23,
          }}
        >
          Delivery Options :
        </Text>
        <View style={styles.optionBox}>
          {deliveryOptions.map((option, i) => (
            <View style={styles.optionRow} key={i}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setSelectedDelivery(i)}
              >
                <View
                  style={[
                    styles.radioButtonIcon,
                    selectedDelivery === i && styles.radioButtonIconSelected,
                  ]}
                />
                <Text style={{color:'gray'}}>{option}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
        </ScrollView>
        {cartList.length > 0 && (
          <View style={styles.checkOut}>
            <Text style={styles.total3}>Total :</Text>
            <Text style={styles.total}>{'₹  ' + getTotal()}</Text>
          </View>
        )}
        <View style={styles.checkOut1}>
        <TouchableOpacity onPress={() => {
  var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_pWrOJ8ULUJp0Gc', // Your api key
    amount: (getTotal()*100) ,
    name: 'Coffee',
    prefill: {
      email: 'anuragsinghyadav191@gmail.com',
      contact: '9369335762',
      name: 'Anurag Singh Yadav'
    },
    theme: {color: '#40110D'}
  }
  RazorpayCheckout.open(options).then(async (data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
    await orderPlace(data.razorpay_payment_id);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  }).catch((error) => {
    // handle unexpected errors
    console.log(`Unexpected Error: ${error}`);
    alert(`Unexpected Error: ${error}`);
  });
}}>
  <Text style={styles.total1}>Proceed to Payment</Text>
</TouchableOpacity>
          </View>
      </>
    </View>
  );
};

export default CheckOut1;



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
    width: '100%',
    position: 'absolute',
    bottom: 90,
    height: 100,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft:10,
    marginRight:10,

  },
  checkOut2: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft:10,
    marginRight:10,
    marginTop:20,


  },
  total: {
    color: '#AA7C4C',
    fontWeight: '700',
    marginRight: 30,
    fontSize:18,
    
  },
  total3: {
    color: '#40110D',
   fontSize:20,
    fontWeight: '900',
    margin: 10,
    
  },
  total1: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    margin: 10,
    
  },
  checkOut1: {
    height: 55,
    backgroundColor: '#40110D',
    width: '90%',
    justifyContent:'center',
    marginRight: 20,
    borderRadius: 10,
    alignContent:'center',
    alignItems:'center',
    marginLeft:10,
    bottom:40
   
  },
  swipeoutBtnIcon: {
    width: 20,
    height: 20,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 70,
  },
  heading:{
    fontSize:16,
    fontWeight:'600',
    color:'black',
    margin:20,
    paddingLeft:20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
   
  },
  radioButtonIcon: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    color:'gray'
  },
  radioButtonIconSelected: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: "#000",
 
 
  },
  optionBox: {
    borderWidth:.5,
    borderColor: "#D3D3D3",
    borderRadius:10,
    padding: 10,
    marginLeft:20,
    marginBottom: 10,
    width:'90%',
 
  },
  optionRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    paddingVertical: 10,
 
  },
});





              //   return (
              //     <Swipeout
              //       right={swipeBtns}
              //       autoClose={true}
              //       backgroundColor="transparent">
              //       <View style={styles.productItem}>
              //         <Image
              //           source={{uri: item.productImage}}
              //           style={styles.productImage}
              //         />
              //         <View style={styles.centerView}>
              //           <Text style={styles.name}>{item.productName}</Text>
              //           <Text style={styles.desc}>{item.productDesc}</Text>
              //           <Text style={styles.price}>
              //             {'₹' + item.price * item.qty}
              //           </Text>
              //         </View>
              //         <View style={styles.rightView}>
              //           <View style={styles.qtyView}>
              //             <TouchableOpacity
              //               onPress={() => decreaseQty(item.id, item.qty)}>
              //               <Text style={styles.qtyChange}>-</Text>
              //             </TouchableOpacity>
              //             <Text style={styles.qty}>{item.qty}</Text>
              //             <TouchableOpacity
              //               onPress={() => increaseQty(item.id, item.qty)}>
              //               <Text style={styles.qtyChange}>+</Text>
              //             </TouchableOpacity>
              //           </View>
              //         </View>
              //       </View>
              //     </Swipeout>
              //   );
              // } else {
              //   return null;