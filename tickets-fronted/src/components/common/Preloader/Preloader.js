import React from 'react';
import preloader from "../../../images/4.svg";

const Preloader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <img alt={'preloader'} src={preloader} width="200px" height="200px"/>
        </div>
    );
};

export default Preloader;