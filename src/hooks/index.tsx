import React from 'react';

import { AuthProvider } from './auth';

export const Hooks: React.FC = ({ children }) => {
   return(
      <AuthProvider>
         {children}
      </AuthProvider>
   );
}