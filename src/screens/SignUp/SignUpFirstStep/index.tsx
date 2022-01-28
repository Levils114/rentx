import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
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

interface HandleSubmitProps{
   name: string;
   email: string;
   cnh: string;
}

const schema = yup.object().shape({
   name: yup.string().required("Nome obrigatório"),
   email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
   cnh: yup.string().required("CNH obrigatório"),
});

export function SignUpFirstStep(){
   const { goBack, navigate } = useNavigation();
   const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
   });

   useEffect(() => {
      const errorsKeys = Object.keys(errors);

      if(errorsKeys.length >= 1){
         Alert.alert("Opa", errors[errorsKeys[0]].message);
      }
   }, [errors]);

   function onSubmit(data: HandleSubmitProps){
      navigate("SignUpSecondStep" as never, { user: data } as never);
   }

   return(
      <KeyboardAvoidingView behavior='position' enabled>
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
               <Header>
                  <BackButton onPress={goBack}/>

                  <StepsIndicators>
                     <CurrentIndexIndicator active/>
                     <CurrentIndexIndicator />
                  </StepsIndicators>
               </Header>

               <Title>Crie sua{'\n'}conta</Title>
               <Subtitle>Faça seu cadastro de {"\n"}forma fácil</Subtitle>

               <Form>
                  <FormTitle>1. Dados</FormTitle>

                  <Controller 
                     name='name'
                     control={control}
                     render={({ field: { value, onChange, onBlur } }) => (
                        <Input 
                           value={value}
                           iconName='user' 
                           placeholder='Nome'
                           isFilled={!!value}
                           onChangeText={onChange}
                           onBlur={onBlur}
                        />
                     )}
                  />

                  <Controller 
                     name='email'
                     control={control}
                     render={({ field: { value, onChange, onBlur } }) => (
                        <Input 
                           value={value}
                           iconName='mail' 
                           placeholder='E-mail'
                           isFilled={!!value}
                           keyboardType='email-address'
                           viewStyle={{ marginVertical: 8 }}
                           onChangeText={onChange}
                           onBlur={onBlur}
                        />
                     )}
                  />

                  <Controller 
                     name='cnh'
                     control={control}
                     render={({ field: { value, onChange, onBlur } }) => (
                        <Input 
                           value={value}
                           iconName='credit-card' 
                           placeholder='CNH'
                           isFilled={!!value}
                           keyboardType='numeric'
                           onChangeText={onChange}
                           onBlur={onBlur}
                        />
                     )}
                  />

                  <Button 
                     title='Próximo'
                     onPress={handleSubmit(onSubmit)}
                     style={{ marginTop: 16 }}
                  />
               </Form>
            </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
}