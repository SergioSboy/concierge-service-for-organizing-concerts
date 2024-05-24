import React from 'react';
import classes from './Ticket.module.css'
const Ticket = ({ ticket_category, count, setCount }) => {
    const incrementCount = () => {
        setCount('increment');
    };

    const decrementCount = () => {
        setCount('decrement');
    };

    return (
        <div className={classes.ticket}>
            <div className={classes.ticket_info}>{ticket_category.category}</div>
            <div className={classes.ticket_info}>{ticket_category.price} ₽</div>
            <div className={classes.ticket_controls}>
                <button onClick={incrementCount} disabled={count >= 1}>+</button>
                {count}
                <button onClick={decrementCount}>-</button>
            </div>
        </div>
    );
};
export default Ticket;
