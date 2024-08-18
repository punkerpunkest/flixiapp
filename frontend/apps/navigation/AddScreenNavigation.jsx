import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PreviewScreen from '../screens/AddScreen/PreviewScreen';
import SelectFile from '../screens/SelectFile/SelectFile';

const Stack=createStackNavigator();
export default function AddScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name ='select-screen' component={SelectFile}/>
      <Stack.Screen name='preview-screen' component={PreviewScreen}/>
    </Stack.Navigator>
  )
}