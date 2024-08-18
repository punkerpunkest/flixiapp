import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { useUser } from '@clerk/clerk-expo'
import colors from './../util/colors'
import { Ionicons } from '@expo/vector-icons'

export default function ProfileIntro({postList}) {
    const [fontsLoaded, fontError] = useFonts({
        outfit: require("../font/Outfit-Regular.ttf"),
        outfitmedium: require("../font/Outfit-Medium.ttf"),
        outfitbold: require("../font/Outfit-Bold.ttf"),
     });

    const {user}=useUser();

  return (
    <View style={{marginTop:30}}>
      <Text style={{
        fontFamily:'outfitbold',
        fontSize:24,
      }}
      >Profile</Text>
      
     <View style={{alignItems:'center', marginTop:20}}>
         <Image source={{uri:user.imageUrl}}
            style={{
                width:90,
                height:90,
                borderRadius:99
            }}
        />
        <Text style={{
            fontSize:22,
            fontFamily:'outfitmedium'
        }}>{user?.fullName}</Text>
        <Text style={{
            fontSize:17,
            fontFamily:'outfit',
            color:colors.BACKGROUND_TRANSP
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>
     </View>
     <View style={{marginTop:20,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between'}}>

        <View style={{
            padding:20,
            alignItems:'center'
        }}>
            <Ionicons name="videocam" size={24} color="black" />
            <Text style={{
                fontFamily:'outfitbold',
                fontSize:20
            }}>1 Posts</Text>
        </View>
        <View style={{
            padding:20,
            alignItems:'center'
        }}>
            <Ionicons name="heart" size={24} color="black" />
            <Text style={{
                fontFamily:'outfitbold',
                fontSize:20
            }}>0 Likes</Text>
        </View>
     </View>
    </View>

  )
}