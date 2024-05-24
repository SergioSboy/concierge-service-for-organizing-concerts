import React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import classes from "./Layout.module.css";
const Layout = () => {
    return (
        <div className={classes.layout}>
            <div>
                <Header />
            </div>
            <div>
                <Outlet />
            </div>
            <div className={classes.footer}>
                <Footer />
            </div>

        </div>
    );
};

export default Layout;