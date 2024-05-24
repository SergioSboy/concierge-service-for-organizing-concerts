import classes from './Booking.module.css'
import Ticket from "./Ticket/Ticket";
import MyButton from "../UI/MyButton/MyButton";
import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Preloader from "../common/Preloader/Preloader";

const Booking = () => {

    const {id} = useParams();
    const [ticketPrices, setTicketPrices] = useState([]);
    const [datetime, SetDateTime] = useState('')
    const [loading, setLoading] = useState(false)
    // Нужно делать запрос, чтобы узнать мероприятие, которое будет проводитя

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3001/events/${id}`)
            .then(res => res.json())
            .then(async data => {
                const eventDateTime = data.event_datetime;
                // Выполняем второй запрос, используя данные из первого запроса
                const response = await fetch(`http://localhost:3001/tickets/price?event_date=${eventDateTime}`);
                const ticketsData = await response.json();
                // Обновляем состояния после получения данных
                SetDateTime(eventDateTime);
                setTicketPrices(ticketsData);
                setTicketCounts(ticketsData.map(() => 0));
                setLoading(false)
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    // Создаем состояние для хранения количества билетов для каждой категории
    const [ticketCounts, setTicketCounts] = useState(ticketPrices.map(() => 0));

    const vip_or_fan = () => {
        const index = ticketCounts.findIndex(e => e !== 0)
        return index === 0 ? 'fan' : 'vip'
    }

    let formattedDate = formatDate(datetime);
    const navigate = useNavigate()
    const handleBooking = () => {
        // Выполняем POST-запрос
        fetch('http://localhost:3010/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: `${vip_or_fan()}`,
                date: `${datetime}`
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Возвращаем Promise с данными ответа
                } else {
                    // Обработка ошибки
                    console.error('Failed to book');
                    throw new Error('Failed to book');
                }
            })
            .then(data => {
                // Извлекаем booking_number из данных
                const bookingNumber = data.booking_number;
                // Перенаправляем пользователя на страницу покупки с booking_number
                navigate(`/purchase/${id}/${bookingNumber}`);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    // Функция для увеличения количества билетов для определенной категории
    const incrementCount = (index) => {
        // Проверяем, что количество билетов не превышает 1
        if (ticketCounts[index] < 1 && (ticketCounts[0] + ticketCounts[1] === 0)) {
            setTicketCounts(prevCounts => {
                const newCounts = [...prevCounts];
                newCounts[index]++;
                return newCounts;
            });
        }
    };

    // Функция для уменьшения количества билетов для определенной категории
    const decrementCount = (index) => {
        if (ticketCounts[index] > 0) {
            setTicketCounts(prevCounts => {
                const newCounts = [...prevCounts];
                newCounts[index]--;
                return newCounts;
            });
        }
    };

    const isButtonDisabled = ticketCounts.every(count => count === 0);
    return (
        <> {!loading &&
            <div className={classes.booking}>
                <p>{`${formattedDate.dayOfMonth} ${formattedDate.month}, ${formattedDate.dayOfWeek}, ${formattedDate.hours}:${formattedDate.minutes}`}</p>
                <div className={classes.rim}>
                    {ticketPrices.map((category, index) => (
                        <Ticket
                            key={category.id}
                            ticket_category={category}
                            count={ticketCounts[index]}
                            setCount={(action) => action === 'increment' ? incrementCount(index) : decrementCount(index)}
                        />
                    ))}
                </div>
                <div className={classes.btn}>
                    <div className={classes.btn}>

                        {isButtonDisabled ? (
                            <MyButton title={'Забронировать'} disabled={true} />
                        ) : (
                            <MyButton title={'Забронировать'} onClick={handleBooking}/>

                        )}
                    </div>
                </div>

            </div>
            }
            {loading && <Preloader/>}
        </>

    );
}
function formatDate(event_datetime) {
    // Создаем объект Date из строки с датой и временем
    const dateObj = new Date(event_datetime);

    // Получаем день недели, число месяца и индекс месяца из объекта Date
    const dayOfWeek = dateObj.toLocaleDateString('ru-RU', { weekday: 'long' }); // День недели (полное название)
    const dayOfMonth = dateObj.getDate(); // Число месяца (1-31)
    const monthIndex = dateObj.getMonth(); // Индекс месяца (0-11)

    // Получаем часы и минуты
    const hours = dateObj.getUTCHours();
    let  minutes = dateObj.getUTCMinutes();
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

export default Booking;