import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { CarProps } from "../../@types/Car";

export const Container = styled.View`
   flex: 1;

   background-color: ${props => props.theme.colors.background_primary};
`;

export const Header = styled.View`
   width: 100%;
   height: 113px;

   background-color: ${props => props.theme.colors.header};

   justify-content: flex-end;

   padding:  32px 24px;
`;

export const HeaderContent = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`;

export const TotalCars = styled.Text`
   font-size: ${RFValue(15)}px;
   font-family: ${props => props.theme.fonts.primary_400};

   color: ${props => props.theme.colors.text};
`;