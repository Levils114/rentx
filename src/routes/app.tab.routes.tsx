import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MyCars } from '../screens/MyCars';

import { useTheme } from 'styled-components';
import { AppStackRoutes } from './app.stack.routes';

import HomeSvg from "./../assets/home.svg";
import MyCarsSvg from "./../assets/car.svg";
import ProfileSvg from "./../assets/people.svg";
import { SvgProps } from 'react-native-svg';
import { Platform } from 'react-native';
import { Profile } from '../screens/Profile';

const Tab = createBottomTabNavigator();

export function AppTabRoutes(){
   const theme = useTheme();

   return(
      <Tab.Navigator screenOptions={({ route }) => ({
         headerShown: false,
         tabBarIcon: ({ color }) => {
            let IconComponent: React.FC<SvgProps>;

            if (route.name === 'Initial') {
               IconComponent = HomeSvg;
            } else if (route.name === 'Profile') {
               IconComponent = ProfileSvg;
            }  else if (route.name === 'MyCars') {
               IconComponent = MyCarsSvg;
            }

            return <IconComponent width={24} height={24} fill={color} />;
          },
         tabBarActiveTintColor: theme.colors.main ,
         tabBarInactiveTintColor: theme.colors.text_detail,
         tabBarShowLabel: false,
         tabBarStyle: {
            paddingVertical: Platform.OS === "ios" ? 20 : 0,
            height: 78,
            backgroundColor: theme.colors.background_primary,
         }
      })}>
         <Tab.Screen name="Initial" component={AppStackRoutes}/>
         <Tab.Screen name="MyCars" component={MyCars}/>
         <Tab.Screen name="Profile" component={Profile}/>
      </Tab.Navigator>
   );
}