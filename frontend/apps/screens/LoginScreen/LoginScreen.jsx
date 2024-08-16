import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import colors from '../../util/colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
 useWarmUpBrowser();

 const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"});

 const onPress = React.useCallback(async () => {
  try {
    const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

    if (createdSessionId) {
      setActive({ session: createdSessionId })
    } else {
      // Use signIn or signUp for next steps such as MFA
    }
  } catch (err) {
    console.error('OAuth error', err)
  }
 }, [])
 
 
  return (
    <View style={{flex:1}}>
    <Video
      style={styles.video}
      source={{
        uri:'https://cdn.pixabay.com/video/2016/09/14/5278-182817488_large.mp4'
      }}
      shouldPlay
      resizeMode='cover'
      isLooping={true}
      />
      <View style={{
        display:'flex',
        alignItems:'center',
        paddingTop:100,
        flex: 1,
        paddingHorizontal:20,
        backgroundColor:colors.BACKGROUND_TRANSP
      }}>
        <Text
          style={{
            fontFamily:'Outfit-Bold',
            color:colors.WHITE,
            fontSize:35,
          }}>
          Flixi</Text>
          <Text
          style={{
            fontFamily:'Outfit',
            color:colors.WHITE,
            fontSize:17,
            textAlign: 'center',
            marginTop: 15
          }}
          >Find someone who can ACTUALLY match YOUR freak - Angel</Text>
      <TouchableOpacity
      onPress={onPress}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap:10,
        flexDirection: 'row',
        backgroundColor:colors.WHITE,
        padding:10,
        paddingHorizontal:40,
        borderRadius:99,
        position: 'absolute',
        bottom:100
      }}>
        <Image source={require('./../../../assets/images/google-icon.png')}
        style={{
          width:30,
          height:30,

        }}
        />
        <Text style={{
          fontFamily:'Outfit'
        }}>Sign in with Google</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    video:{
        height:'100%',
        width:'100%',
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0
    }
})