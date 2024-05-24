import React from 'react';
import classes from './EventItem.module.css'
import MyButton from "../../UI/MyButton/MyButton";
import {NavLink} from "react-router-dom";

const EventItem = (props) => {


    const formattedDate = formatDate(props.event.event_datetime);


    return (
        <div className={classes.parent}>
            <div className={classes.event}>
                <div>
                    <h2>{props.event.event}</h2>
                    <p>{`${formattedDate.dayOfMonth} ${formattedDate.month}, ${formattedDate.dayOfWeek}, ${props.event.place}`}</p>
                </div>
                <div className={classes.btn}>
                    <NavLink to={'./../booking/' + props.event.id}>
                        <MyButton title="БИЛЕТЫ" onClick={onclick}/>
                    </NavLink>
                </div>
            </div>
        </div>

    );
};

function formatDate(event_datetime) {
    // Создаем объект Date из строки с датой и временем
    const dateObj = new Date(event_datetime);

    // Получаем день недели, число месяца и индекс месяца из объекта Date
    const dayOfWeek = dateObj.toLocaleDateString('ru-RU', {weekday: 'long'}); // День недели (полное название)
    const dayOfMonth = dateObj.getDate(); // Число месяца (1-31)
    const monthIndex = dateObj.getMonth(); // Индекс месяца (0-11)

    // Получаем часы и минуты
    const hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    minutes = (minutes < 10 ? '0' : '') + minutes;
    // Массив с названиями месяцев
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    // Возвращаем объект с датой, временем и днем недели
    return {
        dayOfWeek,
        dayOfMonth,
        month: months[monthIndex],
        hours,
        minutes
    };
}

export default EventItem;