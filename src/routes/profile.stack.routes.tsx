import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '../screens/Profile';
import { Complete } from '../screens/Complete/index.';

const Stack = createNativeStackNavigator();

export function ProfileStack(){
   return(
      <Stack.Navigator initialRouteName='Profile' screenOptions={{
         headerShown: false,
         animation: "slide_from_bottom",
      }}>
         <Stack.Screen name='Profile' component={Profile}/>
         <Stack.Screen name='Complete' component={Complete}/>
      </Stack.Navigator>
   );
}