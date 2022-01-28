import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/auth';
import { AppTabRoutes } from './app.tab.routes';

export function Routes(){
   const { data: { user } } = useAuth();
   return(
      <NavigationContainer>
         {user ? <AppTabRoutes /> : <AuthRoutes />}
      </NavigationContainer>
   );
}