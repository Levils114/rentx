import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import CarDetails from '../screens/CarDetails';
import Schedule from '../screens/Schedule';
import { Complete } from '../screens/Complete/index.';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

const Stack = createNativeStackNavigator();

export function AppStackRoutes(){
   return(
      <Stack.Navigator initialRouteName='Splash' screenOptions={{
         headerShown: false,
         animation: 'slide_from_bottom',
      }}>
         <Stack.Screen name="Splash" component={Splash}/>
         <Stack.Screen name="Home" options={{
            gestureEnabled: false,
         }} component={Home}/>
         <Stack.Screen name="CarDetails" component={CarDetails}/>
         <Stack.Screen name="Schedule" component={Schedule}/>
         <Stack.Screen name="SchedulingComplete" component={Complete}/>
         <Stack.Screen name="SchedulingDetails" component={SchedulingDetails}/>
         <Stack.Screen name="MyCars" component={MyCars}/>
      </Stack.Navigator>
   );
}