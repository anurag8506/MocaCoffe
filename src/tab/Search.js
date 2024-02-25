
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable ,pressed,option,size} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Search = () => {
  const [products, setProducts] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();
  const [size, setSize] = useState(null); 
  const [cartList, setCartList] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    getProducts();
  }, [selectedOption]); 

  const getProducts = () => {
    firestore()
      .collection(selectedOption === 'Coffee Beans' ? 'menus' : 'products')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      });
  };
  const RadioButton = ({ title }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedOption === title ? '#AA7C4C' : 'transparent',
        padding: 20,
        width: 140,
        borderRadius: 50,
      }}
      onPress={() => setSelectedOption(title)}
    >
      <Text style={{ 
        fontWeight: 'bold',
        fontSize: 16,
    
        color: selectedOption === title ? 'white' : '#8C8C8C'
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
  
  const renderMenu = (menuItems) => {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

     
      <FlatList
        data={menuItems}
        numColumns={numColumns}
        key={numColumns}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item, item: item })}>
            <View style={styles.productItem}>
              <View>
                <Image source={{ uri: item.productImage || item.menuImage }} style={styles.productImage} />
              </View>
              <Text style={styles.name}>{item.productName || item.menuName}</Text>
              <Text style={styles.name}>{item.productDesc || item.menuDesc}</Text>
              <View style={styles.priceView}>
                <Text style={styles.price}>{'₹' + item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
       </View>
    );
  };
// add for counter
useEffect(() => {
  const getData = async () => {
    const id = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('cart')
      .where('addedBy', '==', id)
      .onSnapshot(snapshot => {
        const list = [];
        let count = 0;
        snapshot.forEach(doc => {
          list.push({...doc.data(), id: doc.id});
          count += doc.data().qty;
        });
        setCartList(list);
        setCartCount(count); // set the total count here
      });
  };
  getData();
}, []);

  return (
    <View style={styles.container}>
      <ScrollView >
        <Text style={{ fontWeight: 'bold', color: '#40110D', textAlign: 'center', fontSize: 22, marginTop: 30 }}>Menu</Text>
        <View style={{ flexDirection: 'row', backgroundColor: 'rgb(211,211,211)',
         borderRadius: 90, alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', flex: 1, 
          color: '#8C8C8C', alignContent:'center',alignSelf:'center',
          justifyContent: 'center',  width: 260, margin:20  }}>
          <RadioButton title="Coffee Beans" />
          <RadioButton title="Drinks" />
        </View>
      
{/*  */}
<View
  style={{
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 10,
    paddingBottom:20,
  }}>
  <Pressable
    style={({ pressed }) => ({
      marginHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
      padding: 10,
      backgroundColor: size === 'Signature' ? '#AA7C4C' : '#EDEDED',
      width: 118,
      height: 50,
      textAlign: 'center',
    })}
    onPress={() => setSize('Signature')}
  >
    <Image 
      source={require('../../assets/A.png')} 
      style={{margin: 4, tintColor: size === 'Signature' ? 'white' : '#8C8C8C'}} 
    />
    <Text style={{color: size === 'Signature' ? 'white' : '#8C8C8C', fontWeight: 'bold'}}>Signature</Text>
  </Pressable>
  <Pressable
    style={({ pressed }) => ({
      marginHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
      padding: 10,
      backgroundColor: size === 'Iced' ? '#AA7C4C' : '#EDEDED',
      width: 118,
      height: 50,
      textAlign: 'center',
    })}
    onPress={() => setSize('Iced')}
  >
    <Image 
      source={require('../../assets/A.png')} 
      style={{margin: 4, tintColor: size === 'Iced' ? 'white' : '#8C8C8C'}} 
    />
    <Text style={{color: size === 'Iced' ? 'white' : '#8C8C8C', fontWeight: 'bold'}}>Iced</Text>
  </Pressable>
  <Pressable
    style={({ pressed }) => ({
      marginHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
      padding: 10,
      backgroundColor: size === 'Cream' ? '#AA7C4C' : '#EDEDED',
      width: 118,
      height: 50,
      textAlign: 'center',
    })}
    onPress={() => setSize('Cream')}
  >
    <Image 
      source={require('../../assets/A.png')} 
      style={{margin: 4, tintColor: size === 'Cream' ? 'white' : '#8C8C8C'}} 
    />
    <Text style={{color: size === 'Cream' ? 'white' : '#8C8C8C', fontWeight: 'bold'}}>Cream</Text>
  </Pressable>
</View>

{renderMenu(products)}
{/*  */}
      </ScrollView>
      <View style={styles.header}>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
  <Image
    source={require('../../assets/Carts.png')}
    style={{
      right: 0,
      padding: 10,
      margin: 40,
      bottom: 30,
      position: 'absolute',
    }}
  />
  {cartCount > 0 && (
    <View
      style={{
  
        position: 'absolute',
        backgroundColor: 'black',
      
        width: 35,
        height: 35,
        right:30,
        bottom: 110,
  justifyContent:'center',
  alignContent:'center',
  alignSelf:'center',
  borderRadius:20,
      }}>
      <Text style={{color: 'white', alignItems:'center',fontSize:25, fontWeight:'bold',justifyContent:'center',
alignContent:'center',
alignSelf:'center',}}>{cartCount}</Text>
    </View>
  )}
</TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../../assets/Carts.png')}
            style={{
              right: 0,
              padding: 10,
              margin: 40,
              bottom: 30,
              position: 'absolute',
            }}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Search;


const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:'white'

  },
  header: {
    width: '100%',
    height: 65,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    color: '#40110D',
    fontWeight: '700',
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    top: 20,
    margin: 20,
  },
  productImage: {
    width: 140,
    height: 200,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf:'center',
    marginLeft:20,
    marginRight:20,
    flexShrink: 1,

  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    bottom: 80,
 
  alignSelf:'center'

  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 230,
    marginLeft: 70,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    textAlignVertical: 'center',
    
  },

  price: {
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    textAlign: 'center',
    position: 'absolute',
    color: '#40110D',
    width: 56,
    height: 25,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    
  },
  rightView: {
    marginLeft: 10,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  addToCart: {
    padding: 10,
    borderWidth: 0.5,
    color: 'black',
    fontWeight: '600',
    marginTop: 10,
    borderRadius: 20,
  },
  text: {
    fontWeight: '600',
    marginTop: 20,
    fontSize: 20,
    marginLeft: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image1: {
    alignItems: 'center',
    margin: 20,
    padding: 20,
  },
  productItem:{
    justifyContent:'center',
    alignContent:'center'
  }
});



