import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, StatusBar, } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import CarCard from '../../components/CarCard';
import { LoadAnimated } from '../../components/LoadAnimated';
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from '../../database';
import { api } from '../../services/api';

import Logo from './../../assets/logo.svg';

import { Container, Header, TotalCars, HeaderContent } from './styles';
import { Car } from '../../database/models/Car';

const HeaderAnimated = Animated.createAnimatedComponent(Header);

export default function Home(){
   const netInfo = useNetInfo();
   const { navigate } = useNavigation();

   const [cars, setCars] = useState<Car[]>([]);
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

   async function offlineSyncronize(){
      try{
         await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
               const response = await api.get(`/cars/sync/pull`, {
                  params: {
                     lastPulledVersion: lastPulledAt || 0,
                  }
               });

               const { changes, latestVersion } = response.data;

               return { changes, timestamp: latestVersion };
            }, 
            pushChanges: async ({ changes }) => {
               console.log(changes.users);
               const user = changes.users;
               await api.post("/users/sync", user);
            }
         });
      } catch(err){
         console.error(err.response.data.message);
      }
   }

   useEffect(() => {
      async function syncLocalDbWithCloudDb(){
         try{
            if(netInfo.isConnected){
               await offlineSyncronize();
            }
         } catch(err){
            console.error(err);
         }
      }

      syncLocalDbWithCloudDb();
   }, [netInfo.isConnected]);

   useEffect(() => {
      let isMounted = true;

      async function loadCars(){
         try{
            const carsCollection = database.get<Car>("cars");
            const data = await carsCollection.query().fetch();

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