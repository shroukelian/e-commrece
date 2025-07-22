import React, { useEffect, useState } from 'react'
import Stlye from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'


export default function Home() {
    const [first, setfirst] = useState(0)
    useEffect(() => {
    }, [])
    
  return <>
  <CategoriesSlider></CategoriesSlider>
  <RecentProducts></RecentProducts>
  </>
}
