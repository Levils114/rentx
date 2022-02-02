import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import BackButton from '../../components/BackButton';
import CarCard from '../../components/CarCard';
import { LoadAnimated } from '../../components/LoadAnimated';
import { Car } from '../../database/models/Car';
import { api } from '../../services/api';

import {
   Container,
   Header,
   Title,
   Subtitle,
   Content,
   Appointments,
   AppointmentsTitle,
   AppointmentsQuantity,
} from './styles';

interface Cars{
   car: Car;
   start_date: string;
   end_date: string;
   id: number;
   user_id: number;
}

export function MyCars(){
   const { goBack } = useNavigation();
   const theme = useTheme();
   const isScreenFocus = useIsFocused();

   const [cars, setCars] = useState<Cars[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchCars(){
         try{
            const response = await api.get('/rentals');

            setCars(response.data);
         } catch(err){
            console.error(err);
         } finally{
            setLoading(false);
         }
      };

      fetchCars();
   }, [isScreenFocus]);

   return(
      <Container>
         <StatusBar translucent backgroundColor="transparent"/>

         <Header>
            <BackButton 
               onPress={goBack}
               iconColor={theme.colors.shape}
            />

            <Title>
               {"Escolha uma \ndata de início e \nfim do aluguel"}
            </Title>

            <Subtitle>Conforto, segurança e praticidade.</Subtitle>
         </Header>

         {loading ? (
            <LoadAnimated />
         ) : (
            <Content>
               <Appointments>
                  <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                  <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
               </Appointments>

               <FlatList 
                  data={cars}
                  keyExtractor={item => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                     <CarCard carData={item.car} startDate={item.start_date} endDate={item.end_date}/>
                  )}
               />
            </Content>
         )}
      </Container>
   );
}