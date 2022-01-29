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
   UserDataForm,
   InputsContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { Input } from '../../components/Input';
import Button from '../../components/Button';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from "expo-image-picker";

interface LauchImagePickerProps{
   cancelled: boolean;
   uri: string;
}

export function Profile(){
   const theme = useTheme();
   const { goBack } = useNavigation();
   const { data: { user } } = useAuth();

   const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
   const [avatar, setAvatar] = useState(user.avatar);

   async function handleSelectImage(){
      try{
         const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
         }) as LauchImagePickerProps;

         if(response.cancelled){
            return;
         } else{
            setAvatar(response.uri);
         }
      } catch(err){
         console.error(err);
      }
   }

   return(
      <KeyboardAvoidingView behavior='position' enabled>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                        uri: avatar ? 
                        avatar : 
                        "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" 
                     }}
                     resizeMode="cover"
                     />

                  <ChangeAvatarButton onPress={handleSelectImage}>
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

               <UserDataForm>
                  <InputsContainer>
                     {option === "dataEdit" ? (
                        <>
                        <Input 
                           iconName="user"
                           placeholder='Nome'
                           defaultValue={user.name}
                           isFilled={!!user.name}
                        />

                        <Input 
                           iconName="mail"
                           defaultValue={user.email}
                           isFilled={!!user.name}
                           editable={false}
                           viewStyle={{ marginVertical: 8, }}
                        />

                        <Input 
                           iconName="credit-card"
                           isFilled={!!user.name}
                           placeholder='CNH'
                           defaultValue={user.driver_license}
                           keyboardType='numeric'
                        />
                        </>
                     ) : (
                        <>
                        <Input 
                           iconName="lock"
                           placeholder='Senha atual'
                           isPassword
                        />

                        <Input 
                           iconName="lock"
                           placeholder='Nova senha'
                           isPassword
                           viewStyle={{ marginTop: 8, }}
                        />

                        <Input 
                           iconName="lock"
                           placeholder='Repetir senha'
                           isPassword
                           viewStyle={{ marginTop: 8, }}
                        />
                        </>
                     )}
                  </InputsContainer>

                  <Button 
                     title='Salvar alterações'
                     style={{
                        marginTop: 16,
                     }}
                  />
               </UserDataForm>
            </Content>
         </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
}