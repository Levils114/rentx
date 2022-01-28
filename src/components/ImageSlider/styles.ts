import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
   width: 100%;
`;

export const CarImageWrapper = styled.View`
   width: ${Dimensions.get('window').width}px;
   height: 132px;

   align-items: center;
   justify-content: center;

   margin-top: 16px;
`;

export const CarImage = styled.Image`
   width: ${Dimensions.get("window").width}px;
   height: 132px;
`;

export const ImageIndexes = styled.View`
   flex-direction: row;

   margin: -14px 24px 0 auto;
`;