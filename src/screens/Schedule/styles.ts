import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { css } from 'styled-components';
import styled from 'styled-components/native';

interface Props{
   hasDates: boolean;
}

export const Container = styled.View`
   flex: 1;

   background-color: ${props => props.theme.colors.background_secondary};
`;

export const Header = styled.View`
   width: 100%;

   padding: ${getStatusBarHeight() + 24}px 25px 32px;

   background-color: ${props => props.theme.colors.header};
`;

export const Title = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_600};
   font-size: ${RFValue(34)}px;

   color: ${props => props.theme.colors.shape};

   margin: 24px 0 32px;
`;

export const RentalPeriod = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;
   justify-content: space-between;
`;

export const DateInfo = styled.View<Props>`
   width: 30%;

   ${props => !props.hasDates && css`
      border-bottom-width: 1px;
      border-color: ${props.theme.colors.text};
   `}
`;

export const DataTitle = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_500};
   font-size: ${RFValue(10)}px;

   color: ${props => props.theme.colors.text};
`;

export const DateValue = styled.Text<Props>`
   font-family: ${props => props.theme.fonts.primary_500};
   font-size: ${RFValue(15)}px;

   color: ${props => props.theme.colors.shape};

   ${props => !props.hasDates && css`
      padding-bottom: 5px;
   `}
`;

export const Content = styled.ScrollView.attrs({
   contentContainerStyle: {
      padding: 24,
   },
   showsVerticalScrollIndicator: false,
})`
`;

export const Footer = styled.View`
   padding: 24px 24px ${getBottomSpace() + 24}px;
`;