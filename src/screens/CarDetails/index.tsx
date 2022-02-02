import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { CarProps } from '../../@types/Car';

import Acessory from '../../components/Acessory';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import ImageSlider from '../../components/ImageSlider';
import { Car } from '../../database/models/Car';
import { api } from '../../services/api';
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
   OfflineInfoText,
   Footer,
} from './styles'

export default function CarDetails(){
   const { isConnected } = useNetInfo();
   const { navigate, goBack } = useNavigation();
   const params = useRoute().params! as Car;

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

   const [carUpdated, setCarUpdated] = useState({} as CarProps);

   useEffect(() => {
      async function loadCarUpdated(){
         try{
            const response = await api.get(`/cars/${params.id}`);

            setCarUpdated(response.data)
         } catch(err){
            console.error(err);
         }
      }

      if(isConnected) loadCarUpdated();
   }, [isConnected]);

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
                  imagesUrl={!!carUpdated.photos ?
                     carUpdated.photos
                  : [
                     {
                        car_id: params.thumbnail,
                        id: params.thumbnail,
                        photo: params.thumbnail,
                     }
                  ]}
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
                  <Price>R$ {isConnected ? params.price : "..."}</Price>
               </Rent>
            </Details>

            {!!carUpdated.accessories && (<AccessoriesContainer>
               {carUpdated.accessories.map((accesorry => (
                  <Acessory 
                     key={accesorry.name}
                     icon={getCorrectAccessoryIcon(accesorry.type)}
                     name={accesorry.name}
                  />
               )))}
            </AccessoriesContainer>)}

            <About>{params.about}{params.about}{params.about}{params.about}</About>
         </Animated.ScrollView>

         <Footer>
            <Button 
               title='Escolher período do aluguel' 
               enabled={isConnected}
               onPress={() => navigate('Schedule' as never, params as never)}
            />

            {!isConnected && (
               <OfflineInfoText>
                  Conecte-se a internet para ver mais detalhes e agendar seu carro.
               </OfflineInfoText>
            )}
         </Footer>
      </Container>
   );
}