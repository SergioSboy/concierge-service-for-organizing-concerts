import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcodejs2';

const QRCodeComponent = ({ ticketNumber, category, currentDate }) => {
    const qrRef = useRef(null);

    useEffect(() => {
        if (qrRef.current) {
            // Очищаем предыдущий QR-код
            qrRef.current.innerHTML = '';

            // Формируем данные
            const data = {
                ticket_number: ticketNumber,
                category: category,
                current_date: currentDate
            };

            const dataString = JSON.stringify(data);

            // Генерируем QR-код с этими данными
            new QRCode(qrRef.current, {
                text: dataString,
                width: 128,
                height: 128
            });
        }
    }, [ticketNumber, category, currentDate]);

    return <div ref={qrRef}></div>;
};

export default QRCodeComponent;