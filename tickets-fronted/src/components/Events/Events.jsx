import React, {useEffect} from 'react';
import MyButton from "../UI/MyButton/MyButton";
import classes from './Events.module.css'
import EventItem from "./EventItem/EventItem";
import { useState } from 'react';
import Preloader from "../common/Preloader/Preloader";

const Events = () => {
    const [selectedMonth, setSelectedMonth] = useState('Все');
    const [event_s, setEvents] = useState([]);
    const [loading, setLoading] = useState(false)

    // Запрос на сервер
    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:3001/events?limit=100')
            .then(res => res.json())
            .then(data => {
                setEvents(data)
                setLoading(false)
            })
    }, []);


    // Функция для фильтрации мероприятий по месяцам
    const filterEventsByMonth = (month) => {
        if (month === 'Все') {
            return event_s;
        } else {
            return event_s.filter(event => {
                const eventMonth = parseInt(event.event_datetime.split('-')[1]); // Получаем номер месяца (1-12)
                return eventMonth === month;

            });
        }
    };


    // Обработчик нажатия на кнопку месяца
    const handleMonthButtonClick = (month) => {
        setSelectedMonth(month);
    };

    return (
        <> {!loading &&
            <div>
                <h1>Афиша концертов</h1>
                <div className={classes.buttons_grid}>
                    <MyButton
                        title="Все"
                        onClick={() => handleMonthButtonClick('Все')}
                        className={selectedMonth === 'Все' ? classes.selected : ''}
                    />
                    <MyButton
                        title="Май"
                        onClick={() => handleMonthButtonClick(5)}
                        className={selectedMonth === 5 ? classes.selected : ''}
                    />
                    <MyButton
                        title="Июнь"
                        onClick={() => handleMonthButtonClick(6)}
                        className={selectedMonth === 6 ? classes.selected : ''}
                    />
                </div>
                <hr className={classes.horizontal_line} />
                <div>
                    {filterEventsByMonth(selectedMonth).map((event) =>
                        <EventItem event={event} key={event.id} />
                    )}
                </div>
                <hr className={classes.horizontal_line} />
            </div>
            }
            {loading && <Preloader/>}
        </>

    );
};

export default Events;