import React from 'react';
import classes from "./ShopItem.module.css";
import {NavLink} from "react-router-dom";


const ShopItem = (props) => {

    const smallImagePath2 = require(`../../../images/${props.merch.small_image_2}`);

    return (
        <div>
            <div className={classes.merch_card}>
                <div className={classes.merch_images}>
                    <img src={smallImagePath2} alt="Большое" className={classes.bigImage}/>
                </div>
                <div className={classes.merch_details}>
                    <h2>{props.merch.merch_name}</h2>
                    <p>Цена: {props.merch.price} <strong>₽</strong></p>
                    <NavLink to={`/products/${props.merch.category}/${props.merch.id}`}>
                        <button>Купить</button>
                    </NavLink>
                </div>
            </div>
        </div>

    );
};

export default ShopItem;