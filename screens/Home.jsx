import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
} from 'react-native';
import GetLocation from 'react-native-get-location'
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import { baseUrl } from '../env';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {

  const initialCurrentLocation = {
    streetName: 'Food Corner',
    gps: {
      latitude: 24.924016200264404,
      longitude: 67.13821339999998,
    },
  };

  const categoryData = [
    {
      id: 1,
      name: 'Rice',
      icon: icons.rice_bowl,
    },
    {
      id: 2,
      name: 'Noodles',
      icon: icons.noodle,
    },
    {
      id: 3,
      name: 'Hot Dogs',
      icon: icons.hotdog,
    },
    {
      id: 4,
      name: 'Salads',
      icon: icons.salad,
    },
    {
      id: 5,
      name: 'Burgers',
      icon: icons.hamburger,
    },
    {
      id: 6,
      name: 'Pizza',
      icon: icons.pizza,
    },
    {
      id: 7,
      name: 'Snacks',
      icon: icons.fries,
    },
    {
      id: 8,
      name: 'Sushi',
      icon: icons.sushi,
    },
    {
      id: 9,
      name: 'Desserts',
      icon: icons.donut,
    },
    {
      id: 10,
      name: 'Drinks',
      icon: icons.drink,
    },
  ];

  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  const restaurantData = [
    {
      id: 1,
      name: 'Balochistan Sajji',
      rating: 4.8,
      categories: [5, 7],
      priceRating: affordable,
      photo: images.burger_restaurant_1,
      duration: '30 - 45 min',
      location: {
        latitude: 24.908909147116265,
        longitude: 67.11941636931056,
      },
      courier: {
        avatar: images.avatar_3,
        name: 'Fahad',
        number: 'tel: 03193318769',
      },
      menus: [
        {
          menuId: 1,
          name: 'Crispy Chicken Burger',
          photo: images.crispy_chicken_burger,
          description: 'Burger with crispy chicken, cheese and lettuce',
          calories: 200,
          price: 10,
        },
        {
          menuId: 2,
          name: 'Crispy Chicken Burger with Honey Mustard',
          photo: images.honey_mustard_chicken_burger,
          description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
          calories: 250,
          price: 15,
        },
        {
          menuId: 3,
          name: 'Crispy Baked French Fries',
          photo: images.baked_fries,
          description: 'Crispy Baked French Fries',
          calories: 194,
          price: 8,
        },
      ],
    },
    {
      id: 2,
      name: 'Saltanat',
      rating: 4.8,
      categories: [2, 4, 6],
      priceRating: expensive,
      photo: images.pizza_restaurant,
      duration: '15 - 20 min',
      location: {
        latitude: 24.902663566589915,
        longitude: 67.11674098299964,
      },
      courier: {
        avatar: images.avatar_2,
        name: 'Tahir',
        number: 'tel: 03310230527',
      },
      menus: [
        {
          menuId: 4,
          name: 'Hawaiian Pizza',
          photo: images.hawaiian_pizza,
          description: 'Canadian bacon, homemade pizza crust, pizza sauce',
          calories: 250,
          price: 15,
        },
        {
          menuId: 5,
          name: 'Tomato & Basil Pizza',
          photo: images.pizza,
          description:
            'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
          calories: 250,
          price: 20,
        },
        {
          menuId: 6,
          name: 'Tomato Pasta',
          photo: images.tomato_pasta,
          description: 'Pasta with fresh tomatoes',
          calories: 100,
          price: 10,
        },
        {
          menuId: 7,
          name: 'Mediterranean Chopped Salad ',
          photo: images.salad,
          description: 'Finely chopped lettuce, tomatoes, cucumbers',
          calories: 100,
          price: 10,
        },
      ],
    },
    {
      id: 3,
      name: 'Kolachi',
      rating: 4.8,
      categories: [3],
      priceRating: expensive,
      photo: images.hot_dog_restaurant,
      duration: '20 - 25 min',
      location: {
        latitude: 24.75613358861056,
        longitude: 67.09501625504511,
      },
      courier: {
        avatar: images.avatar_3,
        name: 'Majid',
        number: 'tel: 03431325714',
      },
      menus: [
        {
          menuId: 8,
          name: 'Chicago Style Hot Dog',
          photo: images.chicago_hot_dog,
          description: 'Fresh tomatoes, all beef hot dogs',
          calories: 100,
          price: 20,
        },
      ],
    },
    {
      id: 4,
      name: 'BBQ Tonight',
      rating: 4.8,
      categories: [8],
      priceRating: expensive,
      photo: images.japanese_restaurant,
      duration: '10 - 15 min',
      location: {
        latitude: 24.816807475577786,
        longitude: 67.02255130694041,
      },
      courier: {
        avatar: images.avatar_4,
        name: 'Majid',
        number: 'tel: 03431325714',
      },
      menus: [
        {
          menuId: 9,
          name: 'Sushi sets',
          photo: images.sushi,
          description: 'Fresh salmon, sushi rice, fresh juicy avocado',
          calories: 100,
          price: 50,
        },
      ],
    },
    {
      id: 5,
      name: 'Delicious Cuisine',
      rating: 4.8,
      categories: [1, 2],
      priceRating: affordable,
      photo: images.noodle_shop,
      duration: '15 - 20 min',
      location: {
        latitude: 24.992358228996743,
        longitude: 67.13407219912871,
      },
      courier: {
        avatar: images.avatar_4,
        name: 'Tahir',
        number: 'tel: 03310230527',
      },
      menus: [
        {
          menuId: 10,
          name: 'Kolo Mee',
          photo: images.kolo_mee,
          description: 'Noodles with char siu',
          calories: 200,
          price: 5,
        },
        {
          menuId: 11,
          name: 'Sarawak Laksa',
          photo: images.sarawak_laksa,
          description: 'Vermicelli noodles, cooked prawns',
          calories: 300,
          price: 8,
        },
        {
          menuId: 12,
          name: 'Nasi Lemak',
          photo: images.nasi_lemak,
          description: 'A traditional Malay rice dish',
          calories: 300,
          price: 8,
        },
        {
          menuId: 13,
          name: 'Nasi Briyani with Mutton',
          photo: images.nasi_briyani_mutton,
          description: 'A traditional Indian rice dish with mutton',
          calories: 300,
          price: 8,
        },
      ],
    },
    {
      id: 6,
      name: 'Anwar Baloch',
      rating: 4.9,
      categories: [9, 10],
      priceRating: affordable,
      photo: images.kek_lapis_shop,
      duration: '35 - 40 min',
      location: {
        latitude: 24.87026907695655,
        longitude: 67.20028867903544,
      },
      courier: {
        avatar: images.avatar_4,
        name: 'Fahad',
        number: 'tel: 0319338769',
      },
      menus: [
        {
          menuId: 12,
          name: 'Teh C Peng',
          photo: images.teh_c_peng,
          description: 'Three Layer Teh C Peng',
          calories: 100,
          price: 2,
        },
        {
          menuId: 13,
          name: 'ABC Ice Kacang',
          photo: images.ice_kacang,
          description: 'Shaved Ice with red beans',
          calories: 100,
          price: 3,
        },
        {
          menuId: 14,
          name: 'Kek Lapis',
          photo: images.kek_lapis,
          description: 'Layer cakes',
          calories: 300,
          price: 20,
        },
      ],
    },
  ];

  const authToken = useSelector(state => state.auth.authToken);

  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState([]);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation,
  );

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseUrl}/category`, {
        headers: {
          Authorization: authToken,
        },
      })
      setCategories(res.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const fetchRestaurants = async (long, lat) => {
    try {
      const res = await axios.get(`${baseUrl}/restaurant/listing?lat=${lat}&long=${long}`, {
        headers: {
          Authorization: authToken,
        },
      })
      setRestaurants(res.data.restaurants)
    } catch (error) {
      console.log("fetch res list ==>", error.response.data)
    }
  }

  const fetchRestaurantsByCatID = async (catID) => {
    try {
      const res = await axios.get(`${baseUrl}/restaurant/getRestaurantbyCatID/${catID}`, {
        headers: {
          Authorization: authToken,
        },
      })
      setRestaurants(res.data.restaurants)
    } catch (error) {
      console.log("error by cat id ==>", error.response.data)
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT)
      setRestaurants([])
    }
  }

  useEffect(() => {
    fetchCategories()
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log(location);
        setCurrentLocation(prev => ({ ...prev, gps: { latitude: location.latitude, longitude: location.longitude } }))
        fetchRestaurants(location.longitude, location.latitude)
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })

  }, [])

  function onSelectCategory(category) {

    if (selectedCategory?._id == category._id) {
      setSelectedCategory(null);
      fetchRestaurants(currentLocation.gps.longitude, currentLocation.gps.latitude)
      return
    }

    fetchRestaurantsByCatID(category._id)
    setSelectedCategory(category);

  }

  function getCategoryNameById(id) {
    let category = categories.filter(a => a._id == id);

    if (category.length > 0) return category[0].name;

    return '';
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', height: 50 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?._id == item._id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?._id == item._id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={{ uri: item.media }}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?._id == item._id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h1 }}>Search by </Text>
        <Text style={{ ...FONTS.h1 }}>Categories</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item._id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: SIZES.padding * 2 }}
        onPress={() =>
          navigation.navigate('Restaurant', {
            restaurantID: item._id,
            location: currentLocation,
          })
        }>
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}>
          <Image
            source={{ uri: item.logo }}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={{ ...FONTS.h4 }}>10 - 15 min</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'row',
          }}>
          {/* Rating */}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body3 }}>4.1</Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            {item?.categories?.map(categoryId => {
              return (
                <View style={{ flexDirection: 'row' }} key={categoryId}>
                  <Text style={{ ...FONTS.body3 }}>
                    {getCategoryNameById(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                </View>
              );
            })}

            {/* Price */}
            {/* {[1, 2, 3].map(priceRating => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color:
                    priceRating <= item.priceRating
                      ? COLORS.black
                      : COLORS.darkgray,
                }}>
                $
              </Text>
            ))} */}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={restaurants}
        keyExtractor={item => `${item._id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
