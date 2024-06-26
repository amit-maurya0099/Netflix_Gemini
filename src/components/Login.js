import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG, PHOTO_URL } from '../utils/constants';

const Login = () => {
    
    const dispatch=useDispatch();


    const [isSignInForm, setIsSignInForm]=useState(true);
    const [errorMessage,setErrorMessage]=useState(null);
     
    const email=useRef(null);
    const password=useRef(null);
    const name=useRef(null)


    const toggleSignIn=()=>{
        setIsSignInForm(!isSignInForm);
    }
   const handleButtonClick=()=>{
    const message=checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);
    if(message) return;
    
    if(!isSignInForm){
        // sign up logic
    createUserWithEmailAndPassword(
        auth,email.current.value,password.current.value
    )
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
        displayName: name.current.value,photoURL:PHOTO_URL
      }).then(() => {
        const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({uid:uid,email:email,displayName:displayName, photoURL:photoURL}))
         
      }).catch((error) => {
        setErrorMessage(error.message)
      })
    

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
    // ..
  });

    }
    else {
        // sign in logic
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "-"+ errorMessage)
  });

    }


   }

  return (

    <div className='flex justify-center '>
        <Header/>
    <div className='w-full'>
        <img src={BG_IMG} alt="/" className='h-screen object-cover md:h-full md:w-full '></img>
    </div>
    <div className=' absolute top-[50vw]  md:top-[30%] md:left-[43%] bg-black bg-opacity-70 rounded-xl p-5'>
    <form onSubmit={(e)=>e.preventDefault()} >
        <div className=' flex justify-center'>
        <h1 className='font-bold text-xl md:text-3xl text-white my-2 '>{isSignInForm?"Sign In":"Sign Up"}</h1>
        </div>

        <div className='flex flex-col justify-center items-center text-white '>
       {!isSignInForm && <input ref={name} type="text" placeholder='Full Name' className='p-1 px-2 m-2 w-[70%] rounded-lg bg-transparent border border-gray-700 text-white '></input>}

        <input ref={email} type="email" placeholder='Email ' className='p-1 px-2 m-2 w-[70%] rounded-lg bg-transparent border border-gray-700 text-white '></input>
       

        <input ref={password} type="password" placeholder='Password ' className=' p-1 px-2 m-2 w-[70%] rounded-lg
        bg-transparent border border-gray-700 text-white '></input>

        <p className='text-red-600 text-sm text-center'>{errorMessage}</p>

        <button className='bg-red-600 text-white m-2 w-[70%] p-1 rounded-lg' onClick={handleButtonClick}
        >{isSignInForm?"Sign In":"Sign Up"}</button>

       {isSignInForm && <p className='text-white font-medium'>OR</p>}
        {isSignInForm && <button className='bg-gray-500 bg-opacity-70  text-white m-2 w-[70%] p-1 rounded-lg'>
            Use a sign-in code</button>}
        
        <p className='cursor-pointer' onClick={toggleSignIn}>{isSignInForm?"New to Netflix? Sign up now":"Already a user! Sign In Now"}</p>
        </div>
       
    </form>
    </div>
      
    </div>
  )
}

export default Login
