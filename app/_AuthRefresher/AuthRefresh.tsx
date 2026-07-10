import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setToken } from '../lib/Redux/AuthSlice';
interface AuthRefreshProps {
  children: React.ReactNode;
}
export default function AuthRefresh({children}:AuthRefreshProps ) {
 
    const dispatch = useDispatch();
    useEffect(()=>{
        const token = localStorage.getItem("userToken")

        if(token){
            dispatch(setToken(token))
        }
    },[dispatch])
    return (
    <div>
      {children}
    </div>
  )
}
