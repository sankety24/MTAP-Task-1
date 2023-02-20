import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ClothesSingle from './ClothesSingle'
import Homepage from "../pages/Homepage";
import Clothes from './Clothes';
import Shoes from './Shoes';
import Furniture from './Furniture';
import Gardens from './Gardens';
import Sale from './Sale';
import GardensSingle from './GardensSingle';
import FurnitureSingle from './FurnitureSingle';
import SaleSingle from './SaleSingle';
import CartPage from '../Components/CartPage';

import AdminAdd from '../AdminPage/AdminAdd';
import Shippingdetail from '../Components/Shippingdetail';



const AllRoute  = () => {
  return (
    <Routes>
        <Route path="/cloth"   element={<Clothes/>}/>
        <Route path="/shoes"   element={<Shoes/>}/>
        <Route path="/furniture"   element={<Furniture/>}/>
        <Route path="/gardens"   element={<Gardens/>}/>
        <Route path="/sale"   element={<Sale/>}/>
        <Route path="/cloth/:id"   element={<ClothesSingle/>}/>
        <Route path="/gardens/:id"   element={<GardensSingle/>}/>
        <Route path="/furniture/:id"   element={<FurnitureSingle/>}/>
        <Route path="/sale/:id"   element={<SaleSingle/>}/>
        <Route path='/cartPage' element={<CartPage/>}/>

        <Route path="/" element={<Homepage />}></Route>
        <Route path="/admin" element={<AdminAdd />}></Route>

        <Route path='/shippingdetail' element={<Shippingdetail />}></Route>

    </Routes>
  )
}

export default AllRoute