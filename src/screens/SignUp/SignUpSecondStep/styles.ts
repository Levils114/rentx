import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
   padding: ${getStatusBarHeight() + 31}px 24px 0;

   background-color: ${props => props.theme.colors.background_primary};
`;

export const Header = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;

   justify-content: space-between;
`;

export const StepsIndicators = styled.View`
   flex-direction: row;

   align-items: center;
`;

export const Title = styled.Text`
   font-size: ${RFValue(40)}px;
   font-family: ${props => props.theme.fonts.secondary_600};

   color: ${props => props.theme.colors.title};

   margin-top: 60px;
`;

export const Subtitle = styled.Text`
   font-size: ${RFValue(15)}px;
   font-family: ${props => props.theme.fonts.primary_400};

   line-height: ${RFValue(25)}px;

   color: ${props => props.theme.colors.text};

   margin: 16px 0 64px;
`;

export const Form = styled.View`
   width: 100%;
`;


export const FormTitle = styled.Text`
   font-size: ${RFValue(20)}px;
   font-family: ${props => props.theme.fonts.secondary_600};

   color: ${props => props.theme.colors.title};

   margin-bottom: 24px;
`;