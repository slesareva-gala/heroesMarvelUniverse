import Swiper from 'swiper'
import { Navigation } from 'swiper/modules';


const sliders = () => {

    const screen = new Swiper('.slider', {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 10,
        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
        },
    });

    const nav = new Swiper('.nav-movie', {
        modules: [Navigation],
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 10,
        navigation: {
            nextEl: '.nav-movie-button-next',
            prevEl: '.nav-movie-button-prev',
        }
    });

    document.querySelector('.app').sliders = {
        screen: () => screen.update(),
        nav: () => nav.update()
    }

}
export default sliders