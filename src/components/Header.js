import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser,removeUser } from '../utils/userSlice';
import { LANUAGE_OPTIONS, LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSearchSlice';
import { changeLang } from '../utils/configSlice';



const Header = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const user=useSelector((store)=>store.user)
    const showGptSearch=useSelector((store)=>store.gpt.gptSearchView)

    
    const handleSignOut=()=>{
        signOut(auth).then(() => {
            navigate("/")
          }).catch((error) => {
            // An error happened.
            
          });
    }

    useEffect(()=>{
      const unsubscribe= onAuthStateChanged(auth, (user) => {
          if (user) {
            
            const {uid,email,displayName,photoURL} = user;
            dispatch(addUser({uid:uid,email:email,displayName:displayName, photoURL:photoURL}))
           navigate("/browse");
            
          } else {
            dispatch(removeUser());
            navigate("/");
            
            
          }
        });
        return ()=> unsubscribe();

  },[])
  
  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLang(e.target.value));
  }
  

  return (
    <div className='bg-black bg-opacity-70 md:bg-transparent flex justify-between md:flex  md:flex-row md:justify-between absolute bg-gradient-to-b from-black  py-2 w-full md:h-[13%]  '>
      <div className='flex justify-center'>
      <img src={LOGO} alt="/" className=' w-28 md:w-44  md:align-middle' /></div>
     
    {user && <div className=' flex justify-center items-center md:flex md:items-center md:justify-center pr-1  md:pr-5'>
      {showGptSearch && (
      <select className='bg-gray-700 text-white h-[40%] rounded-lg text-sm md:text-lg' onChange={handleLanguageChange}>
        {LANUAGE_OPTIONS.map((lang)=>(
          <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
        ))}
      </select>)}
      <button  onClick={handleGptSearchClick} className='bg-purple-600 m-1 md:m-2 rounded-lg px-1 h-[40%] text-white text-sm md:text-lg'>{showGptSearch?"Homepage":"Gemini_Search"}</button>
      <img alt="usericon" src={user.photoURL} className='md:m-2 h-6 md:h-8 '/>
      <button onClick={handleSignOut} className='bg-gray-300 m-1 md:m-2 rounded-lg  px-1 h-[40%] text-sm md:text-lg '>Sign out</button>
      </div>}

      </div>
    
  )
}

export default Header
