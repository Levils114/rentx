import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
   Container,
   Title,
} from './styles'

interface ButtonProps extends RectButtonProps{
   title: string;
   color?: string;
   labelColor?: string;
   isLoading?: boolean;
   onPress?: () => void;
}

export default function Button({ 
   title,
   color,
   labelColor,
   enabled = true,
   isLoading = false,
   ...rest 
}: ButtonProps){
   const theme = useTheme();

   return(
      <Container color={color} {...rest} onPress={enabled ? rest.onPress : () => {}} style={[rest.style, { opacity: enabled ? 1 : .5 }]}>
         {isLoading ? (<ActivityIndicator size="small" color={theme.colors.shape}/>) : (<Title labelColor={labelColor}>{title}</Title>)}
      </Container>
   );
}