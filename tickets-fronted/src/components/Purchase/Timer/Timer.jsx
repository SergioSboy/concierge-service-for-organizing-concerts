import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import classes from './Timer.module.css';
const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(5 * 60); // Время в секундах
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            } else {
                // Перенаправляем пользователя на страницу /events
                navigate(`/events`);
            }
        }, 1000); // Запускаем таймер каждую секунду

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }, [timeLeft, navigate]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className={classes.timer}>
            <p>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>
        </div>
    );
};

export default Timer;