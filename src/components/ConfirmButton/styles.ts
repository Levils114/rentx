import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled(RectButton)`
   width: 64px;
   height: 56px;

   background-color: ${props => props.theme.colors.shape_dark};

   align-items: center;
   justify-content: center;
`;

export const Text = styled.Text`
   font-family: ${props => props.theme.fonts.primary_500};
   font-size: ${RFValue(15)}px;

   color: ${props => props.theme.colors.shape};
`;