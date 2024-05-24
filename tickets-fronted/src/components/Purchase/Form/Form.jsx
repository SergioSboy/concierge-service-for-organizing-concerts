import React, { useState } from 'react';
import classes from "./Form.module.css";
import MyButton from "../../UI/MyButton/MyButton";

const Form = (props) => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        props.setLoading(true);
        // Проверяем, что все поля заполнены
        if (!name || !age || !documentNumber || !documentType) {
            setError('Пожалуйста, заполните все поля');
            props.setLoading(false);
            return;
        }

        // Формируем URL с параметрами
        const requestBody = {
            booking_number: props.booking_number,
            name,
            age,
            document_number: documentNumber,
            document_type: documentType
        };

        // Отправляем GET-запрос
        fetch('http://localhost:3002/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(requestBody)
        })
            .then(response => {
                // Получаем тело ответа в формате JSON, даже если статус не OK
                return response.json().then(data => {
                    // Проверяем статус ответа
                    if (!response.ok) {
                        // Если статус не OK, создаем ошибку с сообщением из ответа
                        const error = new Error(data.error || 'Ошибка при выполнении запроса');
                        error.status = response.status;
                        error.result = data.result;
                        props.setResult(!error.result)
                        throw error;
                    }
                    return data;
                });
            })
            .then(data => {
                props.setMessage("Билет куплен")
                props.setResult(!data.result)
                props.setInformation(data)
                // Очищаем поля формы
                setName('');
                setAge('');
                setDocumentNumber('');
                setDocumentType('');
                // Очищаем сообщение об ошибке, если оно было установлено
                setError('');
                props.setLoading(false);
            })
            .catch(error => {
                props.setMessage(error.message)
                props.setLoading(false);
            });

        setError('');

    };

    return (
        <div className={classes.forma}>
            <form className={classes.form_container} onSubmit={handleSubmit}>
                <label htmlFor="name">Имя:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <br />
                <label htmlFor="age">Возраст:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                />
                <br />
                <label htmlFor="document_number">Номер документа:</label>
                <input
                    type="text"
                    id="document_number"
                    name="document_number"
                    value={documentNumber}
                    onChange={(event) => setDocumentNumber(event.target.value)}
                />

                <br />
                <label htmlFor="document_type">Тип документа:</label>
                <select
                    id="document_type"
                    name="document_type"
                    value={documentType}
                    onChange={(event) => setDocumentType(event.target.value)}
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '100%',
                        maxWidth: '200px', // Максимальная ширина списка
                        marginTop: '8px'
                    }}
                >
                    <option value="">Выберите тип документа</option>
                    <option value="passport">Паспорт</option>
                    <option value="driving_license">Водительское удостоверение</option>
                    <option value="birth_certificate">Свидетельство о рождении</option>
                </select>

                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <MyButton title={'Получить'} />
            </form>
        </div>
    );
};

export default Form;