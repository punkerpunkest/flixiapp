import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import {useUser} from '@clerk/clerk-expo'
import { supabase } from '../../util/SupabaseConfig';
import colors from '../../util/colors';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import {useNavigation} from '@react-navigation/native'
let profileImage =''
export const getProfile = () => profileImage;

export default function SelectFile() {
  const navigation=useNavigation(); 
  
  const {user}=useUser();

  useEffect(()=>{
    user&&updateProfileImage();
  }, [user])

  const updateProfileImage=async()=>{
    profileImage=user?.imageUrl;
    const {data,error}=await supabase
    .from('Users')
    .update({'profileImage':profileImage})
    .eq('email',user?.primaryEmailAddress?.emailAddress)
    .is('profileImage',null)
    .select();
    console.log(data);
  }

  const SelectVideoFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      GenerateVideoThumbnail(result.assets[0].uri)
    }
  };
  
  //Used to Generate Thumbnail
  const GenerateVideoThumbnail=async(videoUri)=>{
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        videoUri,
        {
          time: 5000,
        }
      );
      console.log("Thumbnail",uri)
      navigation.navigate('preview-screen',{
        video:videoUri,
        thumbnail:uri
      })
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <View style={{
      padding: 20,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flex:1
    }}>
      <Image source={require('./../../../assets/images/folder_PNG100476.png')}
        style={{
          width:100,
          height:100
        }}
      />
      <Text style={{
        fontFamily:'Outfit-Bold',
        fontSize:20,
        textAlign:'center',
        marginTop:20,
      }}>Start your love life with some short videos!</Text>
      <Text style={{
        fontFamily:'Outfit-Bold',
        fontSize:20,
        textAlign:'center',
        marginTop:13
      }}>Lets get flixi!</Text>

      <TouchableOpacity 
        onPress={SelectVideoFile}
        style={{
        backgroundColor:colors.BLACK,
        padding:10,
        paddingHorizontal:25,
        borderRadius:99,
        marginTop:20
      }}>
        <Text style={{
          color:colors.WHITE,
          fontFamily: 'Outfit'

        }}>Select video file</Text>
      </TouchableOpacity>
   
   
   
    </View>
  )
}