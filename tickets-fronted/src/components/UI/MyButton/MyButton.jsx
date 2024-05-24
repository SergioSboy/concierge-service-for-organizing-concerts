import React from 'react';
import classes from './MyButton.module.css'
const MyButton = (props) => {

    const { title, onClick, className } = props;
    return (
        <button className={`${classes.custom_button} ${className}`} onClick={onClick}>
            {title}
        </button>
    );
};

export default MyButton;