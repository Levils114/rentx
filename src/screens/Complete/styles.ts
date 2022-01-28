import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
   flex: 1;

   background-color: ${props => props.theme.colors.header};

   padding-top: 96px;
`;

export const Content = styled.View`
   flex: 1;

   align-items: center;
   justify-content: flex-end;

   padding-bottom: ${RFValue(50)}px;
`;

export const Title = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_600};
   font-size: ${RFValue(30)}px;

   color: ${props => props.theme.colors.shape};

   margin-top: 40px;
`;

export const Message = styled.Text`
   width: ${RFPercentage(10)}%;

   font-family: ${props => props.theme.fonts.primary_400};
   font-size: ${RFValue(15)}px;

   line-height: ${RFValue(25)}px;

   color: ${props => props.theme.colors.text_detail};

   text-align: center;

   margin-top: 16px;
`;

export const Footer = styled.View`
   width: 100%;

   align-items: center;

   margin-top: 40px;
`;