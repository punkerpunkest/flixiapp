import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import {useRoute, useNavigation} from '@react-navigation/native'
import colors from '../../util/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { s3bucket } from '../../util/S3BucketConfig';
import {getUsername} from '../../screens/LoginScreen/LoginScreen'
import { getProfile } from '../SelectFile/SelectFile';
import { supabase } from '../../util/SupabaseConfig';
export default function PreviewScreen() {
    const params=useRoute().params;
    const navigation=useNavigation();
    const [description,setDescription]=useState();
    const [videoUrl,setVideoUrl]=useState();
    const publishHandler = async () => {
        try {
            const uploadedVideoUrl = await UploadFileToAws(params.video, 'video');
            console.log("Uploaded Video URL:", uploadedVideoUrl); // Add this log
    
            if (!uploadedVideoUrl) {
                console.error("Failed to upload video");
                return;
            }
    
            const username = await getUsername();
            const profileImage = await getProfile();
            
            const { data, error } = await supabase
                .from('PostList')
                .insert({
                    videoUrl: uploadedVideoUrl,
                    description: description,
                    username: username,
                    profileImage: profileImage
                })
                .select()
            
            if (error) console.error('Error inserting data:', error);
            else console.log('Data inserted successfully:', data);
        } catch (error) {
            console.error("Error in publishHandler:", error);
        }
    }

    const UploadFileToAws = async (file, type) => {
        const fileType = file.split('.').pop();
        const params = {
            Bucket: 'flixi',
            Key: `flixi-${Date.now()}.${fileType}`,
            Body: await fetch(file).then(resp => resp.blob()),
            ACL: 'public-read',
            ContentType: type == 'video' ? `video/${fileType}` : `image/${fileType}`
        }
        try {
            const resp = await s3bucket.upload(params).promise();
            console.log("File Upload..");
            console.log("RESP:", resp?.Location);
            return resp?.Location;  // Return the URL directly
        } catch (e) {
            console.error("Error uploading to AWS:", e);
            return null;
        }
    }
  
    return (
    <KeyboardAvoidingView style={{backgroundColor:colors.WHITE,flex:1}}>
    <ScrollView style={{padding:20}}>
        <TouchableOpacity 
        onPress={()=>navigation.goBack()}
        style={{display: 'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
        <AntDesign name="back" size={30} color="black" />
        <Text style={{fontFamily:'Outfit', fontSize:15}}>Back</Text>
        </TouchableOpacity>
        <View style={{
            alignItems:'center',
            marginTop:45
        }}>
        <Text style={{
            fontFamily:'Outfit-Bold',
            fontSize:20
        }}>Add Details</Text>
        <Image source={{uri:params?.thumbnail}}
            style={{
                width:200,
                height:300,
                borderRadius:15,
                marginTop:15

            }}
        />
        <TextInput
        numberOfLines={3}
        placeholder='Description'
        onChangeText={(value)=>setDescription(value)}
        style={{
            borderWidth:1,
            width:'100%',
            borderRadius:10,
            marginTop:25,
            borderColor:colors.BACKGROUND_TRANSP,
            paddingHorizontal:10
        }}
        />

        <TouchableOpacity
        onPress={publishHandler} 
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

        }}>Publish</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}