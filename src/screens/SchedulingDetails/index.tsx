import React, { useMemo, useState } from 'react';
import { StatusBar } from 'react-native';

import { Feather } from '@expo/vector-icons';

import Acessory from '../../components/Acessory';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import ImageSlider from '../../components/ImageSlider';

import {
   Container,
   Header,
   Content,
   Details,
   Description,
   Brand,
   Name,
   Rent,
   Period,
   Price,
   AccessoriesContainer,
   RentalPeriod,
   CalendarIcon,
   DateInfo,
   DateTitle,
   DateValue,
   RentalPrice,
   RentalPriceDetails,
   RentalPriceLabel,
   RentalPriceQuota,
   RentalPriceTotal,
   Footer,
} from './styles'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarProps } from '../../@types/Car';
import { getCorrectAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';

interface Params{
   car: CarProps;
   days: string[];
   firstDateFormated: string;
   lastDateFormated: string;
}

export function SchedulingDetails(){
   const { navigate, goBack } = useNavigation();
   const params = useRoute().params! as Params;
   const theme = useTheme();

   const [loadingRequest, setLoadingRequest] = useState(false);

   const rentTotal = useMemo(() => {
      return params.car.price * params.days.length;
   }, []);

   async function handleSchedule(){
      try{
         setLoadingRequest(true);

         const schedulesByCar = await api.get(`/schedules_bycars/${params.car.id}`);
         let daysFormatted = {};

         params.days.forEach((day, index) => {
            daysFormatted = {
               ...daysFormatted,
               [Object.keys(schedulesByCar.data.unavailable_dates).length + index]: day,
            }
         });

         await api.post("/schedules_byuser", {
            user_id: 1,
            car: params.car,
            startDate: params.firstDateFormated,
            endDate: params.lastDateFormated,
         });

         await api.put(`/schedules_bycars/${params.car.id}`, {
            id: params.car.id,
            unavailable_dates: {...daysFormatted, ...schedulesByCar.data.unavailable_dates},
         });

         setLoadingRequest(false);

         navigate('SchedulingComplete' as never, { 
            title: "Carro alugado!",
            message: "Agora você só precisa ir\naté a concessonária da RENTX\npegar o seu automóvel",
            nextScreenRoute: "Home",
         } as never);
      } catch(err){
         setLoadingRequest(false);
         console.error(err);
      }
   }

   return(
      <Container>
         <StatusBar 
            barStyle='dark-content' 
            translucent
            backgroundColor="transparent"
         />

         <Header>
            <BackButton onPress={goBack}/>
         </Header>

         <ImageSlider 
            imagesUrl={params.car.photos}
         />

         <Content>
            <Details>
               <Description>
                  <Brand>{params.car.brand}</Brand>
                  <Name>{params.car.name}</Name>
               </Description>

               <Rent>
                  <Period>{params.car.period}</Period>
                  <Price>R$ {params.car.price}</Price>
               </Rent>
            </Details>

            <AccessoriesContainer>
               {params.car.accessories.map(accessory => (
                  <Acessory key={accessory.type} name={accessory.name} icon={getCorrectAccessoryIcon(accessory.type)}/>
               ))}
            </AccessoriesContainer>

            <RentalPeriod>
               <CalendarIcon>
                  <Feather name="calendar" color={theme.colors.shape} size={RFValue(24)}/>
               </CalendarIcon>

               <DateInfo>
                  <DateTitle>DE</DateTitle>
                  <DateValue>18/02/2022</DateValue>
               </DateInfo>

               <Feather name="chevron-right" color={theme.colors.text} size={RFValue(16)}/>

               <DateInfo>
                  <DateTitle>ATÉ</DateTitle>
                  <DateValue>27/02/2022</DateValue>
               </DateInfo>
            </RentalPeriod>

            <RentalPrice>
               <RentalPriceLabel>TOTAL</RentalPriceLabel>

               <RentalPriceDetails>
                  <RentalPriceQuota>R$ {params.car.price} x{params.days.length} diárias</RentalPriceQuota>
                  <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
               </RentalPriceDetails>
            </RentalPrice>
         </Content>

         <Footer>
            <Button isLoading={loadingRequest} enabled={!loadingRequest} title='Alugar agora' color={theme.colors.success} onPress={handleSchedule}/>
         </Footer>
      </Container>
   );
}