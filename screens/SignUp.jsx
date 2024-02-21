import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native"
// import LinearGradient from 'react-native-linear-gradient'
import axios from "axios";
import { baseUrl } from '../env'

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const SignUp = ({ navigation }) => {

  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    ToastAndroid.show('Processing Request', ToastAndroid.SHORT)
    const body = {
      fullName: name,
      email,
      password,
      phoneNo: "+92" + contact,
    }
    try {
      const res = await axios.post(`${baseUrl}/auth/signup`, body)
      // console.log(res.data.data);
      ToastAndroid.show('Success', ToastAndroid.SHORT)
      if (res.status == 201) {
        navigation.navigate('Login')
      }
    } catch (error) {
      console.log(error.response.data)
      ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT)
    }
  }

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,
          height: 25,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          source={images.appLogo}
          resizeMode="contain"
          style={{
            borderRadius: 25,
            padding: 25,
            backgroundColor: COLORS.primary
          }}
        />
      </View>
    )
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 1.5,
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        {/* Full Name */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Full Name</Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.primary,
              borderBottomWidth: 1,
              height: 40,
              backgroundColor: COLORS.lightGray2,
              color: COLORS.darkgray,
              ...FONTS.body3
            }}
            selectionColor={COLORS.primary}
            placeholderTextColor={COLORS.primary}
            placeholder="Enter Full Name"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>

        {/* Email */}
        <View style={{ marginTop: SIZES.padding * 1.5 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Email Address</Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.primary,
              borderBottomWidth: 1,
              height: 40,
              backgroundColor: COLORS.lightGray2,
              color: COLORS.darkgray,
              ...FONTS.body3
            }}
            selectionColor={COLORS.primary}
            placeholderTextColor={COLORS.primary}
            placeholder="Enter Email Address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        {/* Phone Number */}
        <View style={{ marginTop: SIZES.padding * 1.5 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Phone Number</Text>

          <View style={{ flexDirection: 'row' }}>
            {/* Country Code */}
            <View
              style={{
                width: 70,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                flexDirection: 'row',
                ...FONTS.body2
              }}
            >
              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Image
                  source={images.pkFlag}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>+92</Text>
              </View>
            </View>

            {/* Phone Number */}
            <TextInput
              style={{
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.primary,
                borderBottomWidth: 1,
                height: 40,
                backgroundColor: COLORS.lightGray2,
                color: COLORS.darkgray,
                ...FONTS.body3
              }}
              selectionColor={COLORS.primary}
              placeholderTextColor={COLORS.primary}
              keyboardType="numeric"
              placeholder="Enter Phone Number"
              value={contact}
              onChangeText={text => setContact(text)}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ marginTop: SIZES.padding * 1.5 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Password</Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.primary,
              borderBottomWidth: 1,
              height: 40,
              backgroundColor: COLORS.lightGray2,
              color: COLORS.darkgray,
              ...FONTS.body3
            }}
            selectionColor={COLORS.primary}
            placeholderTextColor={COLORS.primary}
            placeholder="Enter Password"
            value={password}
            onChangeText={text => setPassword(text)}
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
                tintColor: COLORS.darkgray
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
            onPress={() => handleSignup()}
          >
            <Text style={{ color: COLORS.white }}>Signup Now</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
          <TouchableOpacity
            style={{
              height: 30,
              width: 100,
              borderColor: COLORS.darkgray,
              borderWidth: 1,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: COLORS.black, ...FONTS.h4 }}>Login</Text>
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
      <View
        style={{ flex: 1, backgroundColor: COLORS.lightGray4 }}
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

export default SignUp;