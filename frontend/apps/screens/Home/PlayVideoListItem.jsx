import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { ResizeMode, Video } from 'expo-av'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import colors from '../../util/colors';

export default function PlayVideoListItem({video}) {
    const videoRef = useRef(null);
    const [status, setStatus] = useState({});
    const BottomTabHeight = useBottomTabBarHeight()

    const ScreenHeight = Dimensions.get('window').height-BottomTabHeight

    // Add null checks
    const profileImage = video?.profileImage || 'default_image_url'
    const name = video?.username || 'Unknown'
    const description = video?.description || 'No description'
    const videoUrl = video?.videoUrl || null

    if (!videoUrl) {
        return <Text>Video not available</Text>
    }

    return (
        <View>
            <View style={{position:'absolute',zIndex:10,bottom:20,padding:20, display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap:10
                }}>
                    <Image source={{uri: profileImage}}
                    style={{width:30,height:30,backgroundColor:colors.WHITE,borderRadius:99}}
                    />
                    <Text style={{fontFamily:'Outfit',color:colors.WHITE,fontSize:16
                    }}>{name}</Text>
                </View>
                <Text style={{fontFamily:'Outfit',color:colors.WHITE,fontSize:16, marginTop:7
                    }}>{description}</Text>
            </View>

            <Video
                ref={videoRef}
                style={[styles.video, {height: ScreenHeight}]}
                source={{
                    uri: videoUrl
                }}
                useNativeControls={false}
                isLooping={true}
                shouldPlay
                resizeMode={ResizeMode.COVER}
                onPlaybackStatusUpdate={status => setStatus(()=>status)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height    
    },
})