import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native'

interface Props{
   isFocus: boolean;
}

export const Container = styled.View`
   width: 100%;
   height: 55px;

   flex-direction: row;

   align-items: center;
`;

export const IconContainer = styled.View<Props>`
   width: ${RFValue(55)}px;
   height: 100%;

   background-color: ${props => props.theme.colors.background_secondary};

   align-items: center;
   justify-content: center;

   margin-right: 4px;

   ${props => props.isFocus && css`
      border-bottom-width: 2px;
      border-bottom-color: ${props => props.theme.colors.main};
   `}
`;

export const InputContainer = styled.View<Props>`
   height: 100%;

   flex: 1;

   flex-direction: row;
   align-items: center;
   justify-content: center;

   background-color: ${props => props.theme.colors.background_secondary};

   ${props => props.isFocus && css`
      border-bottom-width: 2px;
      border-bottom-color: ${props => props.theme.colors.main};
   `}
`;

export const TextInput = styled.TextInput`
   flex: 1;
   height: 100%;

   padding: 0 24px;

   color: ${props => props.theme.colors.text};

   font-family: ${props => props.theme.fonts.primary_400};
   font-size: ${RFValue(15)}px;
`;

export const IconButton = styled(BorderlessButton)`
   padding: 0 24px;
`;