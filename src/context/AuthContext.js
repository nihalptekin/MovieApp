import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import React from 'react';
import auth from '../auth/firebase';
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
// Creat ettikten sonra bu bize bir rovider sagliyor icin bu context yapacagimiz yapiyi sagliyor.


let AuthContext = createContext()

const AuthContextProvider = ({children}) => {

  let navigate=useNavigate()
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    userObserver();
  }, []);
  // #cagiraacagim yerden email ve passwordu gönderecgim icin icine email ve passwordu parametre olarak gönderdim. sonra istedigim yxerden kullanabilirim. 
 
       //!  ************** CREATEUSER ******************

  const createUser =async(email, password, displayName)=>{
   try {
    //? Yeni bir kullanici olsuturmak icin kullanilan firebase metodu
    let userCredential = await createUserWithEmailAndPassword(
      auth, email, password);
      //? kullanıcı profilini güncellemek için kullanılan firebase metodu
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
    toastSuccessNotify("Registered successfully")
    navigate("/")
   } catch (error) {
    console.log(error);
    toastErrorNotify(error.message)
   }
  }; 

          //!  ************** SIGN IN ******************

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Email/password
  //! Email/password ile girişi enable yap
  const signIn = async (email, password) => {
    try {
      //? Mevcut kullanıcının giriş yapması için kullanılan firebase metodu
      await signInWithEmailAndPassword(auth, email, password);
      toastSuccessNotify("Logged in successfuly");
      navigate("/");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };


          //!  ************** SIGN OUT ******************
const logOut =()=> {
  // signOut() firebase'in metodu. Tüm metotlarin icne auth da yazmamiz gerekiyor
  signOut(auth)
  toastSuccessNotify("Logged out sucessfully");

}

      //!  ************** USER OBSERVER ******************

// Asagidaki firebase'den aldigimiz fonksiyon user'in durumunu sürekli takip eder. Firebase'de login logout yaptiginda onu kontrol edebilir. 
const userObserver = () => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
    } else {
      setCurrentUser(false);
    }
  });
};


     //!  ************** SIGN UP WITH GOOGLE******************

  //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Google
  //! Google ile girişi enable yap
  //* => Authentication => settings => Authorized domains => add domain
  //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
  const signUpProvider = () => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        toastSuccessNotify("Logged in successfuly");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };


const values= {createUser, signIn, logOut, userObserver, signUpProvider, currentUser}
  return (
    // bir Componenti sarmalladigimiz her sey children propudur. App.js dosyayinda App routeru provider arasina aldik. Burada da chidlren ile App routeri kullanmis olduk.
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider;