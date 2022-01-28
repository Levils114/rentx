import styled from 'styled-components/native';

interface ImageIndexProps{
   active: boolean;
}

export const Container = styled.View<ImageIndexProps>`
   width: 6px;
   height: 6px;

   border-radius: 3px;

   background-color: ${props => props.active ? props.theme.colors.title : props.theme.colors.shape};

   margin-left: 8px;
`;