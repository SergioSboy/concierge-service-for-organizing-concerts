import './App.css';
import React from 'react';

import {Route, Routes} from "react-router-dom";

import Events from "./components/Events/Events";
import About from "./components/About/About";

import Shop from "./components/Shop/Shop";
import Products from "./components/Shop/Products/Products";
import Product from "./components/Shop/Product/Product";

import Main from "./components/Main/Main";

import Booking from "./components/Booking/Booking";
import Purchase from "./components/Purchase/Purchase";
import Layout from "./components/Layout/Layout";
import Border from "./components/Border/Border";
import Journal from "./components/Journal/Journal";

function App() {
  return (
    <div className="app-wrapper">
        <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<Main />} />

                        <Route path="about" element={<About />} />


                        {/*Бронирование/Покупка/Продажа*/}
                        <Route path="events" element={<Events />} />
                        <Route path="booking/:id" element={<Booking/>} />
                        <Route path="purchase/:id/:booking_number" element={<Purchase/>} />
                        <Route path="category" element={<Shop />} />
                        <Route path="products/:category" element={<Products />} />
                        <Route path="products/:category/:id" element={<Product/>} />

                        {/*Администрирование*/}
                        <Route path="border" element={<Border/>}/>
                        <Route path="journal" element={<Journal/>}/>
                    </Route>
                </Routes>
        </div>
    </div>
  );
}

export default App;
