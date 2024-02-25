import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductDetailsPage from './ProductDetailsPage';
const messageIcon = require('../assets/M.png');
const userIcon = require('../assets/u.png');
const organicBeansIcon = require('../assets/Image.png');
const originalDrinksIcon = require('../assets/Image.png');
const coffeeImage1 = require('../assets/Coffe.png');
const coffeeImage2 = require('../assets/Track.png'); 
const coffeeImage3 = require('../assets/Splash.png');
const currentImage = require('../assets/S.png');

const MainPageHome = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('User');
  const [coffeeImages, setCoffeeImages] = useState([
    'YourCoffeeImagePath1',
    'YourCoffeeImagePath2',
    'YourCoffeeImagePath3',
  ]);
  const [currentImage, setCurrentImage] = useState(0);
  // Change coffee image every 5 seconds
  //   setInterval(() => {
  //     setCurrentImage((currentImage + 1) % coffeeImages.length);
  //   }, 5000);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text
            style={{
              fontWeight: '600',
              marginTop: 20,
              fontSize: 20,
              marginLeft: 10,
            }}>
            Good Morning 👋,
          </Text>
          <Text style={styles.greeting}>Deepanshu Chauhan</Text>
        </View>

        <View style={styles.icons}>
          <Image source={messageIcon} style={styles.icon} />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={userIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          
          alignItems: 'center',
          margin: 20,
       
          padding: 20,
        }}>
        <Image source={require('../assets/Image.png')} />
      </View>
      {/* <Image source={currentImage} style={styles.coffeeCard} /> */}
      <View
        style={{
          margin: 20,

          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontWeight: 'bold', fontSize:20}}>
          Recommeded For You
        </Text>
        <Text style={{color: '#B1A8A8'}}>View All</Text>
      </View>
      {/*  */}
      <View
        style={{
          flexDirection: 'cololm',
          marginBottom: 20
         
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
         
        
          }}>
          <Pressable
            style={({pressed}) => ({
              marginHorizontal: 4,
              flexDirection: 'col',
              alignItems: 'center',
              borderWidth: 0.5,
              padding: 10,
              backgroundColor: pressed ? '#AA7C4C' : 'transparent',
              width: 110,
              height: 80,
              borderRadius: 80,
              margin:10,
            
            })}>
             
            <Image source={require('../assets/GR.png')}  />
            <Text>Organi</Text>
            <Text>beans</Text>

           
          </Pressable>
          <Pressable
            style={({pressed}) => ({
              marginHorizontal: 4,
              flexDirection: 'col',
              alignItems: 'center',
              borderWidth: 0.5,
              backgroundColor: pressed ? '#AA7C4C' : 'transparent',
              width: 110,
              height: 80,
              borderRadius: 80,
              textAlign: 'center',
              marginLeft: 50,
            
            })}>
            <Image source={require('../assets/GR1.png')} style={{margin: 4}} />
            <Text>Origainal</Text>
            <Text>drinks</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Pressable
            style={({pressed}) => ({
              marginHorizontal: 4,
              flexDirection: 'col',
              alignItems: 'center',
              borderWidth: 0.5,

              backgroundColor: pressed ? '#AA7C4C' : 'transparent',
              width: 110,
              height: 80,
  
            borderRadius: 80,
              textAlign: 'center',
     
              padding: 10,
            })}>
            <Image source={require('../assets/GR2.png')} style={{margin: 4}} />
            <Text>Coffee</Text>
            <Text>roasters</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => ({
              marginHorizontal: 4,
              flexDirection: 'col',
              alignItems: 'center',
              borderWidth: 0.5,

              padding: 10,
              backgroundColor: pressed ? '#AA7C4C' : 'transparent',
              width: 110,
              height: 80,
      
              borderRadius: 80,
              marginLeft: 50,
             
              textAlign: 'center',
            })}>
            <Image source={require('../assets/GR3.png')} style={{margin: 4}} />
            <Text>Online</Text>
            <Text>Store</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          margin: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: '#40110D',
        }}>
        <Text style={{fontWeight: 'bold'}}>Recommeded For You</Text>
        <Text style={{color: '#B1A8A8'}}>View All</Text>
      </View>
      <View style={{borderRadius: 90}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            position: 'relative',
            margin: 10,
          }}>
          {[1, 2, 3, 4].map(item => (
            <View
              key={item}
              style={{
                width: '50%',
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetailsPage')}>
                <Image
                  source={require('../assets/F.png')}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  backgroundColor: '#F0F0F0',
                  borderRadius: 10,
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: 90,
                  color: '#40110D',
                  width: 55,
                  height: 21,
                  top: 20,
                }}>
                ₹187.0
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  marginBottom: 10,
                  bottom: 20,
                  color: 'white',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginLeft: 30,
                }}>
                {' '}
                Caramel{' '}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Image style={{margin: 20}} source={require('../assets/Image.png')} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          position: 'relative',
          margin: 10,
        }}>
        {[1, 2, 3, 4].map(item => (
          <View
            key={item}
            style={{
              width: '50%',
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/G.png')}
              style={{marginRight: 10}}
            />
            <Text
              style={{
                backgroundColor: '#F0F0F0',
                borderRadius: 10,
                textAlign: 'center',
                position: 'absolute',
                marginLeft: 90,
                color: '#40110D',
                width: 55,
                height: 21,
                top: 30,
              }}>
              ₹187.0
            </Text>
            <Text
              style={{
                position: 'absolute',
                marginBottom: 10,
                bottom: 20,
                color: 'white',
                alignItems: 'center',
                textAlign: 'center',
                marginLeft: 30,
              }}>
              {' '}
              Caramel{' '}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Popular This Week</Text>
      {/*  */}

      <View style={{flex: 1}}>
        <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'nowrap',

              margin: 10,
            }}>
            {[1, 2, 3, 4,5,6,7,8].map(item => (
              <View
                key={item}
                style={{
                  padding: 10,
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#E4B88A',
                    borderRadius: 40,
                    width: 250,
                    textAlign: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/i.png')}
                    style={{
                      marginBottom: 10,
                      top: -30,
                      justifyContent: 'center',
                      textAlign: 'center',
                    }}
                  />
                  <View
                    style={{
                      textAlign: 'center',
                      alignItems: 'center',
                      color: '#40110D',
                      marginBottom: 20,
                    }}>
                    <Text
                      style={{fontWeight: 'bold', margin: 10, fontSize: 30}}>
                      Americano
                    </Text>
                    <Text>Lorem ipsum nuttella Lorem</Text>
                    <Text>ipsum nuttella Lorem ipsum</Text>
                    <Text>nuttella.</Text>
                    <Text
                      style={{
                        color: '#763C00',
                        fontWeight: 'bold',
                        fontSize: 30,
                      }}>
                      Rs.550/-
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const OptionCard = ({title, icon}) => (
  <View style={styles.optionCard}>
    <Image source={icon} style={styles.icon} />
    <Text>{title}</Text>
  </View>
);

const CoffeeCard = ({title, price, image}) => (
  <View style={styles.coffeeCard}>
    <Text style={styles.price}>{price}</Text>

    <Image source={currentImage} style={styles.coffeeCard} />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const OfferCard = ({title, description, rating, image}) => (
  <View style={styles.offerCard}>
    <Image source={currentImage} style={styles.coffeeCard} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <Image source={require('../assets/Notice.png')} style={styles.icon} />
    <Text>{rating}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'rgba(255, 255, 255, 1)'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    margin: 30,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 4,
  },
  coffeeCard: {
    height: 200,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 80,
  },
  optionCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  coffeeCard: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  coffeeImage: {
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
  },
  offerCard: {
    width: 150,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
  offerImage: {
    height: 100,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default MainPageHome;
