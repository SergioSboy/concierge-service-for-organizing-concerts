import React, {useEffect, useState} from 'react';
import classes from './Main.module.css';
import main_photo from '../../images/main.jpeg';
import EventItem from "../Events/EventItem/EventItem";
import MyButton from "../UI/MyButton/MyButton";
import {Link, NavLink} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";


// Запрос в БД на получении списка треков артиста
const cards_of_tracks = [
    {
        id: 1,
        track_name: 'Внезапное воспоминание о лете',
        track_link: 'https://www.example.com',
        track_image: 'track_1.png'
    },
    {id: 2, track_name: 'Фармакон', track_link: 'https://www.example.com', track_image: 'track_2.png'},
    {id: 3, track_name: 'Молодость', track_link: 'https://www.example.com', track_image: 'track_3.png'},
    {id: 4, track_name: 'Весна!', track_link: 'https://www.example.com', track_image: 'track_4.png'}
]
const Main = () => {
    const [loading, setLoading] = useState(false)
    const [event_s, setEvents] = useState([]);
// Запрос в БД, некоторое количество мероприятий (2 штуки)

    useEffect(() => {
        setLoading(true)
        // Запрос в БД, некоторое количество мероприятий (2 штуки)
        fetch('http://localhost:3001/events?limit=2')
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false)
            });
    }, []);

    return (
        <>
            {!loading &&
                <div>
                    <div>
                        <img src={main_photo} alt={'Главная фотка'} className={classes.fullWidthImage}/>
                    </div>
                    <h2>Карточка музыканта</h2>
                    <div className={classes.tracks}>

                        {cards_of_tracks.map((card_of_track) => (
                            <div key={card_of_track.id} className={classes.trackContainer}>
                                <div className={classes.trackContainer}>
                                    <img src={require(`../../images/${card_of_track.track_image}`)}
                                         className={classes.track} alt={card_of_track.track_name}/>
                                    <Link to={card_of_track.track_link} className={classes.playIcon}></Link>
                                    <div className={classes.trackCaption}>
                                        <div className={classes.multiline}>
                                            {card_of_track.track_name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Ближайшие концерты</h2>
                    </div>
                    <div className={classes.events}>
                        {event_s.map((event) =>
                            <EventItem event={event} key={event.id}/>
                        )}
                        <div className={classes.btn}>
                            <NavLink to={'/events'}>
                                <MyButton title={'Все концерты'}/>
                            </NavLink>
                        </div>
                    </div>
                </div>
            }
            {loading && <Preloader/>}
        </>
    );
};

export default Main;