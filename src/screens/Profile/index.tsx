import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import BackButton from '../../components/BackButton';
import Feather from "@expo/vector-icons/Feather";

import {
   Container,
   Header,
   HeaderTop,
   HeaderTitle,
   LogoutButton,
   PhotoContainer,
   UserAvatar,
   ChangeAvatarButton,
   Content,
   ContentHeader,
   Option,
   OptionTitle,
} from './styles';
import { useAuth } from '../../hooks/auth';

export function Profile(){
   const theme = useTheme();
   const { goBack } = useNavigation();
   const { data: { user } } = useAuth();

   const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

   return(
      <Container>
         <Header>
            <HeaderTop>
               <BackButton iconColor={theme.colors.shape} onPress={goBack}/>

               <HeaderTitle>Editar perfil</HeaderTitle>

               <LogoutButton onPress={() => {}}>
                  <Feather name="power" size={24} color={theme.colors.shape}/>
               </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
               <UserAvatar 
                  source={{ 
                     uri: user.avatar ? 
                     user.avatar : 
                     "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" 
                  }}
                  resizeMode="cover"
               />

               <ChangeAvatarButton>
                  <Feather name="camera" size={24} color={theme.colors.shape}/>
               </ChangeAvatarButton>
            </PhotoContainer>
         </Header>

         <Content>
            <ContentHeader>
               <Option
                  onPress={() => setOption("dataEdit")}
                  active={option === "dataEdit"}
               >
                  <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
               </Option>

               <Option
                  onPress={() => setOption("passwordEdit")}
                  active={option === "passwordEdit"}
               >
                  <OptionTitle active={option === "passwordEdit"}>Trocar senha</OptionTitle>
               </Option>
            </ContentHeader>
         </Content>
      </Container>
   );
}