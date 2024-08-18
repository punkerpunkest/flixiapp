// import { View, Text, FlatList } from 'react-native'
// import React from 'react'
// import VideoThumbnailItem from '../Home/VideoThumbnailItem'

// export default function UserPostList({postList,GetLatestVideoList,loading}) {
//   return (
//     <View>
//       <FlatList 
//         data={postList}
//         numColumns={2}
//         style={{display:'flex'}}
//         onRefresh={GetLatestVideoList}
//         refreshing={loading}
//         renderItem={({item,index})=>(
//             <VideoThumbnailItem video={item} />
//         )}
//       />
//     </View>
//   )
// }