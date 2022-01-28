import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { CarProps } from '../../@types/Car';

import Acessory from '../../components/Acessory';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import ImageSlider from '../../components/ImageSlider';
import { getCorrectAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
   Container,
   Header,
   Details,
   Description,
   Brand,
   Name,
   Rent,
   Period,
   Price,
   About,
   AccessoriesContainer,
   Footer,
} from './styles'

export default function CarDetails(){
   const { navigate, goBack } = useNavigation();
   const params = useRoute().params! as CarProps;

   const scrollY = useSharedValue(0);
   const scrollHandler = useAnimatedScrollHandler(event => {
      scrollY.value = event.contentOffset.y;
   });

   const headerAnimation = useAnimatedStyle(() => ({
      height: interpolate(scrollY.value,
         [0, 200],
         [200, 100],
         Extrapolate.CLAMP,
      ),
   }));

   const carSlideAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(scrollY.value,
         [0, 150],
         [1, 0]   
      ),
   }));

   return(
      <Container>
         <StatusBar 
            barStyle='dark-content' 
            translucent
            backgroundColor="transparent"
         />

         <Animated.View style={ headerAnimation }>
            <Header>
               <BackButton onPress={goBack}/>
            </Header>

            <Animated.View style={ carSlideAnimatedStyle }>
               <ImageSlider 
                  imagesUrl={params.photos}
               />
            </Animated.View>
         </Animated.View>

         <Animated.ScrollView
            contentContainerStyle={{
               padding: 24,
               alignItems: 'center'
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
         >
            <Details>
               <Description>
                  <Brand>{params.brand}</Brand>
                  <Name>{params.name}</Name>
               </Description>

               <Rent>
                  <Period>{params.period}</Period>
                  <Price>R$ {params.price}</Price>
               </Rent>
            </Details>

            <AccessoriesContainer>
               {params.accessories.map((accesorry => (
                  <Acessory 
                     key={accesorry.name}
                     icon={getCorrectAccessoryIcon(accesorry.type)}
                     name={accesorry.name}
                  />
               )))}
            </AccessoriesContainer>

            <About>{params.about}{params.about}{params.about}{params.about}</About>
         </Animated.ScrollView>

         <Footer>
            <Button title='Escolher período do aluguel' onPress={() => navigate('Schedule' as never, params as never)}/>
         </Footer>
      </Container>
   );
}