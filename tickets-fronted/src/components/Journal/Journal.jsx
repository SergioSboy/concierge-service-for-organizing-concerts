import React, {useState } from 'react';
import axios from 'axios';
import classes from "./Journal.module.css";
import MyButton from "../UI/MyButton/MyButton";
const EntryExitLog = () => {
    const [logData, setLogData] = useState([]);
    const [ticket_number, setTicket_number] = useState('')
    const [status, setStatus] = useState('')
    const [name, setName] = useState('')
    const [event_date, setEvent_date] = useState('')
    const [action, setAction] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        // Запрос данных при монтировании компоненты
        const params = [];
        if (ticket_number !== '') {
            params.push('ticket_number=' + encodeURIComponent(ticket_number));
        }
        if (name !== '') {
            params.push('user_name=' + encodeURIComponent(name));
        }
        if (action !== '') {
            params.push('user_action=' + encodeURIComponent(action));
        }
        if (event_date !== '') {
            params.push('date_time=' + encodeURIComponent(event_date));
        }
        if (status !== '') {
            params.push('status=' + encodeURIComponent(status));
        }
        const queryURL = params.join('&');

        axios.get(`http://localhost:3006/in_out_events?${queryURL}`)
            .then(response => {
                setLogData(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    };

    return (
        <div className={classes.entry_exit_log}>
            <h2>Журнал входа/выхода</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ticket_number">№ билета:</label>
                <input
                    type="number"
                    id="ticket_number"
                    name="ticket_number"
                    value={ticket_number}
                    onChange={(event) => setTicket_number(event.target.value)}
                />
                <label htmlFor="name">Имя посетителя:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <label htmlFor="event_date">Дата мероприятия:</label>
                <input
                    type="datetime-local"
                    id="event_date"
                    name="event_date"
                    value={event_date}
                    onChange={(event) => setEvent_date(event.target.value)}
                />
                <div className={classes.select_container}>
                    <div>
                        <label htmlFor="action">Действие:</label>
                        <select
                            id="action"
                            name="action"
                            value={action}
                            onChange={(event) => setAction(event.target.value)}
                        >
                            <option value="">Вход/выход</option>
                            <option value="in">Вход</option>
                            <option value="out">Выход</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="status">Успешность действия:</label>
                        <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                        >
                            <option value="">Разрешен/Не разрешен</option>
                            <option value="true">Разрешен</option>
                            <option value="false">Не разрешен</option>
                        </select>
                    </div>
                </div>
                <MyButton title={'Поиск'} />
            </form>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Номер билета</th>
                    <th>Имя пользователя</th>
                    <th>Дата и время</th>
                    <th>Действие пользователя</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {logData.map(entry => (
                    <tr key={entry.id}>
                        <td>{entry.id}</td>
                        <td>{entry.ticket_number}</td>
                        <td>{entry.user_name}</td>
                        <td>{new Date(entry.date_time).toLocaleString()}</td>
                        <td>{entry.user_action}</td>
                        <td>{entry.status ? 'Вход разрешен' : 'Вход запрещен'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EntryExitLog;
