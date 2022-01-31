import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface LauchImagePickerProps{
   cancelled: boolean;
   uri: string;
}

interface HandleUpdateUserDataProps{
   name: string;
   driver_license: string;
}

const changeUserDataSchema = yup.object().shape({
   name: yup.string().required("Nome obrigatório"),
   driver_license: yup.string().required("CNH obrigatório"),
});

export function Profile(){
   const theme = useTheme();
   const { goBack, navigate } = useNavigation();
   const { data: { user }, handleUpdateUser, handleSignOut } = useAuth();
   const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(changeUserDataSchema),
   });

   const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
   const [avatar, setAvatar] = useState(user.avatar);

   useEffect(() => {
      const errorsKeys = Object.keys(errors);

      if(errorsKeys.length >= 1){
         Alert.alert("Opa", errors[errorsKeys[0]].message);
      }
   }, [errors]);

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

   async function signOut(){
      try{
         Alert.alert(
            "Tem certeza?",
            "Caso você saia, precisará de internet para voltar ao app",
            [
               { text: "Não", onPress: () => {}, style: "cancel" },
               { text: "Sair", onPress: async() => await handleSignOut() },
            ]
         );
      } catch(err){
         console.error(err);
      }
   }

   async function handleUpdateUserData(data: HandleUpdateUserDataProps){
      try{
         await handleUpdateUser({
            ...user,
            ...data,
            avatar
         });

         navigate("Complete" as never, { title: "Feito!", message: "Seu perfil foi atualizado", nextScreenRoute: "Profile" } as never);
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

                  <LogoutButton onPress={signOut}>
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
                        <Controller 
                           name="name"
                           control={control}
                           defaultValue={user.name}
                           render={({ field: { value, onBlur, onChange } }) => (
                              <Input 
                                 value={value}
                                 iconName="user"
                                 placeholder='Nome'
                                 defaultValue={user.name}
                                 isFilled={!!value}
                                 onChangeText={onChange}
                                 onBlur={onBlur}
                              />
                           )}
                        />

                        <Input 
                           iconName="mail"
                           defaultValue={user.email}
                           isFilled={!!user.name}
                           editable={false}
                           viewStyle={{ marginVertical: 8, }}
                        />

                        <Controller 
                           name="driver_license"
                           control={control}
                           defaultValue={user.driver_license}
                           render={({ field: { value, onBlur, onChange } }) => (
                              <Input 
                                 value={value}
                                 iconName="credit-card"
                                 isFilled={!!value}
                                 placeholder='CNH'
                                 defaultValue={user.driver_license}
                                 keyboardType='numeric'
                                 onChangeText={onChange}
                                 onBlur={onBlur}
                              />
                           )}
                        />

                        <Button 
                           title='Salvar alterações'
                           onPress={handleSubmit(handleUpdateUserData)}
                           style={{
                              marginTop: 16,
                           }}
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

                        <Button 
                           title='Salvar alterações'
                           style={{
                              marginTop: 16,
                           }}
                        />
                        </>
                     )}
                  </InputsContainer>
               </UserDataForm>
            </Content>
         </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
}