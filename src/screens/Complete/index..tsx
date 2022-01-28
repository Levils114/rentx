import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';

import LogoGraySvg from './../../assets/logo_background_gray.svg';
import DoneSvg from './../../assets/done.svg';

import {
   Container,
   Content,
   Title,
   Message,
   Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation, useRoute } from '@react-navigation/native';

interface ParamsProps{
   title: string;
   message: string;
   nextScreenRoute: string;
}

export function Complete(){
   const { navigate } = useNavigation();
   const { title, message, nextScreenRoute } = useRoute().params as ParamsProps;
   const SCREEN_WIDTH = useWindowDimensions().width;

   return(
      <Container>
         <StatusBar translucent backgroundColor="transparent"/>

         <LogoGraySvg width={SCREEN_WIDTH}/>

         <Content>
            <DoneSvg width={80} height={80}/>

            <Title>{title}</Title>

            <Message>{message}</Message>

            <Footer>
               <ConfirmButton 
                  buttonText='OK'
                  onPress={() => navigate(nextScreenRoute as never)} 
               />
            </Footer>
         </Content>
      </Container>
   );
}