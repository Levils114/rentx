import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarProps } from '../../@types/Car';
import { getCorrectAccessoryIcon } from '../../utils/getAccessoryIcon';

import { AntDesign } from '@expo/vector-icons';

import {
   Container,
   Details,
   Brand,
   Name,
   About,
   Rent,
   Period,
   Price,
   CarImage,
   PeriodContainer,
   PeriodLabel,
   PeriodContent,
   PeriodScheduled,
} from './styles'
import { useTheme } from 'styled-components';
import { Car } from '../../database/models/Car';


interface Props extends RectButtonProps{
   carData: Car;
   startDate?: string;
   endDate?: string;
}

export default function CarCard({ carData, startDate, endDate, ...rest }: Props){
   const theme = useTheme();
   const MotorIcon = getCorrectAccessoryIcon(carData.fuel_type);

   return(
      <>
      <Container hasStartPeriodScheduled={!!startDate} {...rest}>
         <Details>
            <Brand>{carData.brand}</Brand>
            <Name>{carData.name}</Name>

            <About>
               <Rent>
                  <Period>{carData.period}</Period>
                  <Price>R$ {carData.price}</Price>
               </Rent>

               <MotorIcon />
            </About>
         </Details>

         <CarImage source={{ uri: carData.thumbnail, }} resizeMode="contain"/>
      </Container>

      {startDate && (
         <PeriodContainer>
            <PeriodLabel>PERÍODO</PeriodLabel>

            <PeriodContent>
               <PeriodScheduled>{startDate}</PeriodScheduled>
               <AntDesign name="arrowright" color={theme.colors.title} size={20} style={{ marginHorizontal: 10 }}/>
               <PeriodScheduled>{endDate}</PeriodScheduled>
            </PeriodContent>
         </PeriodContainer>
      )}
      </>
   );
}