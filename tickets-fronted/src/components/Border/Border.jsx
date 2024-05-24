import React, {useEffect, useState} from 'react';
import {Html5Qrcode} from 'html5-qrcode';
import MyButton from "../UI/MyButton/MyButton";
import classes from "./Border.module.css";
const Border = () => {
    const [isEnabled, setEnabled] = useState(false);
    const [error, setError] = useState('Вход запрещен');
    const [entryStatus, setEntryStatus] = useState('in')

    const handleClick = (e) => {
        setEntryStatus(e);
    };

    useEffect(() => {
        const config = {fps: 50, qrbox: {width: 300, height: 300}};
        const qrCodeScanner = new Html5Qrcode('qrCodeContainer');

        const qrScannerStop = () => {
            if (qrCodeScanner && qrCodeScanner.isScanning) {
                qrCodeScanner.stop()
                    .then(() => console.log('STOP'))
                    .catch(() => console.log('ERROR'));
            }
        };

        const qrCodeSuccess = (decodedText) => {
            setEnabled(false);
            const JsonParse = JSON.parse(decodedText)
            // Параметры запроса
            const ticketNumber = JsonParse.ticket_number; // извлеките из decodedText
            const category = JsonParse.category; // извлеките из decodedText
            const currentDate = JsonParse.current_date; // текущее время

            const url = `http://localhost:3006/pass?ticket_number=${ticketNumber}&category=${category}&user_action=${entryStatus}&current_date=${currentDate}`;

            // Выполнение POST запроса
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.result) {
                        setError('Вход разрешен');
                    } else {
                        setError('Вход запрещен');
                    }
                })
                .catch(error => {
                    console.error('Ошибка запроса:', error);
                    setError('Ошибка при проверке');
                });
        };

        if (isEnabled) {
            setError('Вход запрещен')
            qrCodeScanner.start({facingMode: 'environment'}, config, qrCodeSuccess)
                .catch(err => {
                    console.error('Ошибка при запуске сканирования QR-кода:', err);
                    setError('Ошибка при запуске сканирования');
                });
        } else {
            qrScannerStop();
        }

        return () => {
            qrScannerStop();
        };
    }, [entryStatus, isEnabled]);

    return (
        <>
            <div className={classes.btns}>
                <MyButton
                    title={'Вход'}
                    onClick={() => handleClick('in')}
                    className={entryStatus === 'in' ? classes.selected : ''}
                />
                <MyButton
                    title={'Выход'}
                    onClick={() => handleClick('out')}
                    className={entryStatus === 'out' ? classes.selected : ''}
                />
            </div>
            <hr/>
            {error && <p className={classes.er}>{error}</p>}
            <MyButton onClick={() => setEnabled(!isEnabled)} title={isEnabled ? 'Закончить' : 'Сканировать'}/>

            <div id={'qrCodeContainer'}></div>
        </>
    );
};

export default Border;
