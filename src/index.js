import sliders from './modules/sliders'
import render from './modules/render';
import event from './modules/event';
import filter from './modules/filter';
import { dbload } from './modules/helpers';

const preloader = document.getElementById('preloader')
preloader.style.display = "block"

dbload('./db/dbHeroes.json')
    .then(data => {
        render(data)
        filter()
        event(640)
        sliders()

        setTimeout(() => {
            preloader.style.display = ""
        }, 1000);
    })
    .catch(() => {
        preloader.style.display = ""
        document.querySelector('.screen .not-dbload').innerHTML =
            '<h2>Data is not available</h2><h4>We apologize for the temporary inconvenience you have faced</h4>';
    })


