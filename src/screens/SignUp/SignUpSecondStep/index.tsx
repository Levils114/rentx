import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import { CurrentIndexIndicator } from '../../../components/CurrentIndexIndicator';
import { Input } from '../../../components/Input';
import * as yup from "yup";

import {
   Container,
   Header,
   StepsIndicators,
   Title,
   Subtitle,
   Form,
   FormTitle,
} from './styles';
import { api } from '../../../services/api';

interface ParamsProps{
   user: {
      name: string;
      email: string;
      cnh: string;
   }
}

interface HandleSubmitProps{
   password: string;
   confirmPassword: string;
}

const schema = yup.object().shape({
   password: yup.string().min(6, "Senha deve ter pelo menos 6 dígitos").required("Senha obrigatória"),
   confirmPassword: yup.string().equals([yup.ref('password')], "Os campos devem ser iguais").required("Repetir a senha obirgatório"),
});

export function SignUpSecondStep(){
   const { goBack } = useNavigation();
   const { navigate } = useNavigation();
   const theme = useTheme();
   const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
   });
   const { user } = useRoute().params as ParamsProps;

   useEffect(() => {
      const errorsKeys = Object.keys(errors);

      if(errorsKeys.length >= 1){
         Alert.alert("Opa", errors[errorsKeys[0]].message);
      }
   }, [errors]);

   async function onSubmit(data: HandleSubmitProps){
      try{
         await api.post("/users", {
            name: user.name,
            email: user.email,
            driver_license: user.cnh,
            password: data.password,
         });

         navigate("Confirmation" as never, { 
            title: "Conta criada!",
            message: "Agora é só fazer login \ne aproveitar",
            nextScreenRoute: "SignIn",
         } as never);
      } catch(err){
         if(!!err.response.data.message){
            return Alert.alert("Opa", err.response.data.message);
         }
         Alert.alert("Opa", "Algo de errado não está certo aqui");
         console.error(err);
      }
   }

   return(
      <KeyboardAvoidingView behavior='position' enabled>
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
               <Header>
                  <BackButton onPress={goBack}/>
                  <StepsIndicators>
                     <CurrentIndexIndicator />
                     <CurrentIndexIndicator active/>
                  </StepsIndicators>
               </Header>

               <Title>Crie sua{'\n'}conta</Title>
               <Subtitle>Faça seu cadastro de {"\n"}forma fácil</Subtitle>

               <Form>
                  <FormTitle>2. Senha</FormTitle>

                  <Controller 
                     control={control}
                     name="password"
                     render={({ field: { value, onChange, onBlur } }) => (
                        <Input 
                           value={value}
                           iconName='lock' 
                           placeholder='Senha'
                           isFilled={!!value}
                           isPassword
                           onChangeText={onChange}
                           onBlur={onBlur}
                        />
                     )}
                  />

                  <Controller 
                     control={control}
                     name="confirmPassword"
                     render={({ field: { value, onChange, onBlur } }) => (
                        <Input 
                           value={value}
                           iconName='lock' 
                           placeholder='Repetir senha'
                           isFilled={!!value}
                           isPassword
                           keyboardType='email-address'
                           onChangeText={onChange}
                           onBlur={onBlur}
                           viewStyle={{ marginVertical: 8 }}
                        />
                     )}
                  />

                  <Button 
                     title='Cadastrar'
                     onPress={handleSubmit(onSubmit)}
                     color={theme.colors.success}
                     style={{ marginTop: 16 }}
                  />
               </Form>
            </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
}