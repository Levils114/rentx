import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { api } from "../services/api";

interface UserProps{
   id: string;
   name: string;
   email: string;
   driver_license: string;
   avatar: string | null;
}

interface AuthStateProps{
   user: UserProps;
   token: string;
}

interface HandleSignInProps{
   email: string;
   password: string;
}

interface AuthContextProps{
   data: AuthStateProps;
   handleSignIn(props: HandleSignInProps): Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
   const [data, setData] = useState({} as AuthStateProps);

   async function handleSignIn(props: HandleSignInProps){
      try {
         const response = await api.post("/sessions", props);

         setData(response.data);
         api.defaults.headers.authorization = `Bearer ${response.data.token}`;
      } catch (err) {
         console.error(err);
         if(!!err.response.data.message){
            return Alert.alert("Opa", err.response.data.message);
         }

         Alert.alert("Opa", "Algo deu errado");
      }
   }

   return(
      <AuthContext.Provider value={{ data, handleSignIn }}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth(){
   return useContext(AuthContext);
}