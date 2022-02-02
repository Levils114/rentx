import React, { useEffect, useMemo, useState } from 'react';
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
   OfflineInfoText,
} from './styles'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCorrectAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';
import { Car } from '../../database/models/Car';
import { useNetInfo } from '@react-native-community/netinfo';
import { CarProps } from '../../@types/Car';

interface Params{
   car: Car;
   days: string[];
   firstDateFormated: string;
   lastDateFormated: string;
}

export function SchedulingDetails(){
   const { navigate, goBack } = useNavigation();
   const params = useRoute().params! as Params;
   const theme = useTheme();
   const { isConnected } = useNetInfo();

   const [loadingRequest, setLoadingRequest] = useState(false);
   const [carUpdated, setCarUpdated] = useState({} as CarProps);

   const rentTotal = useMemo(() => {
      return params.car.price * params.days.length;
   }, []);

   async function handleSchedule(){
      try{
         setLoadingRequest(true);

         await api.post("/rentals", {
            car_id: params.car.id,
            start_date: new Date(params.firstDateFormated + " 21:00:00"),
            end_date: new Date(params.lastDateFormated + " 21:00:00"),
            total: rentTotal,
         });

         setLoadingRequest(false);

         navigate('SchedulingComplete' as never, { 
            title: "Carro alugado!",
            message: "Agora você só precisa ir\naté a concessonária da RENTX\npegar o seu automóvel",
            nextScreenRoute: "Home",
         } as never);
      } catch(err){
         setLoadingRequest(false);
         console.error(err.response.data);
      }
   }

   useEffect(() => {
      async function loadCarUpdated(){
         try{
            const response = await api.get(`/cars/${params.car.id}`);

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

         <Header>
            <BackButton onPress={goBack}/>
         </Header>

         <ImageSlider 
            imagesUrl={!!carUpdated.photos ?
               carUpdated.photos
            : [
               {
                  car_id: params.car.thumbnail,
                  id: params.car.thumbnail,
                  photo: params.car.thumbnail,
               }
            ]}
         />

         <Content>
            <Details>
               <Description>
                  <Brand>{params.car.brand}</Brand>
                  <Name>{params.car.name}</Name>
               </Description>

               <Rent>
                  <Period>{params.car.period}</Period>
                  <Price>R$ {isConnected ? params.car.price : "..."}</Price>
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

            <RentalPeriod>
               <CalendarIcon>
                  <Feather name="calendar" color={theme.colors.shape} size={RFValue(24)}/>
               </CalendarIcon>

               <DateInfo>
                  <DateTitle>DE</DateTitle>
                  <DateValue>{params.firstDateFormated}</DateValue>
               </DateInfo>

               <Feather name="chevron-right" color={theme.colors.text} size={RFValue(16)}/>

               <DateInfo>
                  <DateTitle>ATÉ</DateTitle>
                  <DateValue>{params.lastDateFormated}</DateValue>
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
            <Button isLoading={loadingRequest} enabled={isConnected && !loadingRequest} title='Alugar agora' color={theme.colors.success} onPress={handleSchedule}/>
            
            {!isConnected && (
               <OfflineInfoText>
                  Conecte-se a internet para ver mais detalhes e agendar seu carro.
               </OfflineInfoText>
            )}
         </Footer>
      </Container>
   );
}