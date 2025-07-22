import React, { useEffect, useState } from 'react'
import Stlye from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute(props) {
  
    if(localStorage.getItem('userToken')!== null)
    {
     // navigate to component
     return props.children
    }
    else
    {
      //navigate login
    return  <Navigate to={'/login'}/>
    }
    

}
