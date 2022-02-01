import styled from 'styled-components/native'

import { RectButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { css } from 'styled-components';

interface Props{
   hasStartPeriodScheduled: boolean;
}

export const Container = styled(RectButton)<Props>`
   width: 100%;
   height: 126px;

   background-color: ${props => props.theme.colors.background_secondary};

   flex-direction: row;
   align-items: center;
   justify-content: space-between;

   padding: 24px;

   ${props => !props.hasStartPeriodScheduled && css`
      margin-bottom: 24px;
   `};
`;

export const Details = styled.View`
   width: ${RFPercentage(6)}%;
`;

export const Brand = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(10)}px;
   color: ${props => props.theme.colors.text_detail};
`;

export const Name = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(15)}px;
   color: ${props => props.theme.colors.title};

   text-transform: uppercase;
`;

export const About = styled.View`
   flex-direction: row;
   align-items: flex-end;

   margin-top: 16px;
`;

export const Rent = styled.View`
   margin-right: 24px;
`;

export const Period = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(10)}px;
   color: ${props => props.theme.colors.text_detail};

   text-transform: uppercase;
`;

export const Price = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(15)}px;
   color: ${props => props.theme.colors.main};
`;

export const CarImage = styled.Image`
   width: 180px;
   height: 92px;
`;

export const PeriodContainer = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;
   justify-content: space-between;

   background-color: ${props => props.theme.colors.background_secondary};

   padding: 12px 24px;

   margin: 2px 0 24px;
`;

export const PeriodLabel = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(10)}px;

   color: ${props => props.theme.colors.text_detail};
`;

export const PeriodContent = styled.View`
   flex-direction: row;

   align-items: center;
`;

export const PeriodScheduled = styled.Text`
   font-family: ${props => props.theme.fonts.primary_400};
   font-size: ${RFValue(13)}px;

   color: ${props => props.theme.colors.title};
`;