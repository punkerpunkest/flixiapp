import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import PlayVideoListItem from './PlayVideoListItem';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation} from '@react-navigation/native';
import { supabase } from '../../util/SupabaseConfig';
import { Image, TouchableOpacity } from 'react-native';


export default function HomeScreen() {
    const [videoList,setVideoList]=useState([]);
    const [loading,setLoading]=useState([]);
    const navigation=useNavigation();
    const GetLatestVideoList=async()=>{
        setLoading(true);
        const {data,error}=await supabase
        .from('PostList')
        .select('*')
        .order('id', {ascending:false})
        setVideoList(data);

        console.log(error)
        if(data){
            setLoading(false)
        }
    }

    useEffect(()=>{
        GetLatestVideoList();
    }, [])
  
    return (
    <View>
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
        style={{position: 'absolute',display: 'flex', flexDirection:'row', gap:0, alignItems:'center',zIndex:10}}>
        <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
      <FlatList
      data={videoList}
      style={{zIndex:-1}}
      pagingEnabled
      renderItem={({item,index})=>(
        <PlayVideoListItem video={item} key={index}/>
      )}


      />
    </View>
  )
}