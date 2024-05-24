import React from 'react';
import Slider from "../UI/Slider/Slider";
import classes from "./About.module.css";
import MyButton from "../UI/MyButton/MyButton";
const About = () => {
    return (
        <div>
            <h1>O нас</h1>
            <Slider/>
            <h1 className={classes.desc}>ОПИСАНИЕ</h1>
            <div className={classes.text}>
                <p><strong>11:11</strong> - Нижегородский шугейз коллектив с элементами инди, который в своем творчестве пишет о близких каждому вещах: о чувстве беззаботной молодости и одновременно какой-то щемящей душу трагичности, о неразделеной любви и памяти, несущей груз воспоминаний о том или ином событии/человеке. Они сочетают в себе тяжелое звучание, где всеобъемлющая стена звука будто бы вот-вот накроет слушателя с головой, с легкостью и хрупкостью вокала.</p>
            </div>
            <h1 className={classes.desc}>КЛИПЫ</h1>
            <div>

            </div>
            <div className={classes.clips}>
                <div className={classes.iframe_wrapper}>
                    <iframe title="Видео о нашей компании" width="590" height="415" src="https://www.youtube.com/embed/hOOVmPhHV0w?controls=0&showinfo=0" frameBorder="0" allowFullScreen></iframe>
                </div>

                <div className={classes.iframe_wrapper}>
                    <iframe title="Видео о нашей компании" width="590" height="315" src="https://www.youtube.com/embed/5rSbDpa2f6w" frameBorder="0" allowFullScreen></iframe>
                </div>

                <div className={classes.iframe_wrapper}>
                    <iframe title="Видео о нашей компании" width="590" height="315" src="https://www.youtube.com/embed/dUvUb7JXHTk" frameBorder="0" allowFullScreen></iframe>
                </div>

                <div className={classes.iframe_wrapper}>
                    <iframe  title="Видео о нашей компании" width="590" height="315" src="https://www.youtube.com/embed/uF3HabrjdfI" frameBorder="0" allowFullScreen></iframe>
                </div>

                <div>
                    <MyButton title='КУПИТЬ БИЛЕТЫ'/>
                </div>
            </div>

        </div>
    );
};

export default About;