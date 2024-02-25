// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const Order = ({ route }) => {
//   const { orderId } = route.params; // Get the orderId from navigation params
//   const [orderData, setOrderData] = useState(null);

//   useEffect(() => {
//     const getOrderData = async () => {
//       try {
//         const doc = await firestore().collection('order').doc(orderId).get();
//         if (doc.exists) {
//           setOrderData(doc.data());
//         } else {
//           console.log('No such document!');
//         }
//       } catch (error) {
//         console.error('Error getting document:', error);
//       }
//     };

//     getOrderData();
//   }, [orderId]);

//   return (
//     <View style={styles.container}>
//       {orderData ? (
//         <>
//           <Text style={styles.title}>Order Details</Text>
//           <Text style={styles.text}>Order ID: {orderData.orderId}</Text>
//           <Text style={styles.text}>Payment ID: {orderData.paymentId}</Text>
//           {/* Add more fields as needed */}
//         </>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
// });

// export default Order;
import { View, Text } from 'react-native'
import React from 'react'

const Order = () => {
  return (
    <View>
      <Text>Order</Text>
    </View>
  )
}

export default Order