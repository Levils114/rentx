import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface Props{
   active: boolean;
}

export const Container = styled.View`
   background-color: ${props => props.theme.colors.background_primary};
`;

export const Header = styled.View`
   width: 100%;
   height: 227px;

   background-color: ${props => props.theme.colors.header};

   padding: 0 19px;

   align-items: center;
`;

export const HeaderTop = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;
   justify-content: space-between;

   padding-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
   font-family: ${props => props.theme.fonts.secondary_600};
   font-size: ${RFValue(25)}px;

   color: ${props => props.theme.colors.background_secondary};
`;

export const LogoutButton = styled(BorderlessButton)`

`;

export const PhotoContainer = styled.View`
   width: 180px;
   height: 180px;

   border-radius: 90px;

   margin: 48px auto 0;

   position: relative;
`;

export const UserAvatar = styled.Image`
   width: 100%;
   height: 100%;

   border-radius: 90px;
`;

export const ChangeAvatarButton = styled(RectButton)`
   position: absolute;

   padding: 16px;

   border-radius: 29px;

   align-items: center;
   justify-content: center;

   right: 0px;
   bottom: 0px;

   background-color: ${props => props.theme.colors.main};
`;

export const Content = styled.View`

   padding: 0 24px;

   margin-top: 122px;
`;

export const ContentHeader = styled.View`
   width: 100%;

   flex-direction: row;

   align-items: center;
   justify-content: space-around;

   border-bottom-width: 1px;
   border-bottom-color: ${props => props.theme.colors.line};

   margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<Props>`
   padding-bottom: 14px;

   ${props => props.active && css`
      border-bottom-width: 2px;
      border-bottom-color: ${props => props.theme.colors.main};
   `}
`;

export const OptionTitle = styled.Text<Props>`
   font-family: ${props => 
      props.active ? 
      props.theme.fonts.secondary_600 : 
      props.theme.fonts.secondary_500
   };
   font-size: ${RFValue(20)}px;

   color: ${props => 
      props.active ?
      props.theme.colors.header :
      props.theme.colors.text_detail
   };
`;

export const UserDataForm = styled.View`

`;

export const InputsContainer = styled.View`

`;