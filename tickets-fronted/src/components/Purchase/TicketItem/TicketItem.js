import React, {useEffect, useState} from 'react';
import classes from "./TicketItem.module.css";
import QRCodeComponent from "../QRCode/QRCodeComponent";

const TicketItem = (props) => {

    const [datetime, setDateTime] = useState('')
    const [place, setPlace] = useState('')
    const [event, setEvent] = useState('')
    const [category, setCategory] = useState('')
    // Нужно делать запрос, чтобы узнать мероприятие, которое будет проводитя

    useEffect(() => {
        fetch(`http://localhost:3001/events/${props.id}`)
            .then(res => res.json())
            .then(data => {
                    setDateTime(data.event_datetime)
                    setPlace(data.place)
                    setEvent(data.event)
                }
            )
    }, [props.id]);

    useEffect(() => {
        fetch(`http://localhost:3001/tickets?ticket_number=${props.information.ticket_number}`)
            .then(res => res.json())
            .then(data => {
                setCategory(data.category);
            })
            .catch(error => console.error('Ошибка при получении данных билета:', error));
    }, [props.information.ticket_number]);

    let formattedDate = formatDate(datetime);
    return (
        <div>
                <div className={classes.ticket}>
                    <div className={classes.header}>
                        <div className={classes.event_title}><strong>{event}</strong></div>
                        <div className={classes.ticket_info}>
                            <span className={classes.ticket_number}>№{props.information.ticket_number}</span>
                            <span className={classes.zone}>{
                                category === 'fan'
                                    ? <div><strong>ФАН</strong>-зона</div>
                                    : <div><strong>VIP</strong>-зона</div>
                            }</span>
                        </div>
                    </div>
                    <div className={classes.concert_info}>
                        <div className={classes.date_time}>{`${formattedDate.dayOfMonth} ${formattedDate.month}, ${formattedDate.dayOfWeek}, (${formattedDate.hours}:${formattedDate.minutes})`}</div>
                        <div className={classes.location}>{place}</div>
                    </div>
                    <div className={classes.qr_code}>
                        <QRCodeComponent
                            ticketNumber={props.information.ticket_number}
                            category={category}
                            currentDate={datetime}
                        />
                    </div>
                    <div className={classes.price}>{props.information.ticket_price} руб.</div>
                </div>


        </div>
    );

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
        }
    };
}
export default TicketItem;