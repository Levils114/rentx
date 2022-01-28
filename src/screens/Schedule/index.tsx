import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { DateData } from 'react-native-calendars/src/types';
import { useTheme } from 'styled-components';
import { CarProps } from '../../@types/Car';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Calendar, { MarkedDatesProps } from '../../components/Calendar';
import { generateTimeInterval } from '../../components/Calendar/generateInterval';
import { getPlatformDate } from '../../utils/getPlatformDate';

import LongArrowRightIcon from './../../assets/arrow.svg';

import {
   Container,
   Header,
   Title,
   RentalPeriod,
   DateInfo,
   DataTitle,
   DateValue,
   Content,
   Footer,
} from './styles';

export default function Schedule(){
   const { navigate, goBack } = useNavigation();
   const params  = useRoute().params! as CarProps;
   const theme = useTheme();

   const [lastDateSelected, setlastDateSelected] = useState({} as DateData);
   const [markedDates, setMarkedDates] = useState({} as MarkedDatesProps);

   const firstDateFormated = useMemo(() => {
      return Object.keys(markedDates).length >= 1 ? format(getPlatformDate(new Date(Object.keys(markedDates)[0])), 'dd/MM/yyyy') : undefined;
   }, [markedDates]);

   const lastDateFormated = useMemo(() => {
      return Object.keys(markedDates).length >= 1 ? format(getPlatformDate(new Date(Object.keys(markedDates)[Object.keys(markedDates).length - 1])), 'dd/MM/yyyy') : undefined;
   }, [markedDates]);

   function handleChangeDate(date: DateData){
      let start = !lastDateSelected.timestamp ? date : lastDateSelected;
      let end = date;

      if(start.timestamp > end.timestamp){
         start = end;
         end = start;
      }

      setlastDateSelected(end);
      const interval = generateTimeInterval(start, end);
      setMarkedDates(interval);
   }

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

            <RentalPeriod>
               <DateInfo hasDates={!!firstDateFormated}>
                  <DataTitle>DE</DataTitle>
                  <DateValue hasDates={Object.keys(markedDates).length >= 1}>{firstDateFormated}</DateValue>
               </DateInfo>

               <LongArrowRightIcon />

               <DateInfo hasDates={!!lastDateFormated}>
                  <DataTitle>ATÉ</DataTitle>
                  <DateValue hasDates={Object.keys(markedDates).length >= 1}>{lastDateFormated}</DateValue>
               </DateInfo>
            </RentalPeriod>
         </Header>

         <Content>
            <Calendar 
               onDayPress={handleChangeDate}
               markedDates={markedDates}
            />
         </Content>

         <Footer>
            <Button
               enabled={!!firstDateFormated}
               title='Confirmar'
               onPress={() => navigate('SchedulingDetails' as never, { 
                  car: params,
                  days: Object.keys(markedDates),
                  firstDateFormated,
                  lastDateFormated,
               } as never)}
            />
         </Footer>
      </Container>
   );
}