import React from 'react';

import LottieView from 'lottie-react-native';

import LoadCar from './../../assets/load_car.json';

import {
   Container,
} from './styles';

export function LoadAnimated(){
   return(
      <Container>
         <LottieView 
            source={LoadCar}
            autoPlay
            resizeMode='contain'
            loop
            style={{
               height: 120,
            }}
         />
      </Container>
   );
}