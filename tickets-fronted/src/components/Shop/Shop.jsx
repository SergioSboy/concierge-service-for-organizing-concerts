import React from 'react';
import classes from "./Shop.module.css";
import {NavLink} from "react-router-dom";

const Shop = () => {

    // Получить категории по запросу
    const categories = [
        {id: 1, category: 't-shirts', category_ru: 'Футболки', image: 't_shirts.jpg' },
        {id: 2, category: 'hoodies', category_ru: 'Худи', image: 'black_merch_3.jpg' },
        {id: 3, category: 'items', category_ru: 'Аксессуары', image: 'white_merch_3.jpg'},
        {id: 4, category: 'hats', category_ru: 'Головные уборы', image: 'logo_2.jpg'}
    ]

    return (
        <div className={classes.cards}>
            <h1>Магазин мерча</h1>
            <div className={classes.container}>
                    {categories.map((category) => (
                        <div key={category.id} className={classes.category}>
                            <NavLink to={`/products/${category.category}`}>
                                <img src={require(`../../images/${category.image}`)} alt={category.category_ru} />
                            </NavLink>
                            <h3>{category.category_ru}</h3>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Shop;