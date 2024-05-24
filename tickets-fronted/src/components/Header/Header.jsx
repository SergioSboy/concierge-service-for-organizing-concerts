import React from 'react';
import classes from './Header.module.css'
import logo from '../../images/logo.jpg'
import {Link, NavLink} from "react-router-dom";

const Header = () => {
    return (
        <>
            <header>
                <div className={classes.header}>
                    <div>
                        <Link to="/">
                            <img src={logo} alt='profile'/>
                        </Link>
                    </div>

                    <h1 className={classes.name}>
                        1 1  :  1 1
                    </h1>

                    <div className={classes.link}>
                        <div>
                            <NavLink to="/events">Концерты</NavLink>
                        </div>

                        <div>
                            <NavLink to="/about">О группе</NavLink>
                        </div>

                        <div>
                            <NavLink to="/category">Мерч</NavLink>
                        </div>
                    </div>
                </div>
            </header>
        </>

    );
};

export default Header;