import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { 
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
 } from 'react-native-responsive-screen';
 import {ArrowUpRightIcon} from "react-native-heroicons/outline"
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
    const [fontsLoaded, fontError] = useFonts({
       FiraSansMedium: require("../font/FiraSans-Medium.ttf"),
       FiraSansMediumItalic: require("../font/FiraSans-MediumItalic.ttf"),
       FiraSansRegular: require("../font/FiraSans-Regular.ttf"),
    });

    const onLayoutRootView = useCallback(
      async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      },
      [fontsLoaded, fontError],
    )

    if (!fontsLoaded) {
      return null;
    }
    
  return (
    <View onLayout={onLayoutRootView}
    className="flex-1"
    style={{
      width: wp(100),
    }}
    >
      <View className="justify-center items-center"
      style={{
        width: wp(100),
        height: hp(100),
      }}
      >
        {/* Heart Icon Image */}
        <View className="justify-center items-center my-4"
        style={{
          width: wp(100),
        }}
        >

          <Image
            source={require("../../assets/welcome_guy.jpg")}
            style={{
              width: wp(130),
              height: hp(40),
              resizeMode: "contain",
            }}
          />
        </View>

        {/* Welcome Text */}
          <View className="w-full p-6 px-10">
            <Text className="font-semibold tracking-widest leading-none"
            style={{
              fontSize: wp(9),
              fontFamily: "FiraSansMediumItalic",
              color: "#EB4863",
            }}
            >
              Find your pair for life with Flicks
              </Text>

              <Text className="leading-none tracking-wider"
                style={{
                  fontSize: wp(4),
                  fontFamily: "FiraSansRegular",
                  color: "black",
                }}
                >
                The next gen Tiktok X Tinder - Find someone who can ACTUALLY match YOUR freak.
              </Text>
          </View>

          <View className="w-full px-10">
            <TouchableOpacity className="bg-[#EB4863] px-4 py-4 rounded-xl flex-row justify-center items-center w-[100%]"
            onPress={() => {
              navigation.navigate("HomeTabs");
            }}
            >
                <Text className="text-white font-vold mr-2"
                style={{
                  fontSize: wp(4),
                  fontFamily: "FiraSansRegular",
                }}>
                  Get Started
                  </Text>
                  <ArrowUpRightIcon color={"white"} size={20} strokeWidth={2.5} />
            </TouchableOpacity>
            
          </View>

      </View>
    </View>
  )
}