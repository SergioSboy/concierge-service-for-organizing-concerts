import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {

    return (
        <footer className={classes.footer}>
            <div className={classes.footerLinks}>
                <a href="/privacy">Политика конфиденциальности</a>
                <a href="/about">О нас</a>
                <a href="/contacts">Контакты</a>
            </div>
            <div className={classes.footerText}>
                <p>{newText}</p>
            </div>
        </footer>
    );
};

function replaceYear(text) {
    const currentYear = new Date().getFullYear();
    return text.replace(/© \d{4}/, `© ${currentYear}`);
}
const text = "Консьерж сервис, оказание услуг по организации посещения мероприятий. Все права защищены. © 2024";
const newText = replaceYear(text);

export default Footer;
