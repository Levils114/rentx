import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
   flex: 1;

   background-color: ${props => props.theme.colors.background_primary};

   align-items: center;
`;

export const Header = styled.View`
   width: 100%;

   padding: ${getStatusBarHeight() + 24}px 25px 32px;

   background-color: ${props => props.theme.colors.header};
`;

export const Title = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_600};
   font-size: ${RFValue(30)}px;

   color: ${props => props.theme.colors.shape};

   margin-top: 24px;
`;

export const Subtitle = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_400};
   font-size: ${RFValue(15)}px;

   color: ${props => props.theme.colors.text};

   margin-top: 24px;
`;

export const Content = styled.View`
   width: 100%;

   flex: 1;

   padding: 0 ${RFValue(16)}px;
`;

export const Appointments = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;
   justify-content: space-between;
`;

export const AppointmentsTitle = styled.Text`
   font-family: ${props => props.theme.fonts.primary_400};
   font-size: ${RFValue(15)}px;

   color: ${props => props.theme.colors.text};

   padding: 24px 0;
`;

export const AppointmentsQuantity = styled.Text`
   font-family: ${props => props.theme.fonts.primary_500};
   font-size: ${RFValue(15)}px;

   color: ${props => props.theme.colors.title};
`;