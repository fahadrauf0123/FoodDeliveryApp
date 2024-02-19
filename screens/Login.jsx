import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ToastAndroid
} from "react-native"
// import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import { baseUrl } from '../env'

import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { authSuccessful } from "../redux";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ navigation }) => {

  const authToken = useSelector(state => state.auth.authToken)

  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async () => {
    if (!email || !password) return ToastAndroid.show('Fields are required', ToastAndroid.SHORT)
    const body = {
      email,
      password,
    }
    try {
      ToastAndroid.show('Processing Request', ToastAndroid.SHORT)
      const res = await axios.post(`${baseUrl}/auth/login`, body)
      if (res.status == 200) {
        ToastAndroid.show('Success', ToastAndroid.SHORT)
        dispatch(authSuccessful(res.data.data.accessToken))
        navigation.navigate('HomeTabs')
      }
    } catch (error) {
      console.log(error.response.data)
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT)
    }
  }

  const checkAuth = async () => {
    if (authToken) {
      try {
        const res = await axios.get(`${baseUrl}/auth/getMe`,
          {
            headers: {
              'Authorization': authToken
            }
          }
        )
        if (res.status == 200) {
          ToastAndroid.show('Success', ToastAndroid.SHORT)
          dispatch(authSuccessful(res.data.data.accessToken))
          navigation.navigate('HomeTabs')
        }
      } catch (error) {
        console.log(error.response.data)
        ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT)
      }
    }
  }

  useEffect(() => {
    checkAuth()
  }, [authToken])


  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          source={images.pizza_restaurant}
          resizeMode="contain"
          style={{
            width: "60%"
          }}
        />
      </View>
    )
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Email Address</Text>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{
                flex: 1,
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3
              }}
              placeholder="Email Address"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Password</Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3
            }}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            value={password}
            onChangeText={text => setPassword(text)}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              bottom: 10,
              height: 30,
              width: 30
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? icons.disable_eye : icons.eye}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.white
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function renderButton() {
    return (
      <>
        <View style={{ margin: SIZES.padding * 3 }}>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: COLORS.black,
              borderRadius: SIZES.radius / 3.5,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => handleLogin()}
          >
            <Text style={{ color: COLORS.white }}>Login Now</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: SIZES.padding * 3 }}>
          <TouchableOpacity
            style={{
              height: 30,
              backgroundColor: COLORS.gray,
              borderRadius: SIZES.radius / 1.5,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={{ color: COLORS.black, ...FONTS.h3 }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      {/* <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{ flex: 1 }}
      > */}
      <View
        style={{ flex: 1, backgroundColor: COLORS.secondary }}
      >
        <ScrollView>
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login;