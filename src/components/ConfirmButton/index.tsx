import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
   Container,
   Text,
} from './styles';

interface ConfirmButtonProps extends RectButtonProps{
   buttonText: string;
}

export function ConfirmButton({ buttonText, ...rest }: ConfirmButtonProps){
   return(
      <Container {...rest}>
         <Text>{buttonText}</Text>
      </Container>
   );
}