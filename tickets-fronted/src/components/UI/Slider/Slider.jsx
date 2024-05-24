import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './Slider.module.css'

import slide_1 from '../../../images/slide_1.jpeg'
import slide_2 from '../../../images/slide_2.jpeg'
import slide_3 from '../../../images/slide_3.jpeg'
import slide_4 from '../../../images/slide_4.jpeg'
import slide_5 from '../../../images/slide_5.jpeg'


class Carousel extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: <CustomPrevArrow />,
            nextArrow: <CustomNextArrow />
        };
        return (
            <Slider {...settings}>

                <div className={classes.slide}>
                    <img src={slide_2} alt="Городской пейзаж с небоскребами и парком" />
                </div>
                <div className={classes.slide}>
                    <img src={slide_1} alt="Городской пейзаж с небоскребами и парком" />
                </div>
                <div className={classes.slide}>
                    <img src={slide_3} alt="Городской пейзаж с небоскребами и парком" />
                </div>
                <div className={classes.slide}>
                    <img src={slide_4} alt="Городской пейзаж с небоскребами и парком" />
                </div>
                <div className={classes.slide}>
                    <img src={slide_5} alt="Городской пейзаж с небоскребами и парком" />
                </div>
            </Slider>
        );
    }
}
function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
        <button className={`${classes.arrow} ${classes.prev}`} onClick={onClick}>
            &lt;
        </button>
    );
}

function CustomNextArrow(props) {
    const { onClick } = props;
    return (
        <button className={`${classes.arrow} ${classes.next}`} onClick={onClick}>
            &gt;
        </button>
    );
}

export default Carousel;