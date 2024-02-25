
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  Pressable,viewAll
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSignupDialog from '../common/LoginSignupDialog';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Home = ({userName}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [numColumns, setNumColumns] = useState(2); 
  const [cartList, setCartList] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [productsH, setProductsH] = useState([]);
  const [viewAll, setViewAll] = useState(false);


  useEffect(() => {
    getProducts();
    getProductsH(); // fetch 'productsH' collection
  }, []);

  const getProducts = () => {
    firestore()
      .collection('products')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          setProducts(snapshot.docs);
        }
      });
  };



  // Add new part 
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
  // Add new part here
  
  const getProductsH = () => { // new function to fetch 'productsH' collection
    firestore()
      .collection('productsH')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          setProductsH(snapshot.docs);
        }
      });
  };

  useEffect(() => {
    const getData = async () => {
      const id = await AsyncStorage.getItem('USERIDH'); // changed from 'USERID' to 'USERIDH'
      firestore()
        .collection('cartH') // changed from 'cart' to 'cartH'
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
      <ScrollView>
        <View>
          <View style={styles.header1}>
            <Text style={styles.text}>Good Morning 👋,</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
              <Image
                style={styles.userIcon1}
                source={require('../../assets/Notices.png')} // Replace with your local image path
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
              <Image
                style={styles.userIcon}
                source={require('../../assets/Deepu1.png')} // Replace with your local image path
              />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize:20,color:'#40110D', marginLeft: 25,fontWeight:'bold'}}>{userName}</Text>
        </View>
        <View style={styles.image1}>
          <Image source={require('../../assets/Image.png')} />
        </View>
        <View
          style={{
         marginLeft:10,
         marginRight:10,
        
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#40110D'}}>
          Moca Coffee
          </Text>
          <Text style={{color: '#B1A8A8'}}>View All</Text>
        </View>
        {/*  */}
 <View
  style={{
    flexDirection: 'column',
    marginBottom: 20,
    // Add new here
    justifyContent: 'center', // centers items on the y-axis
    alignItems: 'center',
  }}
  >
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      margin:10,
      padding:10,
      alignContent:'space-btween'

    }}
    >
    <Pressable
      style={({ pressed }) => ({
        marginHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: pressed ? '#AA7C4C' : '#F8F8F8',
        width: 143,
        height: 48,
        borderRadius:45,
      margin:10,
      })}
    >
      <Image source={require('../../assets/GR.png')}  style={{margin:10}}/>
      <View >
        <Text style={{color:'#40110D'}}>Organi</Text>
        <Text style={{color:'#40110D'}}>beans</Text>
      </View>
    </Pressable>
    <Pressable
      style={({ pressed }) => ({
        marginHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
    
        padding: 10,
        backgroundColor: pressed ? '#AA7C4C' : '#F8F8F8',
        width: 143,
        height: 48,
        borderRadius:45,
        margin: 10,
      })}
    >
      <Image source={require('../../assets/GR1.png')}  style={{margin:10}} />
      <View>
        <Text style={{color:'#40110D'}}>Origainal</Text>
        <Text style={{color:'#40110D'}}>drinks</Text>
      </View>
    </Pressable>
  </View>
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
    }}
  >
    <Pressable
      style={({ pressed }) => ({
        marginHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: pressed ? '#AA7C4C' : '#F8F8F8',
        width: 143,
        height: 48,
        borderRadius:45,
        margin: 10,
      })}
    >
      <Image source={require('../../assets/GR2.png')}  style={{margin:10}} />
      <View>
        <Text style={{color:'#40110D'}}>Coffee</Text>
        <Text style={{color:'#40110D'}}>roasters</Text>
      </View>
    </Pressable>
    <Pressable
      style={({ pressed }) => ({
        marginHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',

        padding: 10,
        backgroundColor: pressed ? '#AA7C4C' : '#F8F8F8',
        width: 143,
        height: 48,
        borderRadius:45,
        margin: 10,
      })}
    >
      <Image source={require('../../assets/GR3.png')}  style={{margin:10}} />
      <View>
        <Text style={{color:'#40110D'}}>Online</Text>
        <Text style={{color:'#40110D'}}>Store</Text>
      </View>
    </Pressable>
  </View>
  </View>
        <View>
       
           <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#40110D' }}>Bestseller Coffees</Text>
      <TouchableOpacity onPress={() => setViewAll(true)}>
        <Text style={{ color: '#B1A8A8' }}>View All</Text>
      </TouchableOpacity>
    </View>

    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={viewAll ? products : products.slice(0, 2)}
        numColumns={numColumns}
        key={numColumns}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item._data })}>
              <View style={styles.productItem}>
                <Image source={{ uri: item._data.productImage }} style={styles.productImage} />
                <Text style={styles.name}>{item._data.productName}</Text>
                <Text style={styles.name}>{item._data.productDesc}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.price}>{'₹' + item._data.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>

         <View
            style={{
              margin: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#40110D'}}>
              Bestseller Coffees
            </Text>
            <Text style={{color: '#B1A8A8'}}>View All</Text>
          </View>       
<View style={{ flex: 1 }}>
  <ScrollView horizontal={true}>
    <View
      style={{
        flexDirection: "row", 
        flexWrap: "nowrap",
      
      }}
    >
      <FlatList
        data={productsH} // use 'productsH' state here
        horizontal={true} // add this line
        numColumns={1} // change this to 1
        keyExtractor={(item, index) => index.toString()} // add a key extractor
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity 
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  product: item._data,
                })
              }>
             <View
                style={{
             
                  flexDirection: "column",
                  alignItems: "center",
               padding:10,
                }}
              >
                <View 
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                style={{
                  backgroundColor: "#E4B88A",
                  borderRadius: 30,
                  width: 200,
                  textAlign: "center",
                  alignItems: "center",
                  
                }}
                >
                    <Image
    source={{uri: item._data.productImage}}
    style={{
     
      width: 152, // specify dimensions
      height: 182,
      top: -20, // increase this value to move the image more towards the top
      zIndex:-4,
    
    }}
    
  />



                  <View
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      color: "#40110D",
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{ fontWeight: "bold", margin: 10, fontSize: 30,bottom:10, }}
                    >
                      {item._data.productName}
                    </Text>
                    <Text    style={{
                     
                      
                        bottom:20,
                       
                      }} >{item._data.productDesc}</Text>
                    <Text
                      style={{
                        color: "#763C00",
                        fontWeight: "bold",
                        fontSize: 30,
                        bottom:10,
                       
                      }}
                    >
                      {'₹' + item._data.price}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

    </View>
  </ScrollView>
  <Text></Text>
  <Text></Text>

</View> 

        </View>
        <LoginSignupDialog
          onClickLoginSign={() => {
            navigation.navigate('Login');
          }}
          onCancle={() => {
            setVisible(false);
          }}
          visible={visible}
        />
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
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
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
    top: 10,
    margin: 10,
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
    fontWeight: '500',
    marginTop: 20,
    fontSize: 16,
    color:'#40110D',
    marginLeft:10,
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
  userIcon1:{
    marginLeft:90,
  },
  productItem:{
    justifyContent:'center',
    alignContent:'center',
    marginLeft:10,
    marginRight:10,
    marginHorizontal:20,
  

  }
});
