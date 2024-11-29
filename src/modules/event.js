import filter from "./filter";
import { resetSifter, setSifter } from "./filter";
import { modal } from './helpers';


const event = (maxMediaMenu) => {
    const app = document.querySelector('.app')
    const elSifter = app.querySelector('.sifter');
    const elSifterContent = app.querySelector('.sifter-content');

    const els = {
        '.heroes-button': (t) => {
            const itsInfo = t.classList.contains('its-info') ? '' : '1'

            t.classList.toggle('its-info')
            t.parentNode.querySelector('.more').style.opacity = itsInfo
        },
        '.navbar-toggler-icon svg': () => {
            app.classList.toggle('menu-open')
        },
        '.navbar .filter-toggler': (t) => {
            t.classList.toggle('film')
            filter(t)
            if (window.screen.width < maxMediaMenu + 1) app.classList.remove('menu-open')
        },
        '.nav-movie-slide': (t) => {
            filter(t)
            if (window.screen.width < maxMediaMenu + 1) app.classList.remove('menu-open')
        },
        '.sifter-toggler-icon svg': () => {
            modal(elSifter, elSifterContent, 'show', window.innerWidth < 768 ? 0 : undefined)
        },
        '.sifter .sifter-close': () => {
            modal(elSifter, elSifterContent, 'hide', window.innerWidth < 768 ? 0 : undefined)
        },
        '.sifter-list .value.reset': () => {
            resetSifter()
        },
        '.sifter .sifter-apply': (t) => {
            modal(elSifter, elSifterContent, 'hide', window.innerWidth < 768 ? 0 : undefined)
            setSifter()
            filter(t)
        },
        '.sifter': (t) => {
            if (t === elSifter) modal(elSifter, elSifterContent, 'hide', window.innerWidth < 768 ? 0 : undefined)
        },
    }

    document.querySelector('.app').addEventListener('click', (e) => {
        for (let key in els) {
            if (e.target.closest(key)) {
                els[key](e.target)
                break
            }
        }
    })
}
export default event