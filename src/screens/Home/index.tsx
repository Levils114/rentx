import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, StatusBar, } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarProps } from '../../@types/Car';
import CarCard from '../../components/CarCard';
import { LoadAnimated } from '../../components/LoadAnimated';
import { database } from '../../database';
import { api } from '../../services/api';

import Logo from './../../assets/logo.svg';

import { Container, Header, TotalCars, HeaderContent } from './styles';

const HeaderAnimated = Animated.createAnimatedComponent(Header);

export default function Home(){
   const netInfo = useNetInfo();
   const { navigate } = useNavigation();

   const [cars, setCars] = useState<CarProps[]>([]);
   const [loading, setLoading] = useState(true);

   const scrollY = useSharedValue(0);

   const headerStyleAnimated = useAnimatedStyle(() => ({
      height: interpolate(scrollY.value, 
         [0, 150],
         [113, 0],
         Extrapolate.CLAMP,   
      ),
      opacity: interpolate(scrollY.value, 
         [0, 150],
         [1, 0],
         Extrapolate.CLAMP,   
      ),
   }));

   const onScrollAnimated = useAnimatedScrollHandler((event) => {
      scrollY.value = event.contentOffset.y;
   });

   useEffect(() => {
      let isMounted = true;

      async function loadCars(){
         try{
            const response = await api.get('/cars');
            const { data } = response;

            if(isMounted) setCars(data);
         } catch(err){
            console.error(err);
         } finally{
            if(isMounted) setLoading(false);
         }
      }

      loadCars();

      return () => {
         isMounted = false;
      };
   }, []);

   useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
         return true;
      })
   }, []);

   return(
      <Container>
         <StatusBar 
            barStyle='light-content' 
            backgroundColor={"transparent"}
            translucent
         />
         <HeaderAnimated style={headerStyleAnimated}>
            <HeaderContent>
               <Logo width={RFValue(108)} height={RFValue(12)}/>

               {!loading && (
                  <TotalCars>Total de {cars.length} carros</TotalCars>
               )}
            </HeaderContent>
         </HeaderAnimated>

         {loading ? (
            <LoadAnimated />
         ) : (
            <FlatList 
               data={cars}
               keyExtractor={(item) => item.id}
               showsVerticalScrollIndicator={false}
               onScroll={onScrollAnimated}
               contentContainerStyle={{
                  padding: 24,
               }}
               scrollEventThrottle={16}
               renderScrollComponent={(props) => (
                  <Animated.ScrollView
                    {...props}
                    scrollEventThrottle={16}
                    onScroll={onScrollAnimated}
                  />
                )}
               renderItem={({ item }) => (
                  <CarCard carData={item} onPress={() => navigate('CarDetails' as never, item as never)}/>
               )}
            />
         )}
      </Container>
   );
}