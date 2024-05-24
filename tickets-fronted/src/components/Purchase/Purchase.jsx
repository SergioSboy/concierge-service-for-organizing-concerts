import React, {useState} from 'react';
import Timer from "./Timer/Timer";
import Form from "./Form/Form";
import TicketItem from "./TicketItem/TicketItem"; // Подключаем файл со стилями
import {useNavigate, useParams} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import MyButton from "../UI/MyButton/MyButton";
import classes from "./Purchase.module.css";

const Purchase = () => {
    const {id, booking_number} = useParams();
    const [result, setResult] = useState(true)
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    const [information, setInformation] = useState()
    const navigate = useNavigate()
    const handleCancelBooking = () => {
        // Отправка запроса DELETE при нажатии кнопки
        fetch(`http://localhost:3010/booking/cancel?booking_number=${booking_number}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при отмене бронирования');
                }
                return response.json();
            })
            .then(data => {

                console.log('Бронирование успешно отменено', data);
                navigate('/events')
            })
            .catch(error => {
                // Обработка ошибок
                console.error('Ошибка при отмене бронирования:', error);
            });
    };

    const deleteTicket = () => {
        fetch(`http://localhost:3001/tickets/block?`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams()
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при отмене билета');
                }
                return response.json();
            })
            .then(data => {

                console.log('Билет возвращен', data);
                navigate('/events')
            })
            .catch(error => {
                // Обработка ошибок
                console.error('Ошибка:', error);
            });
    };

    return (
        <div>
            <h2>{message}</h2>
            {loading && <Preloader/>}
            {result ? (
                    <>
                        <Timer/>

                        {!loading && (
                            <Form
                                booking_number={booking_number}
                                setResult={setResult}
                                setLoading={setLoading}
                                setMessage={setMessage}
                                setInformation={setInformation}
                            />
                        )}
                        <div className={classes.brn_cancel}>
                            <MyButton title={'Отменить бронь билета'} onClick={handleCancelBooking}/>
                        </div>
                    </>
                )
                : (<>
                        <TicketItem id={id} information={information}/>
                        <div className={classes.brn_cancel}>
                            <MyButton title={'Вернуть билет'} onClick={deleteTicket}/>
                        </div>
                    </>


                )}


        </div>
    );
};

export default Purchase;
