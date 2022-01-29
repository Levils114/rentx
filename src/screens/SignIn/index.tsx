import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {
   Container,
   Header,
   Subtitle,
   Title,
   ButtonsContainer,
   Form,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface OnSubmitProps{
   email: string;
   password: string;
}

const schema = yup.object().shape({
   email: yup.string().email("Email inválido").required("Email obrigatório"),
   password: yup.string().required("Senha obrigatória"),
});

export function SignIn(){
   const theme = useTheme();
   const { navigate } = useNavigation();
   const { handleSignIn } = useAuth();
   const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
   });

   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if(Object.keys(errors).length >= 1){
         Alert.alert("Opa", errors[Object.keys(errors)[0]].message);
      }
   }, [errors]);

   async function onSubmit(data: OnSubmitProps){
      try{
         await handleSignIn(data);
      } catch(err){
         console.error(err);
         setIsLoading(false);
      }
   }

   return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
         <KeyboardAvoidingView behavior='position' enabled>
            <Container>
               <StatusBar 
                  barStyle='dark-content' 
                  backgroundColor='transparent' 
                  translucent
               />

               <Header>
                  <Title>{"Estamos \nquase lá"}</Title>
                  <Subtitle>{"Faça seu login para começar \numa experiência incrível."}</Subtitle>
               </Header>

               <Form>
                  <Controller 
                     control={control}
                     name="email"
                     render={({ field: { value, onChange, onBlur } }) => (
                        <Input 
                           value={value}
                           iconName='mail'
                           placeholder='E-mail'
                           keyboardType='email-address'
                           isFilled={!!value}
                           onChangeText={onChange}
                           onBlur={onBlur}
                           viewStyle={{ marginBottom: 8, }}
                        />
                     )}
                  />
                  <Controller 
                     control={control}
                     name='password'
                     render={({ field: { value, onChange, onBlur } }) => (
                        <Input 
                           value={value}
                           iconName='lock'
                           placeholder='Senha'
                           isPassword
                           isFilled={!!value}
                           onChangeText={onChange}
                           onBlur={onBlur}
                        />
                     )}
                  />
               </Form>

               <ButtonsContainer>
                  <Button 
                     title="Login"
                     onPress={handleSubmit(onSubmit)}
                     enabled={!isLoading}
                  />

                  <Button 
                     title="Criar conta gratuita"
                     onPress={() => navigate("SignUpFirstStep" as never)}
                     color={theme.colors.background_secondary}
                     labelColor={theme.colors.header}
                     style={{ marginTop: 8 }}
                  />
               </ButtonsContainer>
            </Container>
         </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
   );
}