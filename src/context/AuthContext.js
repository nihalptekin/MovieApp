import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
import React from 'react';
import auth from '../auth/firebase';
// creat ettikten sonra bu bize bir rovider sagliyor icin bu context yapacagimiz yapiyi sagliyor.


const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  // #cagiraacagim yerden email ve passwordu gönderecgim icin icine email ve passwordu parametre olarak gönderdim. sonra istedigim yxerden kullanabilirim. 
 
 
  const createUser =async(email, password)=>{
   try {
    //? Yeni bir kullanici olsuturmak icin kullanilan firebase metodu
    let userCredential = await createUserWithEmailAndPassword(
      auth, email, password)
    console.log(userCredential);
   } catch (error) {
    console.log(error);
   }
  }

const values= {createUser}
  return (
    // bir komponenti sarmalladigimiz her sey children propudur. App.js dosyayinda App routeru provider arasina aldik. Burada da chidlren ile App routeri kullanmis olduk.
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;