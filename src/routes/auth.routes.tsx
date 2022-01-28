import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';
import { Complete } from '../screens/Complete/index.';

const Stack = createNativeStackNavigator();

export function AuthRoutes(){
   return(
      <Stack.Navigator initialRouteName='Splash' screenOptions={{
         headerShown: false,
         animation: 'slide_from_bottom',
      }}>
         <Stack.Screen name="Splash" component={Splash}/>
         <Stack.Screen name="SignIn" options={{
            gestureEnabled: false,
         }} component={SignIn}/>
         <Stack.Screen name="SignUpFirstStep" component={SignUpFirstStep}/>
         <Stack.Screen name="SignUpSecondStep" component={SignUpSecondStep}/>
         <Stack.Screen name="Confirmation" component={Complete}/>
      </Stack.Navigator>
   );
}