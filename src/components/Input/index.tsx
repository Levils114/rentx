import React, { useState } from 'react';

import Feather from "@expo/vector-icons/Feather";

import {
   Container, IconButton, IconContainer, InputContainer, TextInput,
} from './styles';
import { useTheme } from 'styled-components';
import { TextInputProps, ViewStyle } from 'react-native';

interface InputProps extends TextInputProps{
   iconName: React.ComponentProps<typeof Feather>["name"];
   isFilled?: boolean;
   isPassword?: boolean;
   viewStyle?: ViewStyle;
}

export function Input({ iconName, isPassword, viewStyle, isFilled, ...rest }: InputProps){
   const theme = useTheme();
   const [isToShowPassword, setIsToShowPassword] = useState(isPassword);
   const [isFocus, setIsFocus] = useState(false);

   return(
      <Container style={viewStyle}>
         <IconContainer isFocus={isFocus}>
            <Feather 
               name={iconName}
               size={24}
               color={isFocus || isFilled ? theme.colors.main : theme.colors.text_detail}
            />
         </IconContainer>

         <InputContainer isFocus={isFocus}>
            <TextInput 
               autoCapitalize='none'
               autoCorrect={false}
               secureTextEntry={isToShowPassword}
               onFocus={() => setIsFocus(true)}
               {...rest}
               onBlur={() => {
                  rest.onBlur;
                  setIsFocus(false);
               }}
            />

            {isPassword && (
               <IconButton onPress={() => setIsToShowPassword(prevValue => !prevValue)}>
                  <Feather
                     name={isToShowPassword ? 'eye' : 'eye-off'}
                     color={theme.colors.text_detail}
                     size={24}
                  />
               </IconButton>
            )}
         </InputContainer>
      </Container>
   );
}