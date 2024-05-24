import React from 'react';
import classes from "./Product.module.css";
import { useState } from 'react';
import MyButton from "../../UI/MyButton/MyButton";
import {useParams} from "react-router-dom";
const Product = () => {

    const {id} = useParams();  // +category
    // Получить с помощью категории нужные вещи
    const merch_s = [
        {id:1, category: 't-shirts', merch_name: 'Футболка #1', price: '1599', small_image_1: 'black_merch_1.jpg', small_image_2:'black_merch_2.jpg', big_image: 'black_merch_3.jpg' },
        {id:2, category: 't-shirts', merch_name: 'Футболка #2', price: '1599', small_image_1: 'white_merch_1.jpg', small_image_2:'white_merch_2.jpg', big_image: 'white_merch_3.jpg' },
        {id:3, category: 't-shirts', merch_name: 'Футболка #3', price: '1599', small_image_1: 'dima_merch_1.jpg', small_image_2:'dima_merch_2.jpg', big_image: 'dima_merch_3.jpg' },
    ]
    const merch = merch_s[id - 1]
    const smallImagePath3 = require(`../../../images/${merch.big_image}`);
    const smallImagePath = require(`../../../images/${merch.small_image_1}`);
    const smallImagePath2 = require(`../../../images/${merch.small_image_2}`);

    const [currentBigImage, setCurrentBigImage] = useState(smallImagePath);

    const handleSmallImageClick = (imagePath) => {
        setCurrentBigImage(imagePath);
    };
    return (
        <div>
            <div className={classes.merch_card}>
                <div className={classes.merch_images}>
                    <div  className={classes.bigImage}>
                        <img src={currentBigImage} alt="Большое"/>
                    </div>
                    <div className={classes.small_images}>
                        <img src={smallImagePath} alt="Маленькое 1" onClick={() => handleSmallImageClick(smallImagePath)} className={currentBigImage === smallImagePath ? classes.selected : ''} />
                        <img src={smallImagePath2} alt="Маленькое 2" onClick={() => handleSmallImageClick(smallImagePath2)} className={currentBigImage === smallImagePath2 ? classes.selected : ''} />
                        <img src={smallImagePath3} alt="Маленькое 3" onClick={() => handleSmallImageClick(smallImagePath3)} className={currentBigImage === smallImagePath3 ? classes.selected : ''} />
                    </div>
                </div>
                <div className={classes.merch_details}>
                    <h1>{merch.merch_name}</h1>
                    <p>{merch.price} <strong>₽</strong></p>
                    <h3>О товаре</h3>
                    <ul>
                        <li>Состав: хлопок 100%</li>
                        <li>Пол: унисекс</li>
                    </ul>
                    <MyButton title={'Купить'}/>
                </div>
            </div>
        </div>

    );
};

export default Product;