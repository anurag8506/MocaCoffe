import React, {useEffect, useState} from 'react';
import { View,Text, Image,TouchableOpacity,StyleSheet,ScrollView,TextInput,FlatList,Pressable,viewAll} from 'react-native';
import removeIcon from '../../assets/delete.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import LoginSignupDialog from '../common/LoginSignupDialog';

const ProductDetails = ({route, navigation}) => {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const toppings = ['Boba', 'Sugar', 'Cream', 'Cheese'];
  const [quantity, setQuantity] = useState(1);
  const [cartList, setCartList] = useState([]);
  const [qty, setQty] = useState(1);
  const {product} = route.params;
  const {menus} = route.params;
  const [isPressed, setIsPressed] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [count, setCount] = useState(0);
  const [additionalReq, setAdditionalReq] = useState(''); // New state for additional requirements
  
  const newProduct = {
    productImage: product.productImage || product.menuImage,
    productName: product.productName || product.menuName,
    productDesc: product.productDesc || product.menuDesc,
    ...product
  };
  const [products, setProducts] = useState([]);
  const [productsH, setProductsH] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
 const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    getProducts();
    getProductsH();
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
  
  const getProductsH = () => {
    firestore()
      .collection('productsH')
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          setProductsH(snapshot.docs);
        }
      });
  }

  const toggleTopping = topping => {
    setSelectedToppings(prev => {
      if (prev.includes(topping)) {
        return prev.filter(t => t !== topping);
      } else {
        return [...prev, topping];
      }
    });
  };

  const [size, setSize] = useState('Basic');
 
  const [visible, setVisible] = useState(false);

  const checkLogin = async () => {
    let id = await AsyncStorage.getItem('USERID');
    
    const cartId = uuid.v4();
    if (id == null) {
      id = uuid.v4();
      await AsyncStorage.setItem('USERID', id);
    }
    firestore()
      .collection('cart')
      .where('addedBy', '==', id)
      .where('productId', '==', newProduct.productId || newProduct.menuId || newProduct.productIdH)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          snapshot.docs.map(doc => {
            firestore()
              .collection('cart')
              .doc(doc.id)
              .update({qty: doc.data().qty + 1});
          });
        } else {
          firestore()
            .collection('cart')
            .add({
              ...newProduct,
              price: newProduct.price || newProduct.menuPrice || newProduct.priceH,
              addedBy: id,
              qty: 1,
              cartId: cartId,
              additionalReq: additionalReq, // Add additional requirements here
            });
        }
      });
  };

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

  const increaseQty = () => {
    setQty(qty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

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
          setCartCount(count);
        });
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.ImageJi}>
          <Image
            source={{uri: newProduct.productImage|| newProduct.productImageH}}
            style={styles.productImage1}
          />
        </View>
        <Text style={styles.name1}>{newProduct.productName||newProduct.productNameH}</Text>
        <Text style={styles.desc1}>{newProduct.productDesc||newProduct.productDescH}</Text>
        <LoginSignupDialog
          onClickLoginSign={() => {
            navigation.navigate('Login');
          }}
          onCancle={() => {
            setVisible(false);
          }}
          visible={visible}
        />
        <View>
          <Text style={styles.subtitle}>Toppings</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {toppings.map(topping => (
                <TouchableOpacity
                  key={topping}
                  onPress={() => toggleTopping(topping)}
                  style={{ alignItems: 'center' }}
                >
                  <View
                    style={[
                      styles.topping,
                      {
                        backgroundColor: selectedToppings.includes(topping)
                          ? '#AA7C4C'
                          : '#F3F3F3',
                        width: 80,
                        height: 40,
                        borderRadius: 30,
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <Text style={{color: selectedToppings.includes(topping) ? 'white' : '#40110D'}}>
                      {topping}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <Text style={styles.subtitle}>Additional Requirements</Text>
          <View
            style={{
              width: 300,
              height: 156,
              backgroundColor:'#F3F3F3',
              borderRadius: 20,
              marginLeft: 20,
              bottom: 20,
              margin:10,
              flexShrink: 1,
              alignSelf:'center'
            }}>
            <TextInput 
              placeholder="Write To Requrire" 
              placeholderTextColor="black"
              style={{margin:10, flexShrink: 1, color:'black'}}  
              onChangeText={text => setAdditionalReq(text)}
              value={additionalReq}
            />
          </View>
          <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#40110D' }}>Recommeded For You</Text>
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
          <View style={styles.bottomBar}></View>
        </View>
      
      
        
      </ScrollView>

      <View style={styles.bottomView}>
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
          <TouchableOpacity style={styles.addToCartButton} onPress={checkLogin}>
            <Text style={styles.price1}>{'₹' + (newProduct.price || newProduct.priceH)}</Text>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
    backgroundColor: 'white',
  },
  productImage1: {
    height: 230,
    margin: 20,
    width: 187,
    borderRadius:20,
  },
  name1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  desc1: {
    fontSize: 16,
    marginTop: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  price1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'white',
    textAlignVertical: 'center',
  },
  addToCartButton: {
    marginTop: 1,
    padding: 10,
    width: '40%',
    backgroundColor: '#AA7C4C',
    flexDirection: 'row',
    borderRadius: 30,
    marginLeft: 170,
    textAlignVertical: 'center',
  },
  addToCartText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    textAlignVertical: 'center',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  ImageJi: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#EBEAEA',
    padding: 20,
    marginTop: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  sizeContainer: {marginVertical: 20,},
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 30,
    color: 'rgba(64, 17, 13, 1)',
    
  },
  sizeOptions: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',

    
   
  },
  sizeOption: {
    alignItems: 'center',
    padding: 20,
    width: 100,
    height: 100,
    textAlign: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    margin: 10,
  },
  icon: {marginTop: 10,width:20,height:25,},
  topping: {borderRadius: 5,color: '#40110D', justifyContent:'flex-start', margin:10, alignItems:"center",justifyContent:'center'},
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  counter: {flexDirection: 'row', alignItems: 'center'},
  count: {marginHorizontal: 10},
  button: {backgroundColor: '#000', padding: 10},
  buttonText: {color: '#fff'},
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  verticalImage: {width: '45%', height: 200},
  horizontalImage: {width: '45%', height: 100},

  header1: {
    width: '100%',
    height: 65,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  bottomView: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    position: 'relative',
    
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  rightView: {
    
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

export default ProductDetails;
