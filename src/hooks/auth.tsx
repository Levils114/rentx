import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { database } from "../database";
import { User } from "../database/models/User";
import { api } from "../services/api";

interface UserProps{
   id: string;
   user_id: string;
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
   handleUpdateUser(props: UserProps): Promise<void>;
   handleSignOut(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
   const [data, setData] = useState({} as AuthStateProps);

   useEffect(() => {
      async function loadUserData(){
         try{
            const user = await database.get("users").query().fetch()

            if(user.length >= 1){
               const userData = user[0]._raw as unknown as User;

               api.defaults.headers.authorization = `Bearer ${userData.token}`;

               setData({
                  user: userData,
                  token: userData.token,
               });
            }
         } catch(err){
            console.error(err);
         }
      }

      loadUserData();
   }, []);

   async function handleSignIn(props: HandleSignInProps){
      try {
         let userToSave: User;

         const response = await api.post("/sessions", props);
         api.defaults.headers.authorization = `Bearer ${response.data.token}`;

         const userCollection = database.get<User>("users");
         await database.write(async() => {
            userToSave = await userCollection.create((user) => {
               user.user_id = response.data.user.id;
               user.name = response.data.user.name;
               user.email = response.data.user.email;
               user.driver_license = response.data.user.driver_license;
               user.avatar = response.data.user.avatar;
               user.token = response.data.token;
            })
         });
         
         setData({
            user: userToSave,
            token: userToSave.token
         });
      } catch (err) {
         console.error(err);
         if(!!err.response.data.message){
            return Alert.alert("Opa", err.response.data.message);
         }

         Alert.alert("Opa", "Algo deu errado");
      }
   }

   async function handleSignOut(){
      try{
         const userCollection = database.get<User>("users");
         
         await database.write(async() => {
            const userSelected = await userCollection.find(data.user.id);
            await userSelected.destroyPermanently();
         });

         setData({} as AuthStateProps);
      } catch(err){
         throw new Error(err);
      }
   }

   async function handleUpdateUser(newUser: UserProps){
      try{
         const userCollection = database.get<User>("users");

         await database.write(async() => {
            const userSelected = await userCollection.find(data.user.id);
            await userSelected.update((user) => {
               user.name = newUser.name,
               user.driver_license = newUser.driver_license,
               user.avatar = newUser.avatar
            });
         });

         setData(prevValue => ({
            user: newUser,
            ...prevValue
         }));
      } catch(err){
        throw new Error(err);
      }
   }

   return(
      <AuthContext.Provider value={{ 
         data,
         handleSignIn,
         handleUpdateUser,
         handleSignOut,
      }}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth(){
   return useContext(AuthContext);
}