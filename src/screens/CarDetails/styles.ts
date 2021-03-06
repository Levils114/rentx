import styled from 'styled-components/native'

import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
   flex: 1;

   background-color: ${props => props.theme.colors.background_secondary};
`;

export const Header = styled.View`
   width: 100%;

   padding: ${32 + getStatusBarHeight()}px 24px 0;

   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const Details = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;
   justify-content: space-between;

   margin-top: 38px;
`;

export const Description = styled.View`

`;

export const Brand = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(10)}px;

   color: ${props => props.theme.colors.text_detail};

   text-transform: uppercase;
`;

export const Name = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(25)}px;

   color: ${props => props.theme.colors.title};
`;

export const Rent = styled.View`
`;

export const Period = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(10)}px;

   color: ${props => props.theme.colors.text_detail};
`;

export const Price = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(25)}px;

   color: ${props => props.theme.colors.main};
`;

export const About = styled.Text`
   font-family: ${props => props.theme.fonts.primary_400};
   font-size: ${RFValue(15)}px;

   color: ${props => props.theme.colors.text};

   text-align: justify;
   line-height: ${RFValue(25)}px;

   margin-top: 23px;
`;

export const AccessoriesContainer = styled.View`
   width: 100%;

   flex-direction: row;
   flex-wrap: wrap;

   align-items: center;
   justify-content: space-between;

   margin-top: 16px;
`;

export const Footer = styled.View`
   background-color: ${props => props.theme.colors.background_primary};

   padding: 24px 24px 24px;
`;

export const OfflineInfoText = styled.Text`
   font-family: ${props => props.theme.fonts.primary_400};
   font-size: ${RFValue(10)}px;

   color: ${props => props.theme.colors.main};

   text-align: center;

   margin-top: 8px;
`;