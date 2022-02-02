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

export const Content = styled.ScrollView.attrs({
   contentContainerStyle: {
      padding: 24,
      alignItems: 'center'
   },
   showsVerticalScrollIndicator: false,
})`

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

export const AccessoriesContainer = styled.View`
   width: 100%;

   flex-direction: row;
   flex-wrap: wrap;

   align-items: center;
   justify-content: space-between;

   margin-top: 16px;
`;

export const RentalPeriod = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;
   justify-content: space-between;

   margin-top: 40px;

   border-bottom-width: 1px;
   border-bottom-color: ${props => props.theme.colors.line};

   padding-bottom: 16px;
`;

export const CalendarIcon = styled.View`
   padding: 12px;

   background-color: ${props => props.theme.colors.main};
`;

export const DateInfo = styled.View`

`;

export const DateTitle = styled.Text`
   text-transform: uppercase;

   font-family: ${props => props.theme.fonts.primary_500};
   font-size: ${RFValue(10)}px;

   color: ${props => props.theme.colors.text_detail};
`;

export const DateValue = styled.Text`
   font-family: ${props => props.theme.fonts.primary_500};
   font-size: ${RFValue(15)}px;

   color: ${props => props.theme.colors.title};
`;

export const RentalPrice = styled.View`
   width: 100%;

   margin-top: 16px;
`;

export const RentalPriceLabel = styled.Text`
   font-family: ${props => props.theme.fonts.primary_500};
   font-size: ${RFValue(10)}px;

   color: ${props => props.theme.colors.text_detail};

   text-transform: uppercase;
`;

export const RentalPriceDetails = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;
   justify-content: space-between;
`;

export const RentalPriceQuota = styled.Text`
   margin-top: 8px;

   font-family: ${props => props.theme.fonts.primary_500};
   font-size: ${RFValue(15)}px;

   color: ${props => props.theme.colors.title};
`;

export const RentalPriceTotal = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_600};
   font-size: ${RFValue(24)}px;

   color: ${props => props.theme.colors.success};
`;

export const Footer = styled.View`
   background-color: ${props => props.theme.colors.background_primary};

   padding: 24px 24px ${getBottomSpace() + 24}px;
`;

export const OfflineInfoText = styled.Text`
   font-family: ${props => props.theme.fonts.primary_400};
   font-size: ${RFValue(10)}px;

   color: ${props => props.theme.colors.main};

   text-align: center;

   margin-top: 8px;
`;