import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props{
   color?: string;
}

interface TitleProps{
   labelColor?: string;
}

export const Container = styled(RectButton)<Props>`
   width: 100%;

   padding: 19px;

   align-items: center;
   justify-content: center;

   background-color: ${props => props.color ? props.color : props.theme.colors.main};
`;

export const Title = styled.Text<TitleProps>`
   font-family: ${props => props.theme.fonts.primary_500};
   font-size: ${RFValue(15)}px;

   color: ${props => props.labelColor ? props.labelColor : props.theme.colors.shape};
`;