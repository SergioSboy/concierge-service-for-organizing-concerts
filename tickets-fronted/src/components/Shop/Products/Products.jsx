import React from 'react';
import ShopItem from "../ShopItem/ShopItem";
import classes from "./Products.module.css";
// import {useParams} from "react-router-dom";


const Products = () => {

    // const {category} = useParams();
    // Получить данные с помощью category, который приходит из роута
    const merch_s = [
        {id:1, category: 't-shirts', merch_name: 'Футболка #1', price: '1599', small_image_1: 'black_merch_1.jpg', small_image_2:'black_merch_2.jpg', big_image: 'black_merch_3.jpg' },
        {id:2, category: 't-shirts', merch_name: 'Футболка #2', price: '1599', small_image_1: 'white_merch_1.jpg', small_image_2:'white_merch_2.jpg', big_image: 'white_merch_3.jpg' },
        {id:3, category: 't-shirts', merch_name: 'Футболка #3', price: '1599', small_image_1: 'dima_merch_1.jpg', small_image_2:'dima_merch_2.jpg', big_image: 'dima_merch_3.jpg' },
    ]
    return (

        <div>
            <h1>Футболки</h1>
            <div className={classes.product_grid}>
                {merch_s.map((merch) =>
                    <ShopItem merch={merch} key={merch.id}/>
                )}
            </div>

        </div>
    );
};

export default Products;