import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAuth } from '../../hooks/auth';

import BrandSvg from './../../assets/brand.svg';
import LogoSvg from './../../assets/logo.svg';

import {
   Container,
} from './styles';

export function Splash(){
   const splashAnimation = useSharedValue(0);
   const { navigate } = useNavigation();
   const { data: { user } } = useAuth();

   const brandStyle = useAnimatedStyle(() => ({
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0,]),
      transform: [
         { translateX: interpolate(splashAnimation.value, 
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP   
         ) }
      ]
   }));

   const logoStyle = useAnimatedStyle(() => ({
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1,]),
      transform: [
         { translateX: interpolate(splashAnimation.value, 
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP   
         ) }
      ]
   }));

   function goToHome(){
      navigate(user ? "Home" as never : "SignIn" as never);
   }

   useEffect(() => {
      splashAnimation.value = withTiming(
         50,
         { duration: 2000, },
         () => {
            'worklet'
            runOnJS(goToHome)();
         });
   }, []);

   return(
      <Container>
         <StatusBar barStyle='light-content'/>

         <Animated.View style={[brandStyle, { position: "absolute" }]}>
            <BrandSvg width={80} height={50}/>
         </Animated.View>

         <Animated.View style={[logoStyle, { position: "absolute" }]}>
            <LogoSvg width={180} height={20}/>
         </Animated.View>
      </Container>
   );
}