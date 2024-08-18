import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileIntro from './ProfileIntro'
import {supabase} from '../util/SupabaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserPostList from './UserPostList'

export default function ProfileScreen() {

  // const {user}=useUser();
  // const [postList, setPostList]=useState([]);
  // const [loading,setLoading]=useState(false)

  // useEffect(()=>{
  //   user&&GetUserPost();
  // },[user])

  // const GetUserPost=async()=>{
  //   setLoading(true)
  //   const {data,error}=await supabase
  //   .from('PostList')
  //   .select('*,VideoLikes(postIdRef,userEmail),Users(*)')
  //   .eq('emailRef',user?.primaryEmailAddress?.emailAddress)
  //   .order('id', { ascending: false })

  //   if(data)
  //   {
  //     setPostList(data)
  //     setLoading(false)
  //   }
  //   if(error)
  //   {
  //     setLoading(false)
  //   }
  // }

  return (
    <View style={{padding:20,paddingTop:25}}>
      <FlatList
        data={[{id:1}]}
        showsVerticalScrollIndicator={false}
        renderItem={({item,index})=>(
          <View>
            <ProfileIntro
              // postList={postList}
            />

            {/* <UserPostList 
            postList={postList}
            GetLatestVideoList={GetUserPost}
            loading={loading}
            /> */}
          </View>
        )}
      />
    </View>
  )
}