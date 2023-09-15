import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { auth } from "../auth/firebase";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
// Creat ettikten sonra bu bize bir rovider sagliyor icin bu context yapacagimiz yapiyi sagliyor.

export const AuthContex = createContext();

const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  // userObserver'i useEffectle cagirdik. Böylece sürekli login logutu taki edecek. Biz currentUseri ona göre doldurup bosaltiyoruz.
  useEffect(() => {
    userObserver();
  }, []);

  // #cagiraacagim yerden email ve passwordu gönderecgim icin icine email ve passwordu parametre olarak gönderdim. sonra istedigim yxerden kullanabilirim.

  //!  ************** CREATEUSER ******************

  const createUser = async (email, password, displayName) => {
    try {
      //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //? kullanıcı profilini güncellemek için kullanılan firebase metodu
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      toastSuccessNotify("Registered successfully");
      navigate("/");
      console.log(userCredential);
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
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
  const logOut = () => {
    // signOut() firebase'in metodu. Tüm metotlarin icne auth da yazmamiz gerekiyor
    signOut(auth);
    toastSuccessNotify("Logged out sucessfully");
  };

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

  //!  ************** SIGN UP WITH GOOGLE ******************

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

  //!  ************** FOGOT PASSWORD ******************

  const forgotPassword = (email) => {
    //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toastWarnNotify("Please check your mail box!");
        // alert("Please check your mail box!");
      })
      .catch((err) => {
        toastErrorNotify(err.message);
        // alert(err.message);
        // ..
      });
  };

  const values = {
    createUser,
    signIn,
    logOut,
    signUpProvider,
    currentUser,
    forgotPassword,
  };
  // bir Componenti sarmalladigimiz her sey children propudur. App.js dosyayinda App routeru provider arasina aldik. Burada da chidlren ile App routeri kullanmis olduk.
  return <AuthContex.Provider value={values}>{children}</AuthContex.Provider>;
};

export default AuthContextProvider;
